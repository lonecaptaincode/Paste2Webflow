/* 
=========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Handles the processing of translating Figma to Webflow compatible JSON
 ========================================================================
*/

class WebflowBuilder {

    private _webflowJSON: {
        type: string;
        payload: {
            nodes: object[],
            styles: object[],
            assets: string[],
            ix1: string[],
            ix2: {
                "interactions": string[],
                "events": string[],
                "actionLists": string[];
            },
        },
        meta: {
            unlinkedSymbolCount: number,
            droppedLinks: number,
            dynBindRemovedCount: number,
            dynListBindRemovedCount: number,
            paginationRemovedCount: number;
        };
    } = {
            type: "@webflow/XscpData",
            payload: {
                nodes: [],
                styles: [],
                assets: [],
                ix1: [],
                ix2: {
                    "interactions": [],
                    "events": [],
                    "actionLists": []
                }
            },
            meta: {
                unlinkedSymbolCount: 0,
                droppedLinks: 0,
                dynBindRemovedCount: 0,
                dynListBindRemovedCount: 0,
                paginationRemovedCount: 0
            }
        };

    private _selectedFrame: FrameNode;
    private _elements: (Section | Container | Grid | Wrapper)[] = [];



    constructor(figmaSelection: FigmaSelection) {
        this._selectedFrame = figmaSelection.selectedFrame;
        this.buildElements();
        this.buildJSON();
    }

    private buildElements(): void {

        // Create a Webflow Section (with top and bottom padding)         
        const section = new Section(this._selectedFrame);
        this._elements.push(section);

        // Create a Webflow Container (with left and right padding)
        const container = new Container(this._selectedFrame, section);
        this._elements.push(container);

        // Create a Webflow Grid
        const grid = new Grid(this._selectedFrame, container);
        this._elements.push(grid);


    }

    private buildJSON() {

        for (const element of this._elements) {
            this.addNode(element.getJSON());
            this.addStyle(element.class.getJSON());
        }
    }

    private addNode(nodeObject: object): void {
        // Todo: Validate nodeObject somewhow, maybe with an interface?
        this._webflowJSON.payload.nodes.push(nodeObject);
    }

    private addStyle(styleObject: object): void {
        // Todo: Validate styleObject somewhow, maybe with an interface? Or pass custom object?
        this._webflowJSON.payload.styles.push(styleObject);
    }


    public getJSONString(): string {
        return JSON.stringify(this._webflowJSON);
    }
}
