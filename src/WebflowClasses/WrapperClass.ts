/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Class properties for Grid
 =======================================================================
*/

class WrapperClass extends WebflowClass {

    private _selectedFrame: FrameNode;

    constructor(selectedFrame: FrameNode) {

        super(selectedFrame.name + " Wrapper");

        // For grid, we need the selectedFrame
        this._selectedFrame = selectedFrame;


        this.setStyleLess();
    }

    protected setStyleLess(): void {

        this._styleLess = ``;
    }
}