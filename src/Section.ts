/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Section element to transform Figma data to a Webflow Section
 =======================================================================
*/


class Section extends WebflowElement {

    constructor(name: string) {
        super(name);
        this._type = "Section";
        this._tag = "div";
        this._data = { grid: { type: "section" }, tag: "div" };
    }
}
