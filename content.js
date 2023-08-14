const recognition = new webkitSpeechRecognition();
recognition.lang = 'ja-JP';
recognition.continuous = true;  // 让识别器持续运行

recognition.onresult = function(event) {
    for(let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            const recognizedText = event.results[i][0].transcript;
            chrome.runtime.sendMessage({type: "recognitionResult", data: recognizedText});
        }
    }
};

recognition.onerror = function(event) {
    chrome.runtime.sendMessage({type: "recognitionError", data: event.error});
};

recognition.onend = function() {
    if (shouldRestart) recognition.start();  // 在识别结束后立刻重启
};

let shouldRestart = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action === "startRecognition") {
        shouldRestart = true;
        recognition.start();
    } else if(request.action === "stopRecognition") {
        shouldRestart = false;
        recognition.stop();
    }
});
