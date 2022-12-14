/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Column, which is part of a grid
 =======================================================================
*/


class Column {
    private _x: number;
    private _rightX: number;
    private _realWidth: number;
    private _finalWidth: number;
    private _fraction: string = "";
    private _children: Child[];

    constructor(x: number, rightX: number, children: Child[]) {
        this._x = Math.round(x);
        this._rightX = Math.round(rightX);
        this._realWidth = Math.round(rightX - x);
        this._finalWidth = this._realWidth;
        this._children = children;
    }

    // Getters
    public get x(): number {
        return this._x;
    }

    public get rightX(): number {
        return this._rightX;
    }

    public get realWidth(): number {
        return this._realWidth;
    }

    public get finalWidth(): number {
        return this._finalWidth;
    }

    public get fraction(): string {
        return this._fraction;
    }

    public get children(): Child[] {
        return this._children;
    }

    // Setters
    public set x(x: number) {
        this._x = Math.round(x);
    }

    public set rightX(rightX: number) {
        this._rightX = Math.round(rightX);
    }

    public set realWidth(realWidth: number) {
        this._realWidth = Math.round(realWidth);
    }

    public set finalWidth(finalWidth: number) {
        this._finalWidth = Math.round(finalWidth);
    }

    public set fraction(fraction: string) {
        this._fraction = fraction;
    }

    public set children(children: Child[]) {
        this._children = children;
    }

}
