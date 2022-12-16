/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Class properties for Grid
 =======================================================================
*/

class GridClass extends WebflowClass {

    private _selectedFrame: FrameNode;
    private _columns: Column[] = [];

    constructor(selectedFrame: FrameNode) {

        super(selectedFrame.name + " Grid");

        // For grid, we need the selectedFrame
        this._selectedFrame = selectedFrame;

        this.buildColumns();
        this.setStyleLess();
    }

    protected setStyleLess(): void {

        let gridTemplateRows: string = "auto";
        let gridTemplateColumns: string = "";

        for (const column of this._columns) {
            gridTemplateColumns += column.finalWidth + "px ";
        }

        this._styleLess = `grid-template-columns:${gridTemplateColumns}; grid-template-rows:${gridTemplateRows};grid-column-gap: 0px; grid-row-gap: 0px;`;
        this.setVariants();
    }

    protected setVariants(): void {
        let totalColumnWidth = this.getTotalColumnWidth();
        let numberOfColumns = this._columns.length;
        let rowStyle = "";
        for (let i = 0; i < numberOfColumns; i++) {
            rowStyle += " auto";
        }

        if (totalColumnWidth > 768) {
            console.log(rowStyle);
            this.setMediumStyle(`grid-template-columns:1fr;grid-template-rows:${rowStyle};`);
        }
    }


    private getTotalColumnWidth(): number {
        let totalColumnWidth = 0;
        for (const column of this._columns) {
            totalColumnWidth += column.finalWidth;
        }
        return totalColumnWidth;
    }

    private buildColumns(): void {

        const sortedChildren = this.sortChildren("x");
        let columns: Column[] = [];

        for (const child of sortedChildren) {
            const columnNumber = this.findColumnNumberForChild(child, columns);

            // Create new column with child
            if (columnNumber === null) {
                columns.push(new Column(child.x, child.rightX, [child]));
                continue;
            }

            // Add child to an existing column
            columns[columnNumber].children.push(child);

            // Adjust column width if neccessary
            if (child.rightX > columns[columnNumber].rightX) {
                columns[columnNumber].rightX = child.rightX;
            }
        }

        this._columns = columns;
        this.calculateColumnsFinalWidth();
    }

    private calculateColumnsFinalWidth(): void {

        let previousColumn = this._columns[0];
        for (const column of this._columns) {
            previousColumn.finalWidth = column.x - previousColumn.x;
            previousColumn = column;
        }
    }

    private findColumnNumberForChild(child: Child, columns: Column[]): number | null {

        // If only one column is available, check if it fits. If not, create a new one.
        if (columns.length < 2) {
            return (columns.length === 1 && child.x < columns[0].rightX) ? 0 : null;
        }
        // Multiple columns available, find the nearest one, and check if the child fits;
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

    // Not sure if this is the best place for this function
    private sortChildren(sort: "x" | "y"): Child[] {

        const sortedChildren: Child[] = [];
        for (const child of this._selectedFrame.children) {
            sortedChildren.push(new Child(child.id, child.name, child.x, child.y, child.width, child.height));
        }

        return sortedChildren.sort((a, b) => a[sort] - b[sort]);
    }

}