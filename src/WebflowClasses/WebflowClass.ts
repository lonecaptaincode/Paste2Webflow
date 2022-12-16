/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Parent element for every Webflow element
 =======================================================================
*/

abstract class WebflowClass {

    protected _id: string;
    protected _fake: boolean = false;
    protected _type: string = "class";

    protected _name: string = "<empty>";
    protected _namespace: string = "";
    protected _comb: string = "";
    protected _selector: any = null;
    protected _childrenIDs: string[] = [];
    protected _createdBy: string = "Paste2Webflow";

    protected _styleLess: string = "";

    protected _variants: {
        tiny: { styleLess: string; },
        small: { styleLess: string; },
        medium: { styleLess: string; },
        large: { styleLess: string; },
        xl: { styleLess: string; },
        xxl: { styleLess: string; };
    } = {
            tiny: { styleLess: "" },
            small: { styleLess: "" },
            medium: { styleLess: "" },
            large: { styleLess: "" },
            xl: { styleLess: "" },
            xxl: { styleLess: "" }
        };

    constructor(name: string) {
        this._id = name;
        this._name = name;
    }

    protected abstract setStyleLess(): void;



    protected transformFigmaRGBToHex(color: any): string {
        const r = Math.round(color.r.toString() * 255).toString(16);
        const g = Math.round(color.g.toString() * 255).toString(16);
        const b = Math.round(color.b.toString() * 255).toString(16);
        const redHex = r.length == 1 ? "0" + r : r;
        const greenHex = g.length == 1 ? "0" + g : g;
        const blueHex = b.length == 1 ? "0" + b : b;
        return "#" + redHex + greenHex + blueHex;
    }


    protected setMediumStyle(style: string): void {
        this._variants.medium = { styleLess: style };
    }

    public get name(): string {
        return this._name;
    }

    public getJSON(): object {
        const json: {
            "styleLess": string;
            "_id": string;
            "fake": boolean;
            "type": string;
            "name": string;
            "namespace": string;
            "comb": string;
            "selector": string;
            "children": string[],
            "createdBy": string,
            "variants": {
                tiny: { styleLess: string; },
                small: { styleLess: string; },
                medium: { styleLess: string; },
                large: { styleLess: string; },
                xl: { styleLess: string; },
                xxl: { styleLess: string; };
            },
        }
            = {
            "styleLess": this._styleLess,
            "_id": this._id,
            "fake": this._fake,
            "type": this._type,
            "name": this._name,
            "namespace": this._namespace,
            "comb": this._comb,
            "selector": this._selector,
            "children": this._childrenIDs,
            "createdBy": this._createdBy,
            "variants": this._variants
        };
        return json;
    }

}