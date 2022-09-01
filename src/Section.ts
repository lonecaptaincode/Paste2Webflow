/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Section element to transform Figma data to a Webflow Section
 =======================================================================
*/


class Section extends WebflowElement {

    protected _class: SectionClass;

    constructor(selectedFrame: FrameNode) {
        super();

        this._class = new SectionClass(selectedFrame);
        this._classNames.push(this._class.name);

        this._type = "Section";
        this._tag = "div";
        this._data = { grid: { type: "section" }, tag: "div" };
    }

    public get class(): SectionClass {
        return this._class;
    }
}
