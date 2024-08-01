

import { Formula } from "../../math-structures/formula";
import { MatchResult } from "./match-result";
import { type MathStruct, Multiplier } from "../../math-structures/math-structure";
import { type Template } from "../../math-structures/template";
import { TemplateVar } from "../../math-structures/template-var";
import { Variable } from "../../math-structures/variable";
import { selected } from "../selection/selected";
import { Term } from "../../math-structures/term";
import { Expression } from "../../math-structures/expression";
import { type FormulaTemplate } from "../../math-structures/formula-template";
import { type FormulaReplacement, type Simplifications } from "src/app/models/types";
import { simplifications } from "../actions/simplifications";
import { removeExtraGroups, toExpression, toMultiplier, toTerm } from "../general-actions";
import { Num } from "../../math-structures/number";

interface Substitution { varName: string, mult: Multiplier }

export function tryTemplete(template: Template, simp?: Simplifications, input?: Expression): Expression | null {
    if (selected.type != "structure") return null;
    let { formula, structure, partIndex } = selected.getStructureData();
    let selectedExpression = toExpression(structure);

    let matchRusult = match(template.from, selectedExpression);
    if (!matchRusult) return null;

    if (input) matchRusult.extend(new MatchResult({ _in: toMultiplier(input) }));
    let { struct: resultExpression, subs } = substituteVariables(template.to, matchRusult);

    let replaced = replace(formula.equalityParts[partIndex], structure, resultExpression);

    return simp ? applySimp(replaced, simp, subs) : replaced;
}

export function tryFormulaTemplate(template: FormulaTemplate, simp?: Simplifications,
    input?: Expression): Formula[] | null {
    if (selected.type != "formula") return null;
    let formulas = selected.formulas!;
    if (formulas.length != template.from.length) return null;

    let matchRusults = new MatchResult();
    for (let i = 0; i < formulas.length; i++) {
        let curResult = match(template.from[i], formulas[i]);
        if (!curResult || !matchRusults.extend(curResult)) return null;
    }
    if (input) matchRusults.extend(new MatchResult({ _in: toMultiplier(input) }));

    let subResults = template.to.map(formula => substituteVariables(formula, matchRusults));
    if (!simp) return subResults.map(res => res.struct);

    return subResults.map(({ struct, subs }) => applySimp(struct, simp, subs));
}

function match(template: MathStruct, struct: MathStruct): MatchResult | null {
    if (struct instanceof TemplateVar) throw new Error("TemplateVar can't be used as struct");

    // type checks
    if (template instanceof TemplateVar) {
        return struct instanceof Multiplier ? new MatchResult({ [template.name]: toMultiplier(struct) }) : null;
    }
    if (template.constructor != struct.constructor) return null;
    if ((template instanceof Variable || template instanceof Num)) {
        return template.isEqual(struct) ? new MatchResult() : null;
    }
    if (template instanceof Function && struct instanceof Function && template.name != struct.name) return null;

    if (template instanceof Term && struct instanceof Term && template.sign != struct.sign) return null;

    // match wrapped template var
    if (template instanceof Expression && toMultiplier(template) instanceof TemplateVar) {
        return new MatchResult({ [(toMultiplier(template) as TemplateVar).name]: toMultiplier(struct) });
    }

    let tChildren = template.children;
    let sChildren = struct.children;

    // for formulas with many equality parts
    if (template instanceof Formula) {
        if (sChildren.length == 1) return null;
        sChildren = [sChildren[0], sChildren[sChildren.length - 1]];
    }

    // wrap /unwrap children
    if (tChildren.length != sChildren.length) {
        // unwrap single multipliers in expression
        if (template instanceof Expression) {
            let mult = toMultiplier(template);
            return mult instanceof TemplateVar ? new MatchResult({ [mult.name]: struct }) : null;
        }

        // wrap multiple multipliers in term
        if (!(template instanceof Term) || tChildren.length != 1 || !(tChildren[0] instanceof TemplateVar)) {
            return null;
        }
        sChildren = [new Expression([new Term(sChildren.map(child => child.copy()))])];
    }

    // children checks
    if (!(template instanceof Term || template instanceof Expression)) {
        let result = new MatchResult();
        for (let i = 0; i < tChildren.length; i++) {
            let curResult = match(tChildren[i], sChildren[i]);
            if (!curResult || !result.extend(curResult)) return null; // no curResult or we can't extend result
        }
        return result;
    }


    // term children checks (with permutation)
    let usedTChildren: boolean[] = Array(tChildren.length).fill(false);
    let recursiveMatch = (pos: number): MatchResult | null => {
        if (pos == sChildren.length) return new MatchResult();
        for (let j = 0; j < sChildren.length; j++) {
            if (usedTChildren[j]) continue;
            let curResult = match(tChildren[j], sChildren[pos]);
            if (!curResult) continue;
            usedTChildren[j] = true;
            let recMatch = recursiveMatch(pos + 1);
            usedTChildren[j] = false;
            if (recMatch) {
                let extended = curResult.extend(recMatch);
                return extended ? curResult : null;
            }
        }
        return null;
    };
    return recursiveMatch(0);
}

function substituteVariables<T extends MathStruct>(template: T, match: MatchResult):
        { struct: T, subs: Substitution[] } {
    let subs: Substitution[] = [];
    function callback(struct: MathStruct): MathStruct {
        if (struct instanceof TemplateVar) {
            if (!match.get(struct.name)) throw new Error("Template variable not found");
            let mult = match.get(struct.name)!.copy();
            subs.push({ varName: struct.name, mult });
            return mult;
        }
        let newStruct = struct.changeStructure(callback);
        return newStruct.isEqual(struct) ? newStruct : removeExtraGroups(newStruct);
    };
    subs = subs.filter(sub => !!sub.mult.parent);
    return { struct: template.changeStructure(callback) as T, subs };
}

export function replace(part: Expression, from: Term | Multiplier, to: Term | Multiplier): Expression {
    return multipleReplace(part, [{ from, to }]);
}

export function multipleReplace<T extends Formula | Expression>(struct: T, data: FormulaReplacement[]): T {
    data.forEach((rep) => {
        if (rep.from instanceof Term) rep.to = toTerm(rep.to);
        else if (rep.from instanceof Expression) rep.to = toExpression(rep.to);
        else rep.to = toMultiplier(rep.to);
    });

    let changedParent: MathStruct[] = [];

    const callback = (struct: MathStruct): MathStruct => {
        let rep = data.find(rep => rep.from == struct);
        if (rep) {
            if (struct.parent && struct.parent != changedParent.at(-1)) changedParent.push(struct.parent);
            return rep.to;
        }
        let newStruct = struct.changeStructure(callback);
        if (struct == changedParent.at(-1)) {
            changedParent.pop();
            return removeExtraGroups(newStruct);
        }
        return newStruct;
    };
    return callback(struct) as T;
}

function applySimp<T extends Formula | Expression>(struct: T, simp: Simplifications, subs: Substitution[]): T {
    let changes = subs.map((sub) => {
        if (simp[sub.varName]) {
            return simplifications[simp[sub.varName]](sub.mult);
        }
        return null;
    }).filter(rep => !!rep) as FormulaReplacement[];

    return multipleReplace(struct, changes);
}
