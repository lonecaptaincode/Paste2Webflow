/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Section element to transform Figma data to a Webflow Section
 =======================================================================
*/


class Container extends WebflowElement {

    private _selectedFrame: FrameNode;
    //private _contentOrientation: string = "vertical";
    //private _rows: number = 1;
    private _grid: object[] = [];

    constructor(selectedFrame: FrameNode) {
        super();

        this._type = "Container";
        this._tag = "div";
        this._data = { grid: { type: "container" }, tag: "div" };

        this._selectedFrame = selectedFrame;
        //this.setContentOrientation();
        //this.setRows();

        this.buildGrid();
    }


    private buildGrid() {

        // Order children based on child.y (lowest y first)
        interface Child {
            id: string;
            name: string;
            x: number;
            y: number;
            bottomY: number;
            rightX: number;
        }
        const sortedChildren: Child[] = [];

        for (const child of this._selectedFrame.children) {
            let newChild = { id: child.id, name: child.name, x: child.x, y: child.y, bottomY: (child.y + child.height), rightX: (child.x + child.width) };
            sortedChildren.push(newChild);
        }
        sortedChildren.sort((a, b) => a.y - b.y);


        let numRows = 0;
        interface Row {
            y: number;
            bottomY: number;
            children: Child[];
        }
        let rows: Row[] = [];


        for (const child of sortedChildren) {

            // Check rows: is there a row to fit the child (row.y <= child.y)
            const existingRows = rows.filter((row: Row) => {
                return row.y <= child.y;
            });
            switch (existingRows.length) {
                case 0:
                    const newRow = { y: child.y, bottomY: child.bottomY, children: [child] };
                    rows.push(newRow);
                    console.log(child.name + " (y: " + child.y + "): New row created (switch 0) and child pushed to new row");
                    numRows++;
                    break;
                case 1:
                    // Does child fit in this row?                                 
                    if (child.y < existingRows[0].bottomY) {
                        // Add child to row                       
                        existingRows[0].children.push(child);
                        if (child.bottomY > existingRows[0].bottomY) {
                            existingRows[0].bottomY = child.bottomY;
                        }
                        console.log(child.name + " (y: " + child.y + "): Child pushed to the 1 existing row (switch 1)");;
                    }
                    else {
                        // Child doesn't fit, make new row
                        const newRow = { y: child.y, bottomY: child.bottomY, children: [child] };
                        rows.push(newRow);
                        console.log(child.name + " (y: " + child.y + "): New row created (switch 1) and child pushed to new row");
                        numRows++;
                    }
                    break;
                case 2:
                default:
                    //Nee, meerere rows: 
                    let nearestRow: Row = existingRows[0];
                    let lowestDifference: number = child.y - existingRows[0].y;
                    for (const existingRow of existingRows) {
                        let difference = child.y - existingRow.y;
                        if (difference < lowestDifference) {
                            lowestDifference = difference;
                            nearestRow = existingRow;
                        }
                    }
                    //const nearestRow = Math.max(...rows.map(function (row: Row) { return row.bottomY; }));
                    if (child.y < nearestRow.bottomY) {
                        // Add child to row                       
                        nearestRow.children.push(child);
                        if (child.bottomY > nearestRow.bottomY) {
                            nearestRow.bottomY = child.bottomY;
                        }
                        console.log(child.name + " (y: " + child.y + "): Child pushed to the neares existing row (switch 2)");
                    }
                    else {
                        // Child doesn't fit, make new row
                        const newRow = { y: child.y, bottomY: child.bottomY, children: [child] };
                        rows.push(newRow);
                        console.log(child.name + " (y: " + child.y + "): New row created (switch 2) and child pushed to new row");
                        numRows++;
                    }
                    break;
            }

            // Yes? Is it 1 row, or multiple?
            // 1 row
            // Heeft die row al een otherChild?
            // Ja? Als child.y >= child.bottomY -> nieuwe row maken
            // Nee? plaats child in die row, pas row bottomY aan
            //Nee, meerere rows: 
            // pak row waarvan row.y zo dicht mogelijk bij child.y ligt (kleinste verschil) 
            // Heeft die row al een otherChild?
            // Ja? Als child.y >= child.bottomY -> nieuwe row maken
            // Nee? plaats child in die row, pas row bottomY aan

            // Nee? Maak een nieuwe row voor child dimensions

            // Overlappen rows elkaar? Zo ja, waar? rowspan aanpassen
        }
        console.log("Rows: " + numRows);
        console.log(rows);
    }


    // const found = rows.find((row) => {
    //     let childBottomEdgeY = child.y + child.height;
    //     return child.y >= row.bottomEdgeY || childBottomEdgeY < row.y;
    // });
    // if (found) {
    //     console.log("add row for" + child.name);
    //     let childBottomEdgeY = child.y + child.height;
    //     rows.push({ y: child.y, bottomEdgeY: childBottomEdgeY, height: child.height });
    //     numRows++;
    // }

    // if (child.y >= firstChildBottomEdgeY && child.y >= lowestBottomEdgeY) {
    //     let childBottomEdgeY = child.y + child.height;
    //     lowestBottomEdgeY = childBottomEdgeY;
    //     rows.push({ y: child.y, bottomEdgeY: childBottomEdgeY, height: child.height });
    //     numRows++;
    // }

    // console.log(rows);
    // console.log(numRows);

    // const firstChild = children[0];
    // const firstChildY = firstChild.y;
    // const firstChildHeight = firstChild.height;
    // const firstChildBottomEdgeY = firstChildY + firstChildHeight;
    // let lowestBottomEdgeY = firstChildBottomEdgeY;
    // let rows = [{ y: firstChildY, bottomEdgeY: firstChildBottomEdgeY, height: firstChildHeight }];

    //console.log(firstChild.name + " bottom edge Y:" + firstChildBottomEdgeY);

    // const children = this._selectedFrame.children;
    // let firstChild;

    // for (const child of children) {
    //     const childX = child.x;
    //     const childWidth = child.width;
    //     const rightEdgeXOfChild = childX + childWidth;
    //     const childY = child.y;
    //     const childHeight = child.height;
    //     const bottomEdgeYOfChild = childY + childHeight;

    //     let element: object = { x: childX, y: childY, width: child.width, height: child.height, rightEdgeXOfChild: rightEdgeXOfChild, bottomEdgeYOfChild: bottomEdgeYOfChild, child: child };
    //     this._grid[1] = element;
    //     if (child === children[0]) {
    //         firstChild = child;
    //     }
    // }

    //this._rows = rows;
    //console.log("number of rows:" + this._rows);



    private setRows() {
        // WERKT NOG NIET GOED
        const children = this._selectedFrame.children;
        let rows = 0;

        for (const child of children) {
            const childY = child.y;
            const childHeight = child.height;
            const bottomEdgeYOfChild = childY + childHeight;
            for (const otherChild of children) {
                if (otherChild.y >= bottomEdgeYOfChild) {
                    rows++;
                }
            }
        }

        //this._rows = rows;
        //console.log("number of rows:" + this._rows);

    }

    private setContentOrientation() {

        const children = this._selectedFrame.children;
        let contentOrientation = "vertical";

        for (const child of children) {
            const childX = child.x;
            const childWidth = child.width;
            const rightEdgeXOfChild = childX + childWidth;

            for (const otherChild of children) {
                if (otherChild.x >= rightEdgeXOfChild) {
                    //console.log("horizontal");
                    contentOrientation = "horizontal";

                }
            }
        }

        //this._contentOrientation = contentOrientation;
        //console.log(this._contentOrientation);
    }
}

// if (children.find(otherChild => otherChild.x >= rightEdgeXOfChild)) {
//     contentOrientation = "horizontal";
// }