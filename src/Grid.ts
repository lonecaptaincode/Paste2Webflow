/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Grid element to order elements withing the Section
 =======================================================================
*/


class Grid extends WebflowElement {

    protected _class: GridClass;


    constructor(selectedFrame: FrameNode) {
        super();

        this._class = new GridClass(selectedFrame);
        this._classNames.push(this._class.name);

        this._type = "Grid";
        this._tag = "div";
        this._data = { grid: { type: "two-by-two" }, tag: "div" };
    }

    public get class(): GridClass {
        return this._class;
    }
}