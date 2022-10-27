/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Class properties for Grid
 =======================================================================
*/

class GridClass extends WebflowClass {

    private _selectedFrame: FrameNode;
    //private _rows: Row[] = [];
    private _columns: Column[] = [];

    constructor(selectedFrame: FrameNode) {

        super(selectedFrame.name + " Grid");

        // For grid, we need the selectedFrame
        this._selectedFrame = selectedFrame;

        this.buildColumns();
        //this.buildRows();
        // Decide between a grid with columns or a grid with rows
        // Decide if some children should get their own grid/wrapper (headers for example) 
        //and delete them from columns/rows

        this.setStyleLess();
    }

    protected setStyleLess(): void {

        let gridTemplateRows: string = "auto";
        let gridTemplateColumns: string = "";
        let smallestColGap: number = 0;
        let previousColumnRightX: number = 0;

        for (let i = 0; i < this._columns.length; i++) {
            let col = this._columns[i];


            // Gap
            let difference = 0;
            if (i > 0) {
                let currentColGap = Math.round(col.x - previousColumnRightX);
                if (i == 1) {
                    smallestColGap = currentColGap;
                }
                if (currentColGap < smallestColGap) {
                    difference = smallestColGap - currentColGap;
                    smallestColGap = currentColGap;
                }
            }
            previousColumnRightX = col.rightX;
            // Width
            var columnWidth: number = Math.round(col.rightX - col.x + difference);
            gridTemplateColumns += columnWidth + "px ";
            console.log("colwidth " + columnWidth);
        }

        this._styleLess = `grid-template-columns:${gridTemplateColumns}; grid-template-rows:${gridTemplateRows};col-gap:${smallestColGap}`;
    }


    private buildColumns(): void {

        const sortedChildren = this.sortChildrenByX();
        let columns: Column[] = [];

        for (const child of sortedChildren) {
            const columnNumber = this.findColumnNumberForChild(child, columns);

            if (columnNumber === null) {
                columns.push(new Column(child.x, child.rightX, [child]));
                continue;
            }
            // check colspan
            columns[columnNumber].children.push(child);
            if (child.rightX > columns[columnNumber].rightX) {
                columns[columnNumber].rightX = child.rightX;
            }
        }

        this._columns = columns;
    }

    private findColumnNumberForChild(child: Child, columns: Column[]): number | null {

        // If only one column is available, check if it fits. If not, create a new one.
        if (columns.length < 2) {
            return (columns.length === 1 && child.x < columns[0].rightX) ? 0 : null;
        }
        // Multiple columns available, find the nearest one, and check if the child fits
        let nearestColumn: Column = columns[0];
        let nearestColumnNumber: number = 0;
        let lowestDifference: number = child.x - columns[0].x;

        columns.forEach((existingColumn: Column, key: number) => {
            let difference = child.x - existingColumn.x;
            if (difference < lowestDifference) {
                lowestDifference = difference;
                nearestColumn = existingColumn;
                nearestColumnNumber = key;
            }
        });

        return (child.x < nearestColumn.rightX) ? nearestColumnNumber : null;
    }

    private sortChildrenByX(): Child[] {

        const sortedChildren: Child[] = [];
        for (const child of this._selectedFrame.children) {
            sortedChildren.push(new Child(child.id, child.name, child.x, child.y, child.width, child.height, (child.y + child.height), (child.x + child.width)));
        }

        return sortedChildren.sort((a, b) => a.x - b.x);
    }

}



/*private buildRows(): void {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }
        interface Row { y: number; bottomY: number; children: Child[]; }

        const sortedChildren = this.sortChildrenByY();
        let rows: Row[] = [];

        for (const child of sortedChildren) {
            const rowNumber = this.findRowNumberForChild(child, rows);

            if (rowNumber === null) {
                rows.push({ y: child.y, bottomY: child.bottomY, children: [child] });
                continue;
            }
            // check rowspan
            rows[rowNumber].children.push(child);
            if (child.bottomY > rows[rowNumber].bottomY) {
                rows[rowNumber].bottomY = child.bottomY;
            }
        }

        this._rows = rows;
    }*/



/*
private sortChildrenByY(): { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }[] {

    interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }

    const sortedChildren: Child[] = [];
    for (const child of this._selectedFrame.children) {
        sortedChildren.push({ id: child.id, name: child.name, x: child.x, y: child.y, width: child.width, height: child.height, bottomY: (child.y + child.height), rightX: (child.x + child.width) });
    }

    return sortedChildren.sort((a, b) => a.y - b.y);
}
*/

/*
    private calculateFractions(): string {
 
        let columns: { width: number, fraction: string; }[] = [];
        //const numberOfColumns: number = this._columns.length;
        let totalColumnsWidth: number = 0;
 
        for (const col of this._columns) {
            let columnWidth = col.rightX - col.x;
            columns.push({ width: columnWidth, fraction: "" });
            totalColumnsWidth += columnWidth;
        }
 
 
        for (const column of columns) {
            let percentageOfTotal = totalColumnsWidth / column.width;
 
            //fractions += "1fr ";
        }
 
 
        //let fractions: string = "";
        //return fractions;
    }
*/

/*
    private findRowNumberForChild(child: { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }, rows: { y: number; bottomY: number; children: { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }[]; }[]): number | null {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }
        interface Row { y: number; bottomY: number; children: Child[]; }

        // If only one row is available, check if it fits. If not, create a new one.
        if (rows.length < 2) {
            return (rows.length === 1 && child.y < rows[0].bottomY) ? 0 : null;
        }
        // Multiple rows available, find the nearest one, and check if the child fits
        let nearestRow: Row = rows[0];
        let nearestRowNumber: number = 0;
        let lowestDifference: number = child.y - rows[0].y;

        rows.forEach((existingRow: Row, key: number) => {
            let difference = child.y - existingRow.y;
            if (difference < lowestDifference) {
                lowestDifference = difference;
                nearestRow = existingRow;
                nearestRowNumber = key;
            }
        });

        return (child.y < nearestRow.bottomY) ? nearestRowNumber : null;
    }
    */