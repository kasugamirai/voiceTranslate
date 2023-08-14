let isRecording = false;

document.getElementById("recordBtn").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0];
        isRecording = !isRecording;  // 切换录音状态
        const action = isRecording ? "startRecognition" : "stopRecognition";
        chrome.tabs.sendMessage(activeTab.id, {action: action});

        // 更新按钮文本
        document.getElementById("recordBtn").textContent = isRecording ? 'Stop Recording' : 'Record Voice';
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type === "recognitionResult") {
        document.getElementById("recognizedText").innerText = request.data;
    } else if(request.type === "recognitionError") {
        document.getElementById("recognizedText").innerText = 'Error occurred in recognition: ' + request.data;
    }
});
