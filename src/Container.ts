/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Section element to transform Figma data to a Webflow Section
 =======================================================================
*/


class Container extends WebflowElement {

    private _selectedFrame: FrameNode;
    protected _class: ContainerClass;

    constructor(selectedFrame: FrameNode) {
        super();

        this._class = new ContainerClass(selectedFrame);
        this._classNames.push(this._class.name);

        this._type = "Container";
        this._tag = "div";
        this._data = { grid: { type: "container" }, tag: "div" };
        this._selectedFrame = selectedFrame;
    }

    public get class(): ContainerClass {
        return this._class;
    }

}