import { availibleMathFunc } from "src/app/configs/config";
import { Frac } from "../../math-structures/fraction";
import { Formula } from "../../math-structures/formula";
import { Expression } from "../../math-structures/expression";
import { Term } from "../../math-structures/term";
import { Exponent } from "../../math-structures/exponent";
import { MathStruct, Multiplier } from "../../math-structures/math-structure";
import { Sqrt } from "../../math-structures/sqrt";
import { Func } from "../../math-structures/function";
import { setListener } from "./selected";

enum ClassNames {
    breacker = "in-pm",
    function = "in-function",
    term = "in-term",
    formula = "in-formula",
    expr = "in-expr",
    prime = "mjx-var"
};

enum MJXTags {
    mc = "mjx-mc",
    mo = "mjx-mo",
    mi = "mjx-mi",
    mn = "mjx-mn",
    mrow = "mjx-mrow",
    index = "mjx-script",
    textatom = "mjx-texatom",
    mfrac = "mjx-mfrac",
    den = "mjx-den",
    num = "mjx-num",
    sqrt = "mjx-sqrt",
    root = "mjx-root",
    box = "mjx-box",
    msubsup = "mjx-msubsup",
    msup = "mjx-msup",
    msub = "mjx-msub",
}


export function prepareHTML(root: HTMLElement, formula: Formula) {
    let content = root.querySelector("mjx-math");
    if(!content) throw new Error("MathJax not found");
    content.classList.add(ClassNames.formula);

    // mark "+" and "-"
    mark(content, ClassNames.breacker, "mjx-mo", (e) => ["+", "−"].includes(getInnerText(e)));
    groupFunctionParts(content);

    prepareFormula(content, formula);
};


function mark(root: Element, className: string, selector: string, reducer: (el: Element) => boolean) {
    let selected = Array.from(root.querySelectorAll(selector));
    for (let elem of selected) {
        if (reducer(elem)) {
            elem.classList.add(className);
        }
    }
}

/**
 * get all characters from element and children
 */
function getInnerText(elem: Element) {
    if (elem.children.length == 0) {
        let content = getComputedStyle(elem, "before").content;
        return content == "none" ? "" : content.slice(1, -1);
    }
    let text = "";
    for (let child of Array.from(elem.children)) {
        text += getInnerText(child);
    }
    return text;
}

/**
 * replace elem with this element wrapped in other element
 */
function wrap(elem: Element, className: string = "") {
    let newGroup = document.createElement("span");
    newGroup.className = className;
    elem.parentElement?.insertBefore(newGroup, elem);
    newGroup.appendChild(elem);

    return newGroup;
}

/**
 * Groups function parts based on certain conditions.
 */
function groupFunctionParts(root: Element) {
    let selected = root.querySelectorAll("mjx-mi");
    for (let elem of Array.from(selected)) {
        if (!Object.keys(availibleMathFunc).includes(getInnerText(elem))) continue;

        let group = wrap(elem, ClassNames.function);
        if (!getInnerText(group.nextElementSibling as Element)) {
            group.append(group.nextElementSibling as Element);
        }
        if(group.nextElementSibling?.localName == MJXTags.msup){
            // if this a exponent function
            group.append(group.nextElementSibling.firstElementChild as Element);
            group.nextElementSibling.insertBefore(group.firstElementChild as Element, group);
        }else{
            group.appendChild(group.nextElementSibling as Element);
        }
    }
}

/**
 * Groups expression parts by wrapping them in a specified class.
 */
function wrapExprParts(elem: Element): Element {
    if(elem.localName != MJXTags.mrow && elem.localName != MJXTags.textatom && elem.localName != MJXTags.box){
        //if it is a multiplier
        return wrap(elem, ClassNames.expr);
    }if(getInnerText(elem.firstElementChild as Element) == "("){
        // if it is an expression in breackets
        let group = wrap(elem.firstElementChild?.nextElementSibling as Element, ClassNames.expr);
        while(group.nextElementSibling && getInnerText(group.nextElementSibling) != ")"){
            group.appendChild(group.nextElementSibling);
        }
        return group;
    }
    elem.classList.add(ClassNames.expr);
    return elem;
};

// TODO: prepare  power groupping in var with primes

function prepareFormula(root: Element, formula: Formula) {
    setListener(formula, root as HTMLElement);
    let group = wrap(root.firstElementChild as Element, ClassNames.expr);
    for (let i = 0; i < formula.equalityParts.length; i++) {
        let next = group.nextElementSibling;
        while (next && getInnerText(next) != "=") {
            group.appendChild(next);
            next = group.nextElementSibling;
        }
        
        prepareExpression(group, formula.equalityParts[i]);

        if (i < formula.equalityParts.length - 1) {
            group = wrap(next?.nextElementSibling as Element, ClassNames.expr);
        }
    }
};


function prepareExpression(root: Element, expr: Expression) {
    setListener(expr, root as HTMLElement);
    let group = wrap(root.firstElementChild as Element, ClassNames.term);
    for (let i = 0; i < expr.content.length; i++) {
        let next = group.nextElementSibling;
        while (next && !next.classList.contains(ClassNames.breacker)) {
            group.appendChild(next);
            next = group.nextElementSibling;
        }
        prepareTerm(group, expr.content[i]);

        if (i < expr.content.length - 1) {
            group = wrap(next as Element, ClassNames.term);
        }
    }
};


function prepareTerm(root: Element, term: Term) {
    setListener(term, root as HTMLElement);
    for (let multInd = 0, elemInd = 0; multInd < term.content.length; multInd++, elemInd++) {
        while (root.children[elemInd].localName == MJXTags.mo) elemInd++;
        prepareMult(root.children[elemInd], term.content[multInd]);
    }
};

function prepareMult(root: Element, mult: Multiplier) {
    if(mult instanceof Expression){
        prepareExpression(wrapExprParts(root), mult);
        return;
    }

    setListener(mult, root as HTMLElement);
    if(mult instanceof Frac){
        prepareFrac(root, mult);
    }else if(mult instanceof Exponent){
        prepareExponent(root, mult);
    }else if(mult instanceof Sqrt){
        prepareSqrt(root, mult);
    }else if(mult instanceof Func){
        prepareFunction(root, mult);
    }
}

function prepareFrac(root: Element, frac: Frac) {
    function prepNumDen(elem: Element, term: Term) {
        elem = wrapExprParts(elem);
        if(term.sign == "+" && term.content.length == 1 && term.content[0] instanceof Expression){
            setListener(term, elem as HTMLElement)
            prepareExpression(elem, term.content[0]);

        }else{
            prepareTerm(elem, term);
        }
    }

    let num = root.querySelector(`${MJXTags.num}`)?.lastElementChild;
    let den = root?.firstElementChild?.lastElementChild?.querySelector(`${MJXTags.den}`)?.lastElementChild;
    prepNumDen(num as Element, frac.numerator);
    prepNumDen(den as Element, frac.denomerator);
};

function prepareExponent(root: Element, exponent: Exponent) {
    let exponentEl = root.querySelector(`${MJXTags.index}`)?.firstElementChild as Element;
    if(exponentEl.firstElementChild?.classList.contains(ClassNames.prime)){
        // if this is a variable with primes
        exponentEl.parentElement?.insertBefore(exponentEl, exponentEl.firstElementChild);
    }
    prepareMult(root?.firstChild as Element, exponent.base);
    prepareExpression(wrapExprParts(exponentEl), exponent.exponent);
}

function prepareSqrt(root: Element, sqrt: Sqrt) {
    let rootEl = root.querySelector(`${MJXTags.root}`)?.firstElementChild;
    if(rootEl) prepareExpression(wrapExprParts(rootEl), sqrt.root);
    let baseEl = root.querySelector(`${MJXTags.box}`);
    prepareMult((sqrt.content instanceof Expression ? baseEl : baseEl?.firstElementChild) as Element, sqrt.content);
}

function prepareFunction(root: Element, func: Func) {
    prepareExpression(wrapExprParts(root.lastElementChild as Element), func.content);
}