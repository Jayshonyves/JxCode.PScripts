#target Photoshop

/* 计算中心点偏移位置 */

var document = app.activeDocument;

function getDocumentSize(document) {
    var obj = {}
    obj.width = Math.floor(document.width.as("px") / 2);
    obj.height = Math.floor(document.height.as("px") / 2);
    return obj;
}

function getLayerSize(layer) {
    var bounds = layer.bounds
    var obj = {}
    obj.width = Math.floor(bounds[2].as("px")) - Math.floor(bounds[0].as("px"));
    obj.height = Math.floor(bounds[3].as("px")) - Math.floor(bounds[1].as("px"));
    return obj;
}

function getLayerPosition(layer) {
    var point = {}
    point.x = layer.bounds[0].as("px");
    point.y = layer.bounds[1].as("px");
    return point;
}

var docSize = getDocumentSize(document)
var layerPos = getLayerPosition(document.activeLayer);
var layerSize = getLayerSize(document.activeLayer);
layerPos.x += layerSize.width / 2 - docSize.width;
layerPos.y += layerSize.height / 2 - docSize.height;

alert(layerPos.x + ", " + layerPos.y)