#target Photoshop

/* 检测选中的图层大小是否一致 */

var document = app.activeDocument;

function getLayerSize(layer) {
    var bounds = layer.bounds
    var obj = {}
    obj.width = Math.floor(bounds[2].as("px")) - Math.floor(bounds[0].as("px"));
    obj.height = Math.floor(bounds[3].as("px")) - Math.floor(bounds[1].as("px"));
    return obj;
}
function sizeEquals(x, y) {
    return x.width == y.width && x.height == y.height;
}
function getSelectedLayers() {
    var idGrp = stringIDToTypeID("groupLayersEvent");
    var descGrp = new ActionDescriptor();
    var refGrp = new ActionReference();
    refGrp.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    descGrp.putReference(charIDToTypeID("null"), refGrp);
    executeAction(idGrp, descGrp, DialogModes.ALL);
    var resultLayers = new Array();
    for (var ix = 0; ix < app.activeDocument.activeLayer.layers.length; ix++) {
         resultLayers.push(app.activeDocument.activeLayer.layers[ix])
    }
    var id8 = charIDToTypeID("slct");
    var desc5 = new ActionDescriptor();
    var id9 = charIDToTypeID("null");
    var ref2 = new ActionReference();
    var id10 = charIDToTypeID("HstS");
    var id11 = charIDToTypeID("Ordn");
    var id12 = charIDToTypeID("Prvs");
    ref2.putEnumerated(id10, id11, id12);
    desc5.putReference(id9, ref2);
    executeAction(id8, desc5, DialogModes.NO);
    return resultLayers;
}

var selectedLayers = getSelectedLayers();
var firstSize = null;
var errorList = new Array();
for (var i = 0; i < selectedLayers.length; i++) {
    var size = getLayerSize(selectedLayers[i]);

    if(firstSize == null) {
        firstSize = size;
    }

    if(!sizeEquals(firstSize, size)){
        errorList.push(selectedLayers[i].name);
    }

}

if(errorList.length == 0) {
    alert("no different");
} else {
    alert(errorList.join("\n"));
}