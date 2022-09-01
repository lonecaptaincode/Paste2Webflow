/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a Section element to transform Figma data to a Webflow Section
 =======================================================================
*/


class Container extends WebflowElement {

    private _selectedFrame: FrameNode;
    protected _class: ContainerClass;
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

    constructor(selectedFrame: FrameNode) {
        super();

        this._class = new ContainerClass(selectedFrame);
        this._classNames.push(this._class.name);

        this._type = "Container";
        this._tag = "div";
        this._data = { grid: { type: "container" }, tag: "div" };
        this._selectedFrame = selectedFrame;



        this.buildRows();
        this.buildColumns();
        console.log("Rows: " + this._rows.length);
        console.log(this._rows);
    }


    private buildColumns() {

        const containerUsableWidth: number = this._class.getUsableWidth();
        const colWidth: number = containerUsableWidth / 12;

        for (const row of this._rows) {
            const children = row.children;
            for (const child of children) {
                //const width = chil;
            }
        }
    }

    private buildRows(): void {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }
        interface Row { y: number; bottomY: number; children: Child[]; }

        const sortedChildren = this.sortChildrenByY();
        let rows: Row[] = [];

        for (const child of sortedChildren) {
            const rowKey = this.findRowKeyForChild(child, rows);
            // console.log(child.name + " komt in row " + rowKey);

            if (rowKey === null) {
                rows.push({ y: child.y, bottomY: child.bottomY, children: [child] });
                //console.log(child.name + "(" + child.y + ") is in een nieuwe row gepushed");
                continue;
            }
            // check rowspan
            rows[rowKey].children.push(child);
            if (child.bottomY > rows[rowKey].bottomY) {
                rows[rowKey].bottomY = child.bottomY;
            }
            ///console.log(child.name + "(" + child.y + ") is in een bestaande row (key: " + rowKey + ") gepushed");
        }

        this._rows = rows;
    }

    private findRowKeyForChild(child: { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }, rows: { y: number; bottomY: number; children: { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }[]; }[]): number | null {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }
        interface Row { y: number; bottomY: number; children: Child[]; }

        // If only one row is available, check if it fits. If not, create a new one.
        if (rows.length < 2) {
            return (rows.length === 1 && child.y < rows[0].bottomY) ? 0 : null;
        }
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

    private sortChildrenByY(): { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }[] {

        interface Child { id: string; name: string; x: number; y: number; width: number; height: number; bottomY: number; rightX: number; }

        const sortedChildren: Child[] = [];
        for (const child of this._selectedFrame.children) {
            sortedChildren.push({ id: child.id, name: child.name, x: child.x, y: child.y, width: child.width, height: child.height, bottomY: (child.y + child.height), rightX: (child.x + child.width) });
        }

        return sortedChildren.sort((a, b) => a.y - b.y);
    }

    public get class(): ContainerClass {
        return this._class;
    }

}