//clear input
function clearGrid(){
    for (var n=0;n<81;n++){
        document.body.getElementsByTagName("input")[n].value = '';
        document.body.getElementsByTagName("input")[n].style.color = '#0000ff';
    }
    showMessage("Sudoku Solver","Info: Input cleared");
}

//set background image (in web page)
function setBackground(imagePath){
    var preview = document.getElementById("currentBackground");
    preview.src = imagePath;
    var docBody = document.body;
    docBody.style.backgroundImage = "url("+imagePath+")";
}
//set background image (in computer)
function setLocalBackground(){
    var file = document.getElementById("uploadimg").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(reader){
        var image = reader.target.result;
        document.getElementById("currentBackground").src = image;
        var baseImg = image.split(",")[1];
        var docBody = document.body;
        docBody.style.backgroundImage = "url(data:image/png;base64,"+baseImg+")";
    }
}

//set color fill (setup page)
function setFillSetup(){
    var setupOp = document.getElementById("opSlide_setup");
    var setupVal = document.getElementById("opShow_setup");
    var setupPage = document.getElementById("setupWindow");
    var op = setupOp.value;
    var opStr = op+"% 100%";
    setupVal.innerText = op+"%";
    setupOp.style.backgroundSize = opStr;
    setupPage.style.background = "rgba(128,128,128,"+(op/100)+")";
}
//set color fill (popup window)
function setFillPopup(){
    var popupOp = document.getElementById("opSlide_popup");
    var popupVal = document.getElementById("opShow_popup");
    var popupWindow = document.getElementById("popWindow");
    var op = popupOp.value;
    var opStr = op+"% 100%";
    popupVal.innerText = op+"%";
    popupOp.style.backgroundSize = opStr;
    popupWindow.style.background = "rgba(255,255,255,"+(op/100)+")";
}
//set color fill (history)
function setFillHistory(){
    var historyOp = document.getElementById("opSlide_history");
    var historyVal = document.getElementById("opShow_history");
    var historyWindow = document.getElementById("historyWindow");
    var op = historyOp.value;
    var opStr = op+"% 100%";
    historyVal.innerText = op+"%";
    historyOp.style.backgroundSize = opStr;
    historyWindow.style.background = "rgba(128,128,128,"+(op/100)+")";
}

//read topic (history page)
function readHistoryTopic(topicId){
    var historyLabels = document.getElementById(topicId).getElementsByTagName("label");
    for (var i=0;i<81;i++){
        var currentLabel = historyLabels[i];
        var currentInput = document.getElementById(i+1);
        currentInput.value = currentLabel.innerText;
    }
}
