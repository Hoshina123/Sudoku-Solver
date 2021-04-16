//clear input
function clearGrid(){
    for (var n=0;n<81;n++){
        document.body.getElementsByTagName("input")[n].value = '';
        document.body.getElementsByTagName("input")[n].style.color = '#0000ff';
    }
    showMessage("Sudoku Solver","Info: Input cleared");
}

//set background image
function setBackground(imagePath){
    var preview = document.getElementById("currentBackground");
    preview.src = imagePath;
    var docBody = document.body;
    docBody.style.backgroundImage = "url("+imagePath+")";
}