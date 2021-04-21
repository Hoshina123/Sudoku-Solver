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
    console.log(file);
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
