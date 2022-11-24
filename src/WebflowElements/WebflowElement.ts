/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Parent element for every Webflow element
 =======================================================================
*/

abstract class WebflowElement {

    protected _id: string;
    protected _type: string = "Block";
    protected _tag: string = "div";
    protected _data: { grid: { type: string; }, tag: string; } = { grid: { type: "section" }, tag: "div" };

    protected _childrenIDs: string[] = [];
    protected _classNames: string[] = [];
    //protected _styleId: string;

    protected abstract _class: WebflowClass;

    constructor() {
        this._id = this.generateId();
    }

    protected abstract get class(): WebflowClass;

    private generateId(): string {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const length = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * length));
        }
        return result;
    }

    public addChild(childId: string): void {
        this._childrenIDs.push(childId);
    }

    public get id(): string {
        return this._id;
    }

    public getJSON(): object {
        const json: {
            "_id": string,
            "tag": string,
            "classes": string[],
            "children": string[],
            "type": string,
            "data": { grid: { type: string; }, tag: string; };
            //"styleId": this._styleId
        } = {
            "_id": this._id,
            "tag": this._tag,
            "classes": this._classNames,
            "children": this._childrenIDs,
            "type": this._type,
            "data": this._data
            //"styleId": this._styleId
        };
        return json;
    }

}