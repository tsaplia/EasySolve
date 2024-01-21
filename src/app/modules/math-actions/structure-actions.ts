import { MathStruct } from "../math-structures/math-structure";

export function getParents(struct: MathStruct): MathStruct[] {
    let parents: MathStruct[] = [];
    while(struct.parent){
        parents.push(struct.parent);
        struct = struct.parent;
    }
    return parents;
}

export function getChildren(struct: MathStruct): MathStruct[] {
    let children: MathStruct[] = [];
    function get(struct: MathStruct){
        struct.children.forEach((child) => {
            children.push(child);
            get(child);
        });
    }
    get(struct);
    return children;
}