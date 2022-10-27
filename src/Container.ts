/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Section element to transform Figma data to a Webflow Section
 =======================================================================
*/


class Container extends WebflowElement {

    protected _class: ContainerClass;

    constructor(selectedFrame: FrameNode, parent: Section) {
        super();

        this._class = new ContainerClass(selectedFrame);
        this._classNames.push(this._class.name);

        this._type = "Container";
        this._tag = "div";
        this._data = { grid: { type: "container" }, tag: "div" };

        parent.addChild(this._id);
    }

    public get class(): ContainerClass {
        return this._class;
    }

}