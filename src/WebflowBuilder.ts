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
        this.build();
    }

    private build(): void {
        // Create a Webflow Section         
        const section = new Section();
        const sectionClass = new WebflowClass(this._selectedFrame);
        section.addClass(sectionClass.name);

        // Add a Webflow Container
        const container = new Container();
        const containerClass = new WebflowClass(this._selectedFrame);
        //container.addClass(containerClass.name);

        // Add container as child to section
        section.addChild(container.id);

        // Push Section
        this.pushNode(section.getJSON());
        this.pushStyle(sectionClass.getJSON());

        // Push Container
        this.pushNode(container.getJSON());
        //this.pushStyle(containerClass.getJSON());
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
