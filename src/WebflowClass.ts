/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Parent element for every Webflow element
 =======================================================================
*/

class WebflowClass {

    protected _figmaElement: FrameNode;

    protected _id: string;
    protected _fake: boolean = false;
    protected _type: string = "class";

    protected _name: string = '<empty>';
    protected _namespace: string = "";
    protected _comb: string = "";
    protected _selector: any = null;
    protected _children: string[] = [];
    protected _createdBy: string = "Paste2Webflow";

    protected _styleLess: string = "";
    protected _backgroundColor: string = "#000000";
    protected _width: number = 0;
    protected _height: number = 0;


    constructor(name: string, figmaElement: FrameNode) {

        this._figmaElement = figmaElement;
        this._id = name; //(Math.random() + 1).toString(36).substring(2);
        this._name = name;
        this.setStyleLess();
    }

    private setStyleLess(): void {

        // Get background color of element
        const fill = JSON.parse(JSON.stringify((this._figmaElement.fills)))[0];
        const backgroundColor = this.transformFigmaRGBToHex(fill.color);

        // Get dimensions
        const width = this._figmaElement.width;
        const height = this._figmaElement.height;

        this._styleLess = `background-color:${backgroundColor};height:${height}px;`;

    }


    private transformFigmaRGBToHex(color: any): string {
        const r = Math.round(color.r.toString() * 255).toString(16);
        const g = Math.round(color.g.toString() * 255).toString(16);
        const b = Math.round(color.b.toString() * 255).toString(16);
        const redHex = r.length == 1 ? "0" + r : r;
        const greenHex = g.length == 1 ? "0" + g : g;
        const blueHex = b.length == 1 ? "0" + b : b;
        return "#" + redHex + greenHex + blueHex;
    }


    public get name(): string {
        return this._name;
    }

    public getJSON(): object {
        const json = {
            "styleLess": this._styleLess,
            "_id": this._id,
            "fake": this._fake,
            "type": this._type,
            "name": this._name,
            "namespace": this._namespace,
            "comb": this._comb,
            "selector": this._selector,
            "children": this._children,
            "createdBy": this._createdBy,
        };
        return json;
    }

}