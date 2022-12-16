/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Grid element to order elements withing the Section
 =======================================================================
*/


class Wrapper extends WebflowElement {

    protected _class: WrapperClass;


    constructor(selectedFrame: FrameNode, parent: Grid) {
        super();

        this._class = new WrapperClass(selectedFrame);
        this._classNames.push(this._class.name);

        this._type = "Grid";
        this._tag = "div";
        this._data = { grid: { type: "two-by-two" }, tag: "div" };
        parent.addChild(this._id);
    }

    public get class(): WrapperClass {
        return this._class;
    }
}