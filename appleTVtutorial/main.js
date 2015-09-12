function getDocument(url) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {pushDoc(templateXHR.responseXML);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
    return templateXHR;
}

function pushDoc(document) {
    navigationDocument.pushDocument(document);
}

App.onLaunch = function(options) {
    alert();
}

App.onExit = function() {
    console.log('App finished');
}

function alert() {
    var alertXMLString =
    `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
        <alertTemplate>
            <title>Hello AppleTV!</title>
        </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDOMElement = parser.parseFromString(alertXMLString, "application/xml");
    navigationDocument.presentModal(alertDOMElement);
}