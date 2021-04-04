function clearGrid(){
    for (var n=0;n<81;n++){
        document.body.getElementsByTagName("input")[n].value = '';
        document.body.getElementsByTagName("input")[n].style.color = '#0000ff';
    }
}