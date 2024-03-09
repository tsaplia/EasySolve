import { Multiplier } from "../../math-structures/math-structure";


type Matches = {[name: string]: Multiplier}

export class MatchResult {
    private result: Matches;
    /**
     * Initializes a new instance of the Constructor class.
     */
    constructor(matches = {}) {
        this.result = matches;
    }
    /**
     * Extends the current MatchResult with the properties of another MatchResult.
     *
     * @param {MatchResult} other - The MatchResult object to extend with.
     * @returns {boolean} - Returns true if the extension was successful, false otherwise.
     */
    extend(other: MatchResult): boolean {
        for( let name of Object.keys(other.result)) {
            if (this.result.hasOwnProperty(name)) {
                if(!this.result[name].isEqual(other.result[name])) return false;
            }else{
                this.result[name] = other.result[name];
            }
        }
        return true;
    }

    get(name: string): Multiplier | undefined {
        return this.result[name];
    }
}

