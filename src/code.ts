/* 
========================================================================
 Copyright (C) 2022 lonecaptain. All Rights Reserved
 Starting point for the plugin
 =======================================================================
*/

figma.showUI(__html__, { width: 250, height: 250, title: "Paste2Webflow" });

// DEZE GEBRUIKEN ALS DE KNOP STRAKS ACTIEF IS
// figma.ui.onmessage = msg => { 
//   if (msg.type === 'getClipboardData') {
//      const selection = new Selection();
//   }
// };

figma.on("selectionchange", () => {

    let response: object;

    try {
        // Get selected Element from Figma en do some checks
        const figmaParentFrame = new FigmaParentFrame();
        const selectedFrame = figmaParentFrame.selectedFrame;

        // Let UI know what the selected element is
        response = { name: selectedFrame.name };

        // Create a new webflowBuilder, to start building the JSON        
        const webflowBuilder = new WebflowBuilder(selectedFrame);

        // Get Webflow JSON Data
        const webflowJSONString = webflowBuilder.getJSONString();
        console.log(webflowJSONString);
        // Send response to UI
        response = { name: selectedFrame.name, jsondata: webflowJSONString };
        figma.ui.postMessage(response);
    }
    catch (error: any) {
        response = { type: "error", message: error.message };
        figma.ui.postMessage(response);
    }
});