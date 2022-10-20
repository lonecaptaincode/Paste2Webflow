/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Class properties for Section
 =======================================================================
*/

class SectionClass extends WebflowClass {

    private _selectedFrame;
    private _backgroundColor: string = "#000000";

    private _layoutMode: string;

    private _height: number;
    private _padding: { top: number, bottom: number, left: number, right: number; } = { top: 0, bottom: 0, left: 0, right: 0 };

    constructor(selectedFrame: FrameNode) {

        super(selectedFrame.name);

        // For sections, we need the selectedFrame
        this._selectedFrame = selectedFrame;

        // Set some initial dimensions
        this._layoutMode = selectedFrame.layoutMode;

        this._height = Math.round(selectedFrame.height);
        this.setStyleLess();
    }

    protected setStyleLess(): void {
        this.setPadding();

        // Get background color of Section
        const fill = JSON.parse(JSON.stringify((this._selectedFrame.fills)))[0];
        const backgroundColor = this.transformFigmaRGBToHex(fill.color);

        this._styleLess = `background-color:${backgroundColor};height:${this._height}px;padding:${this._padding.top}px ${this._padding.right}px ${this._padding.bottom}px ${this._padding.left}px;`;
    }

    public setPadding(): void {
        if (this._layoutMode === "NONE") {
            this.setPaddingTop();
            this.setPaddingBottom();
        }
        else {
            this._padding.top = Math.round(this._selectedFrame.paddingTop);
            this._padding.bottom = Math.round(this._selectedFrame.paddingBottom);
        }
    }

    private setPaddingBottom(): void {
        const children = this._selectedFrame.children;
        this._padding.bottom = this._height - (children[0].y + children[0].height);
        for (const child of children) {
            let paddingBottom = this._height - (child.y + child.height);
            if (paddingBottom < this._padding.bottom) {
                this._padding.bottom = Math.round(paddingBottom);
            }
        }
    }

    private setPaddingTop(): void {
        const children = this._selectedFrame.children;
        this._padding.top = children[0].y;
        for (const child of children) {
            if (child.y < this._padding.top) {
                this._padding.top = Math.round(child.y);
            }
        }
    }

}