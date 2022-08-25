/* 
====================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Handles Figma's selected element 
 ===================================================
*/

class FigmaParentFrame {

    private _totalSelection: any;
    private _selectedFrame: FrameNode;

    private _layoutMode: string;

    private _width: number;
    private _height: number;
    private _padding: { top: number, bottom: number, left: number, right: number; } = { top: 0, bottom: 0, left: 0, right: 0 };


    constructor() {

        // Get selected elements from figma
        this._totalSelection = figma.currentPage.selection;

        // Assert we have only 1 top-level or sub-top-level frame element selected
        this.assertOneElementIsSelected();
        this.assertSelectedElementIsFrame();
        this.assertSelectedElementIsTopLevel();

        // Set selected frame
        this._selectedFrame = this._totalSelection[0];

        // Set some initial dimensions
        this._layoutMode = this._selectedFrame.layoutMode;
        this._width = this._selectedFrame.width;
        this._height = this._selectedFrame.height;
        this.setPadding();

    }

    private assertOneElementIsSelected(): Error | boolean {
        const numberOfSelectedElements = this._totalSelection.length;
        if (numberOfSelectedElements === 0) {
            throw new Error("No element selected. Please select 1 frame element");
        }
        if (numberOfSelectedElements > 1) {
            throw new Error("More than 1 element selected. Please select 1 frame element");
        }
        return true;
    }

    private assertSelectedElementIsFrame(): Error | boolean {
        if (this._totalSelection[0].type !== "FRAME") {
            throw new Error("The selected element (" + this._totalSelection[0].name + ") is not a frame #. Please select a Frame.");
        }
        return true;
    }

    private assertSelectedElementIsTopLevel(): Error | boolean {
        const parentOfSelectedElement = this._totalSelection[0].parent;
        const grandParentOfSelectedElement = parentOfSelectedElement.parent;
        if (parentOfSelectedElement.type !== "PAGE" && grandParentOfSelectedElement.type !== "PAGE") {
            throw new Error("Please select a top level frame element, not more than 1 level under the page. (Page > Top Element > Select Element > Items");
        }
        return true;
    }


    public setPadding() {
        console.log(this._selectedFrame);

        if (this._layoutMode !== "NONE") {
            this._padding.top = this._selectedFrame.paddingTop;
            this._padding.bottom = this._selectedFrame.paddingBottom;
            this._padding.left = this._selectedFrame.paddingLeft;
            this._padding.right = this._selectedFrame.paddingRight;
            return;
        }


    }


    public get selectedFrame(): FrameNode {
        return this._selectedFrame;
    }


}




// // Get selection data
// var selectedElement = figma.currentPage.selection[0];
// if (!selectedElement) {
//   const response = { type: "error", message: "No element selected" };
//   figma.ui.postMessage(response);
// }

// else {

//   const width = selectedElement.width;
//   const height = selectedElement.height;
//   const name = selectedElement.name;

//   const backgroundColorHex = getBackgroundColor(selectedElement);
