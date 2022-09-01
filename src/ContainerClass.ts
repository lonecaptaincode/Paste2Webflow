/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Parent element for every Webflow element
 =======================================================================
*/

class ContainerClass extends WebflowClass {

    private _selectedFrame: FrameNode;
    private _layoutMode: string;
    private _parentSectionwidth: number;
    private _padding: { top: number, bottom: number, left: number, right: number; } = { top: 0, bottom: 0, left: 0, right: 0 };

    constructor(selectedFrame: FrameNode) {

        super(selectedFrame.name + "Container");

        // For containers, we need the selectedFrame
        this._selectedFrame = selectedFrame;
        this._layoutMode = selectedFrame.layoutMode;
        this._parentSectionwidth = selectedFrame.width;
        this.setPadding();
        this.setStyleLess();
    }

    protected setStyleLess(): void {
        this._styleLess = `max-width:${this._parentSectionwidth}px;height:100%;padding:${this._padding.top}px ${this._padding.right}px ${this._padding.bottom}px ${this._padding.left}px;`;
    }

    public setPadding(): void {
        if (this._layoutMode === "NONE") {
            this.setPaddingLeft();
            this.setPaddingRight();
        }
        else {
            this._padding.left = Math.round(this._selectedFrame.paddingLeft);
            this._padding.right = Math.round(this._selectedFrame.paddingRight);
        }
    }

    private setPaddingRight(): void {
        const children = this._selectedFrame.children;
        this._padding.right = this._parentSectionwidth - (children[0].x + children[0].width);
        for (const child of children) {
            let paddingRight = this._parentSectionwidth - (child.x + child.width);
            if (paddingRight < this._padding.right) {
                this._padding.right = Math.round(paddingRight);
            }
        }
    }

    private setPaddingLeft(): void {
        const children = this._selectedFrame.children;
        this._padding.left = children[0].x;
        for (const child of children) {
            if (child.x < this._padding.left) {
                this._padding.left = Math.round(child.x);
            }
        }
    }

    public getUsableWidth() {
        return this._parentSectionwidth - this._padding.left - this._padding.right;
    }
}