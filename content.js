const recognition = new webkitSpeechRecognition();
recognition.lang = 'ja-JP';

recognition.onresult = function(event) {
    const recognizedText = event.results[0][0].transcript;
    chrome.runtime.sendMessage({type: "recognitionResult", data: recognizedText});
};

recognition.onerror = function(event) {
    chrome.runtime.sendMessage({type: "recognitionError", data: event.error});
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action === "startRecognition") {
        recognition.start();
    }
});
