/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Class properties for Grid
 =======================================================================
*/

class GridClass extends WebflowClass {

    private _selectedFrame: FrameNode;
    private _rows: {
        y: number;
        bottomY: number;
        children: {
            id: string;
            name: string;
            x: number;
            y: number;
            width: number;
            height: number;
            bottomY: number;
            rightX: number;
        }[];
    }[] = [];
    private _columns: {
        x: number;
        rightX: number;
        children: {
            id: string;
            name: string;
            x: number;
            y: number;
            width: number;
            height: number;
            bottomY: number;
            rightX: number;
        }[];
    }[] = [];

    constructor(selectedFrame: FrameNode) {

        super(selectedFrame.name + " Grid");

        // For grid, we need the selectedFrame
        this._selectedFrame = selectedFrame;

        this.setStyleLess();
    }

    protected setStyleLess(): void {
        this.buildColumns();

        let gridTemplateColumns: string = "";
        let gridTemplateRows: string = "auto";

        for (const col of this._columns) {
            gridTemplateColumns += "1fr ";
        }

        this._styleLess = `grid-template-columns:${gridTemplateColumns}; grid-template-rows:${gridTemplateRows}`;
    }

    private buildColumns(): void {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }
        interface Column { x: number; rightX: number; children: Child[]; }

        const sortedChildren = this.sortChildrenByX();
        let columns: Column[] = [];

        for (const child of sortedChildren) {
            const columnNumber = this.findColumnNumberForChild(child, columns);

            if (columnNumber === null) {
                columns.push({ x: child.x, rightX: child.rightX, children: [child] });
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

    private buildRows(): void {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }
        interface Row { y: number; bottomY: number; children: Child[]; }

        const sortedChildren = this.sortChildrenByY();
        let rows: Row[] = [];

        for (const child of sortedChildren) {
            const rowNumber = this.findRowNumberForChild(child, rows);
            console.log(child.name + " komt in row " + rowNumber);

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
    }


    private findColumnNumberForChild(child: { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }, columns: { x: number; rightX: number; children: { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }[]; }[]): number | null {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }
        interface Column { x: number; rightX: number; children: Child[]; }

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

    private sortChildrenByX(): { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }[] {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }

        const sortedChildren: Child[] = [];
        for (const child of this._selectedFrame.children) {
            sortedChildren.push({ id: child.id, name: child.name, x: child.x, y: child.y, width: child.width, height: child.height, bottomY: (child.y + child.height), rightX: (child.x + child.width) });
        }

        return sortedChildren.sort((a, b) => a.x - b.x);
    }

    private sortChildrenByY(): { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }[] {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }

        const sortedChildren: Child[] = [];
        for (const child of this._selectedFrame.children) {
            sortedChildren.push({ id: child.id, name: child.name, x: child.x, y: child.y, width: child.width, height: child.height, bottomY: (child.y + child.height), rightX: (child.x + child.width) });
        }

        return sortedChildren.sort((a, b) => a.y - b.y);
    }
}