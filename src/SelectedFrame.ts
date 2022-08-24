/* 
====================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Handles Figma's selected element 
 ===================================================
*/

class SelectedFrame {

    private _totalSelection: any;
    private _selectedElement: FrameNode;
    private _name: string = '<empty>';
    private _width: number = 0;
    private _height: number = 0;
    private _backgroundColor: string = "#000000";

    constructor() {

        // Get selected elements from figma
        this._totalSelection = figma.currentPage.selection;

        // Assert we have only 1 top-level or sub-top-level frame element selected
        this.assertOneElementIsSelected();
        this.assertSelectedElementIsFrame();
        this.assertSelectedElementIsTopLevel();

        this._selectedElement = this._totalSelection[0];
        this._name = this._selectedElement.name;
        this._width = this._selectedElement.width;
        this._height = this._selectedElement.height;
        this._backgroundColor = this.transformBackgroundColorToHex();
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


    private transformBackgroundColorToHex(): string {
        const firstFill = JSON.parse(JSON.stringify((this._selectedElement.fills)))[0];

        const r = Math.round(firstFill.color.r.toString() * 255).toString(16);
        const g = Math.round(firstFill.color.g.toString() * 255).toString(16);
        const b = Math.round(firstFill.color.b.toString() * 255).toString(16);
        const redHex = r.length == 1 ? "0" + r : r;
        const greenHex = g.length == 1 ? "0" + g : g;
        const blueHex = b.length == 1 ? "0" + b : b;

        return "#" + redHex + greenHex + blueHex;
    }

    public get name(): string {
        return this._name;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get backgroundColor(): string {
        return this._backgroundColor;
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
