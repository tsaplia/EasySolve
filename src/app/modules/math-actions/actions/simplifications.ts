import { Multiplier } from "../../math-structures/math-structure"
import { Term } from "../../math-structures/term";
import { simplifyTerms, multTerms } from "../structure-actions";
import { Expression } from "../../math-structures/expression";
import { FormulaReplacement, Simplification } from "src/app/models/types";

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
    }
};