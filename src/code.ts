/*
Goal, transform a top level frame and everything in it to webflow JSON



2. Created a FRAME (or FIGMA) Object, that gets all relevant information from FIGMA
3. SECTION: Get outside measurements of Section: height, background color. 
4. CONTAINER: Get section padding
- What is the x,y of the next first child element? That will be the padding of the container (width, height, margin and padding)
*/


figma.showUI(__html__,{width:250,height:250,title:"Paste2Webflow"});

// DEZE GEBRUIKEN ALS DE KNOP STRAKS ACTIEF IS
// figma.ui.onmessage = msg => { 
//   if (msg.type === 'getClipboardData') {
//      const selection = new Selection();
//   }
// };

// When an element is selected
figma.on("selectionchange", () => { 
    
    let response : object;

    
    try {
        // Get selected Element from Figma en do some checks
        const selectedFrame = new SelectedFrame();
        
        // Let UI know what the selected element is
        response = {name:selectedFrame.name};

        // Create a new Webflow object, to start building the JSON
        const webflow = new Webflow();
        
        // Create a Webflow "Section" object to start transforming the Figma Selection data to a format that Webflow can read
        const section = new Section(selectedFrame.name,selectedFrame.height, selectedFrame.backgroundColor, webflow);
        
        // Get Webflow JSON Data
        const webflowJSONString = webflow.JSONString;
        //console.log(webflowJSONString);
        response = {name:selectedFrame.name, jsondata:webflowJSONString}      
        figma.ui.postMessage(response);
    }
    catch(error : any) {                
        response = { type: "error", message: error.message };
        figma.ui.postMessage(response);
    }

    
})



// function getJSON() {
  
//   // Get selection data
//   var selectedElement = figma.currentPage.selection[0];  
//   if(!selectedElement) {    
//     const response = {type: "error", message: "No element selected"}
//     figma.ui.postMessage(response);
//   }

//   else {

//     const width = selectedElement.width;
//     const height = selectedElement.height;
//     const name = selectedElement.name;
    
//     const backgroundColorHex = getBackgroundColor(selectedElement);
        

   
    
    
     
//   }
// }






  




// const data = '{"type":"@webflow/XscpData","payload":{"nodes":[{"_id":"","type":"Section","tag":"div","classes":[],"children":[],"data":{"grid":{"type":"section"},"tag":"div"}}],"styles":[],"assets":[],"ix1":[],"ix2":{"interactions":[],"events":[],"actionLists":[]}},"meta":{"unlinkedSymbolCount":0,"droppedLinks":0,"dynBindRemovedCount":0,"dynListBindRemovedCount":0,"paginationRemovedCount":0}}';
         
//       if (event.clipboardData) {
//         event.clipboardData.setData('application/json', data);        
//         console.log(data);
//       }
//       event.preventDefault();
//     }, true);
//     document.execCommand('copy');
//   console.log(1);


//figma.closePlugin();


// const jsondata = {
//     "type": "@webflow/XscpData",
//     "payload": {
//         "nodes": [
//           {
//             "_id": "8c91a656-4858-68d5-7c5c-1fe3ecff554f",
//             "type": "Section",
//             "tag": "div",
//             "classes": [selectedFrame.name],
//             "children": [
//                 "b35a38dc-9704-0922-3ef7-993e2aeedffa"
//             ],
//             "data": {
//                 "grid": {
//                     "type": "section"
//                 },
//                 "tag": "div"
//             }
//         },
//         {
//             "_id": "b35a38dc-9704-0922-3ef7-993e2aeedffa",
//             "type": "Container",
//             "tag": "div",
//             "classes": ["test"],
//             "children": [
//                 "a7184cab-1224-36bd-7807-619e96ecee23"
//             ],
//             "data": {
//                 "tag": "div",
//                 "grid": {
//                     "type": "container"
//                 }
//             }
//         }
//         ],
        
//         "styles": [
//           {
//               "styleLess": "background-color:"+selectedFrame.backgroundColor+";height:"+selectedFrame.height+"px;",                      
//               "_id": selectedFrame.name,
//               "fake": false,
//               "type": "class",
//               "name": selectedFrame.name,
//               "namespace": "",
//               "comb": "",
//               "selector": null,
//               "children": [],
//               "createdBy": ""
//           },
//           {
//             "styleLess": "height:100%",                    
//             "_id": "test",
//             "fake": false,
//             "type": "class",
//             "name": "test",
//             "namespace": "",
//             "comb": "",
//             "selector": null,
//             "children": [],
//             "createdBy": ""
//         },              
//       ],
//         "assets": [],
//         "ix1": [],
//         "ix2": {
//             "interactions": [],
//             "events": [],
//             "actionLists": []
//         }
//     },
//     "meta": {
//         "unlinkedSymbolCount": 0,
//         "droppedLinks": 0,
//         "dynBindRemovedCount": 0,
//         "dynListBindRemovedCount": 0,
//         "paginationRemovedCount": 0
//     } 
//   };