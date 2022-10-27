/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Child, which is an child element of the selected section
 =======================================================================
*/


class Child {
    private _id: string;
    private _name: string;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _bottomY: number;
    private _rightX: number;



    constructor(id: string, name: string, x: number, y: number, width: number, height: number) {
        this._id = id;
        this._name = name;
        this._x = Math.round(x);
        this._y = Math.round(y);
        this._width = Math.round(width);
        this._height = Math.round(height);
        this._rightX = x + width;
        this._bottomY = y + height;
    }

    // Getters
    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get bottomY(): number {
        return this._bottomY;
    }

    public get rightX(): number {
        return this._rightX;
    }

    // Setters
    public set id(id: string) {
        this._id = id;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set x(x: number) {
        this._x = Math.round(x);
    }

    public set y(y: number) {
        this._y = Math.round(y);
    }

    public set width(width: number) {
        this._width = Math.round(width);
    }

    public set height(height: number) {
        this._height = Math.round(height);
    }

    public set bottomY(bottomY: number) {
        this._bottomY = Math.round(bottomY);
    }

    public set rightX(rightX: number) {
        this._rightX = Math.round(rightX);
    }

}