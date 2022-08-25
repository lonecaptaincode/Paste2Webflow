/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Parent element for every Webflow element
 =======================================================================
*/

class SectionClass extends WebflowClass {

    private _selectedFrame;
    private _backgroundColor: string = "#000000";

    private _layoutMode: string;
    private _width: number;
    private _height: number;
    private _padding: { top: number, bottom: number, left: number, right: number; } = { top: 0, bottom: 0, left: 0, right: 0 };

    constructor(selectedFrame: FrameNode) {

        super(selectedFrame.name);

        // For sections, we need the selectedFrame
        this._selectedFrame = selectedFrame;

        // Set some initial dimensions
        this._layoutMode = selectedFrame.layoutMode;
        this._width = Math.round(selectedFrame.width);
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
            this.setPaddingLeft();
            this.setPaddingRight();
        }
        else {
            this._padding.top = Math.round(this._selectedFrame.paddingTop);
            this._padding.bottom = Math.round(this._selectedFrame.paddingBottom);
            this._padding.left = Math.round(this._selectedFrame.paddingLeft);
            this._padding.right = Math.round(this._selectedFrame.paddingRight);
        }
    }

    private setPaddingBottom(): void {
        const children = this._selectedFrame.children;
        this._padding.bottom = this._height - (children[0].y + children[0].height);
        for (let i = 0; i < children.length; i++) {
            let paddingBottom = this._height - (children[i].y + children[i].height);
            if (paddingBottom < this._padding.bottom) {
                this._padding.bottom = Math.round(paddingBottom);
            }
        };
    }

    private setPaddingTop(): void {
        const children = this._selectedFrame.children;
        this._padding.top = children[0].y;
        for (let i = 0; i < children.length; i++) {
            if (children[i].y < this._padding.top) {
                this._padding.top = Math.round(children[i].y);
            }
        };
    }

    private setPaddingRight(): void {
        const children = this._selectedFrame.children;
        this._padding.right = this._width - (children[0].x + children[0].width);
        for (let i = 0; i < children.length; i++) {
            let paddingRight = this._width - (children[i].x + children[i].width);
            if (paddingRight < this._padding.right) {
                this._padding.right = Math.round(paddingRight);
            }
        };
    }

    private setPaddingLeft(): void {
        const children = this._selectedFrame.children;
        this._padding.left = children[0].x;
        for (let i = 0; i < children.length; i++) {
            if (children[i].x < this._padding.left) {
                this._padding.left = Math.round(children[i].x);
            }
        };
    }

}