/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Parent element for every Webflow element
 =======================================================================
*/

class ContainerClass extends WebflowClass {

    private _selectedFrame;
    private _maxWidth = 1280;

    constructor(name: string, selectedFrame: FrameNode) {

        super(name);

        // For containers, we need the selectedFrame
        this._selectedFrame = selectedFrame;
        this.setStyleLess();
    }

    protected setStyleLess(): void {
        this._styleLess = `max-width:${this._maxWidth}px;height:100%;`;
    }
}