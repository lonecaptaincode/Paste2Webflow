/* 
=========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Handles the processing of translating Figma to Webflow compatible JSON
 ========================================================================
*/

class WebflowBuilder {
    private _webflowJSON: any = {
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


    constructor(selectedFrame: FrameNode) {
        this._selectedFrame = selectedFrame;
        this.initialize();
    }

    private initialize(): void {
        // Create a Webflow "Section" object to start transforming the Figma Selection data to a format that Webflow can read
        this.addSection();
    }

    private addSection(): void {
        const section = new Section(this._selectedFrame.name);
        const sectionClass = new WebflowClass(section.name, this._selectedFrame);
        section.addClass(sectionClass.name);

        this.pushNode(section.getJSON());
        this.pushStyle(sectionClass.getJSON());
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
