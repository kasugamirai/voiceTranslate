document.getElementById("recordBtn").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {action: "startRecognition"});
    });
});

chrome.runtime.onMessage.addEventListener(function(request, sender, sendResponse) {
    if(request.type === "recognitionResult") {
        document.getElementById("recognizedText").innerText = request.data;
    } else if(request.type === "recognitionError") {
        document.getElementById("recognizedText").innerText = 'Error occurred in recognition: ' + request.data;
    }
});
