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
    private _rows: { y: number; bottomY: number; children: { id: string; name: string; x: number; y: number; bottomY: number; rightX: number; }[]; }[];

    constructor(selectedFrame: FrameNode) {
        super();
        this._type = "Container";
        this._tag = "div";
        this._data = { grid: { type: "container" }, tag: "div" };
        this._selectedFrame = selectedFrame;
        this._rows = this.buildRows();

        console.log("Rows: " + this._rows.length);
        console.log(this._rows);
    }


    private buildRows(): { y: number; bottomY: number; children: { id: string; name: string; x: number; y: number; bottomY: number; rightX: number; }[]; }[] {

        interface Child {
            id: string;
            name: string;
            x: number;
            y: number;
            bottomY: number;
            rightX: number;
        }
        interface Row {
            y: number;
            bottomY: number;
            children: Child[];
        }

        const sortedChildren = this.sortChildrenByY();
        let rows: Row[] = [];

        for (const child of sortedChildren) {
            const rowKey = this.findRowForChild(child, rows);
            console.log(child.name + " komt in row " + rowKey);

            if (rowKey === null) {
                rows.push({ y: child.y, bottomY: child.bottomY, children: [child] });
                console.log(child.name + "(" + child.y + ") is in een nieuwe row gepushed");
                continue;
            }
            rows[rowKey].children.push(child);
            if (child.bottomY > rows[rowKey].bottomY) {
                rows[rowKey].bottomY = child.bottomY;
            }
            console.log(child.name + "(" + child.y + ") is in een bestaande row (key: " + rowKey + ") gepushed");
        }
        return rows;
    }

    private findRowForChild(child: { id: string; name: string; x: number; y: number; bottomY: number; rightX: number; }, rows: { y: number; bottomY: number; children: { id: string; name: string; x: number; y: number; bottomY: number; rightX: number; }[]; }[]): number | null {
        interface Child {
            id: string;
            name: string;
            x: number;
            y: number;
            bottomY: number;
            rightX: number;
        }
        interface Row {
            y: number;
            bottomY: number;
            children: Child[];
        }

        switch (rows.length) {
            case 0:
                // No rows yet, so no row to add the child to
                return null;
            case 1:
                // One row, only return the row index, if the child fits in this row
                console.log(rows[0]);
                return (child.y < rows[0].bottomY) ? 0 : null;
            default:
                // Multiple rows available, find the nearest one, and check if the child fits
                let nearestRow: Row = rows[0];
                let nearestRowKey: number = 0;
                let lowestDifference: number = child.y - rows[0].y;

                rows.forEach((existingRow: Row, key: number) => {
                    let difference = child.y - existingRow.y;
                    if (difference < lowestDifference) {
                        lowestDifference = difference;
                        nearestRow = existingRow;
                        nearestRowKey = key;
                    }
                });

                return (child.y < nearestRow.bottomY) ? nearestRowKey : null;
        }
    }

    private sortChildrenByY(): { id: string; name: string; x: number; y: number; bottomY: number; rightX: number; }[] {
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
            sortedChildren.push({ id: child.id, name: child.name, x: child.x, y: child.y, bottomY: (child.y + child.height), rightX: (child.x + child.width) });
        }

        return sortedChildren.sort((a, b) => a.y - b.y);
    }

}