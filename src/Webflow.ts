/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Creates a way to dynamically generate a Webflow compatible JSON output
 =======================================================================
*/

class Webflow {

    // private _start: string = '{"type": "@webflow/XscpData","payload": {';
    // private _middle: string = '"nodes": [{"_id": "8c91a656-4858-68d5-7c5c-1fe3ecff554f","type": "Section","tag": "div","classes": [selectedFrame.name],"children": ["b35a38dc-9704-0922-3ef7-993e2aeedffa"],"data": {"grid": {"type": "section";},"tag": "div";}},{"_id": "b35a38dc-9704-0922-3ef7-993e2aeedffa","type": "Container","tag": "div","classes": ["test"],"children": [;"a7184cab-1224-36bd-7807-619e96ecee23"],"data": {"tag": "div","grid": {"type": "container";};};}],"styles": [{"styleLess": "background-color:" + selectedFrame.backgroundColor + ";height:" + .height + "px;","_id": selectedFrame.name,"fake": false,"type": "class","name": selectedFrame.name,"namespace": "","comb": "","selector": null,"children": [],"createdBy": ""},{"styleLess": "height:100%","_id": "test","fake": false,"type": "class","name": "test","namespace": "","comb": "","selector": null,"children": [],"createdBy": ""},],';
    // private _end: string = '"assets": [],"ix1": [],"ix2": {"interactions": [],"events": [],"actionLists": []}},"meta": {"unlinkedSymbolCount": 0,"droppedLinks": 0,"dynBindRemovedCount": 0,"dynListBindRemovedCount": 0,"paginationRemovedCount": 0}};';

    private _webflowObject: any = {
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

    public pushNode(nodeObject: Object): void {
        // Todo: Validate nodeObject somewhow, maybe with an interface?
        this._webflowObject.payload.nodes.push(nodeObject);
    }

    public pushStyle(styleObject: Object): void {
        // Todo: Validate styleObject somewhow, maybe with an interface? Or pass custom object?
        this._webflowObject.payload.styles.push(styleObject);
    }

    public get JSONString(): string {

        return JSON.stringify(this._webflowObject);
    }
}