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


    constructor(figmaSelection: FigmaSelection) {
        this._selectedFrame = figmaSelection.selectedFrame;
        this.build();
    }

    private build(): void {

        // Add a Webflow Container
        const container = new Container(this._selectedFrame);

        // Create a Webflow Section         
        const section = new Section(this._selectedFrame);
        section.addChild(container.id);

        // Push Section
        this.pushNode(section.getJSON());
        this.pushStyle(section.class.getJSON());

        // Push Container
        this.pushNode(container.getJSON());
        this.pushStyle(container.class.getJSON());
    }

    private pushNode(nodeObject: object): void {
        // Todo: Validate nodeObject somewhow, maybe with an interface?
        this._webflowJSON.payload.nodes.push(nodeObject);
    }

    private pushStyle(styleObject: object): void {
        // Todo: Validate styleObject somewhow, maybe with an interface? Or pass custom object?
        this._webflowJSON.payload.styles.push(styleObject);
    }


    public getJSONString(): string {
        return JSON.stringify(this._webflowJSON);
    }
}
