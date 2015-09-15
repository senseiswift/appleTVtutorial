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
    
    pushFirstXML()
    
}

App.onExit = function() {
    console.log('App finished');
}

var firstXMLString =
`<?xml version="1.0" encoding="UTF-8" ?>
<document>
<formTemplate>
<banner>
<img src="http://localhost:8000/title.png" width="800" height="400"/>
<description>Enter Password</description>
</banner>
<textField>hirakegoma</textField>
<footer>
<button>
<text>Submit</text>
</button>
</footer>
</formTemplate>
</document>`

var secondXMLString =
`<?xml version="1.0" encoding="UTF-8" ?>
<document>
<alertTemplate>
<title>Bye AppleTV!</title>
<button>
<text>Bye!</text>
</button>
</alertTemplate>
</document>`

function firstAlert() {
    
    function showSecondXML() {
        var parser = new DOMParser();
        var alertDOMElement = parser.parseFromString(secondXMLString, "application/xml");
        alertDOMElement.addEventListener("select", function(){firstAlert();}, false);
        navigationDocument.presentModal(alertDOMElement);
    }
    
    var parser = new DOMParser();
    var alertDOMElement = parser.parseFromString(firstXMLString, "application/xml");
    alertDOMElement.addEventListener("select", showSecondXML, false);
    navigationDocument.presentModal(alertDOMElement);
}


function pushFirstXML() {
    
    function pushSecondXML() {
        var parser = new DOMParser();
        var alertDOMElement = parser.parseFromString(secondXMLString, "application/xml");
        alertDOMElement.addEventListener("select", function(){navigationDocument.popDocument();}, false);
        navigationDocument.pushDocument(alertDOMElement);
    }
    
    var parser = new DOMParser();
    var alertDOMElement = parser.parseFromString(firstXMLString, "application/xml");
    alertDOMElement.addEventListener("select", pushSecondXML, false);
    navigationDocument.pushDocument(alertDOMElement);
}

