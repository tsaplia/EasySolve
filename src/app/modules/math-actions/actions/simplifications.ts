import { Multiplier } from "../../math-structures/math-structure"
import { Term } from "../../math-structures/term";
import { simplifyTerms, multTerms } from "./base-actions";
import { Expression } from "../../math-structures/expression";
import { FormulaReplacement, Simplification } from "src/app/models/types";
import { Frac } from "../../math-structures/fraction";

export let simplifications: {[key in Simplification]: (mult: Multiplier) => FormulaReplacement | null} = {
    "like-terms": (mult: Multiplier) => {
        if(!(mult instanceof Expression)) return null;
    
        return {from: mult, to: simplifyTerms(mult)};
    },

    "distribute": (mult: Multiplier) => {      
        let parent = mult.parent;
        if(!(parent instanceof Term)) return null;
        let dTerm = new Term(parent.content.filter(child => child !=mult).map(child => child.copy()), parent.sign);
        let multContent = mult instanceof Expression ? mult.content : [new Term([mult.copy()])];
        let content = multContent.map(child => multTerms(child, dTerm));
    
        return {from: parent, to: new Expression(content)}
    },
    "frac": (mult: Multiplier) => {
        let base = mult.parent?.parent;
        if(!(mult instanceof Frac && base instanceof Frac)) return null;

        let sign: "+" | "-" = base.numerator.sign==base.denomerator.sign ? "+" : "-";
        if(mult.numerator.sign != mult.denomerator.sign) sign = sign == "+" ? "-" : "+";

        let newStruct: Frac;
        if(base.numerator == mult.parent){
            let num = new Term(base.numerator.content.filter(m => m != mult).map(m => m.copy()), base.numerator.sign);
            newStruct = new Frac(multTerms(num, mult.numerator), multTerms(base.denomerator, mult.denomerator));
        }else{
            let den = new Term(base.denomerator.content.filter(m => m != mult).map(m => m.copy()), base.denomerator.sign);
            newStruct = new Frac(multTerms(base.numerator, mult.denomerator), multTerms(den, mult.numerator));
        }

        return {from: base, to: newStruct}
    }
};