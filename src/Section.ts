/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Section element to transform Figma data to a Webflow Section
 =======================================================================
*/

class Section {
    private _name: string = '<empty>';
    private _height: number = 0;
    private _backgroundColor: string = "#000000";
    private _webflow;

    constructor(name: string, height: number, backgroundColor: string, webflow: Webflow) {
        this._name = name;
        this._height = height;
        this._backgroundColor = backgroundColor;
        this._webflow = webflow;
        this.pushToWebflow();
    }

    private pushToWebflow() {
        const sectionNode = {
            _id: "8c91a656-4858-68d5-7c5c-1fe3ecff554f",
            type: "Section",
            tag: "div",
            classes: [this.name],
            children: [],
            data: {
                grid: {
                    type: "section"
                },
                tag: "div"
            }
        };
        const sectionStyle = {
            "styleLess": `background-color:${this._backgroundColor};height:${this._height}px;`,
            "_id": this.name,
            "fake": false,
            "type": "class",
            "name": this.name,
            "namespace": "",
            "comb": "",
            "selector": null,
            "children": [],
            "createdBy": ""

        };
        this._webflow.pushNode(sectionNode);
        this._webflow.pushStyle(sectionStyle);
    }

    private get name(): string {
        return this._name;
    }

    private get height(): number {
        return this._height;
    }

    private get width(): string {
        return this._backgroundColor;
    }

}
