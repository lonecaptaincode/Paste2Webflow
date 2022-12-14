/* 
====================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Handles Figma's selected element 
 ===================================================
*/

class FigmaSelection {

    private _totalSelection: any;
    private _selectedFrame: FrameNode;

    constructor() {

        // Get selected elements from figma
        this._totalSelection = figma.currentPage.selection;

        // Assert we have only 1 top-level or sub-top-level frame element selected
        this.assertOneElementIsSelected();
        this.assertSelectedElementIsFrame();
        this.assertSelectedElementIsTopLevel();

        // Set selected frame
        this._selectedFrame = this._totalSelection[0];
    }

    private assertOneElementIsSelected(): Error | void {
        const numberOfSelectedElements = this._totalSelection.length;
        if (numberOfSelectedElements === 0) {
            throw new Error("No element selected. Please select 1 frame element");
        }
        if (numberOfSelectedElements > 1) {
            throw new Error("More than 1 element selected. Please select 1 frame element");
        }
    }

    private assertSelectedElementIsFrame(): Error | void {
        if (this._totalSelection[0].type !== "FRAME") {
            throw new Error("The selected element (" + this._totalSelection[0].name + ") is not a frame #. Please select a Frame.");
        }
    }

    private assertSelectedElementIsTopLevel(): Error | void {
        const parentOfSelectedElement = this._totalSelection[0].parent;
        const grandParentOfSelectedElement = parentOfSelectedElement.parent;
        if (parentOfSelectedElement.type !== "PAGE" && grandParentOfSelectedElement.type !== "PAGE") {
            throw new Error("Please select a top level frame element, not more than 1 level under the page. (Page > Top Element > Select Element > Items");
        }
    }


    public get selectedFrame(): FrameNode {
        return this._selectedFrame;
    }

}