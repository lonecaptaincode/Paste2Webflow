/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Starting point for the plugin
 =======================================================================
*/

figma.showUI(__html__, { width: 250, height: 250, title: "Paste2Webflow" });

// DEZE GEBRUIKEN ALS DE KNOP STRAKS ACTIEF IS
// figma.ui.onmessage = msg => { 
//   if (msg.type === "getClipboardData") {
//      const selection = new Selection();
//   }
// };

figma.on("selectionchange", () => {

    let response: { type: string, name: string, message: string, jsondata: string; };

    try {
        // Get selected Element from Figma en do some checks
        const figmaSelection = new FigmaSelection();

        // Create a new webflowBuilder, to start building the JSON        
        const webflowBuilder = new WebflowBuilder(figmaSelection);

        // Get Webflow JSON Data
        const webflowJSONString = webflowBuilder.getJSONString();
        //console.log(webflowJSONString);
        // Send response to UI
        response = { type: "message", message: "succes", name: figmaSelection.selectedFrame.name, jsondata: webflowJSONString };
        figma.ui.postMessage(response);
    }
    catch (error: any) {
        response = { type: "error", message: error.message, name: "", jsondata: "" };
        figma.ui.postMessage(response);
    }
});