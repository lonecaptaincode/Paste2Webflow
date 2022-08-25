/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Section element to transform Figma data to a Webflow Section
 =======================================================================
*/


class Container extends WebflowElement {

    constructor() {
        super();
        this._type = "Container";
        this._tag = "div";
        this._data = { grid: { type: "container" }, tag: "div" };
    }
}

/*
4. CONTAINER: Get section padding
- What is the x,y of the next first child element? That will be the padding of the container (width, height, margin and padding)
*/