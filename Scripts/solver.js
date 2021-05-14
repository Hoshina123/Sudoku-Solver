'use strict';

//show message on the web page
function showMessage(title,message,type="info"){
    var msgTitle = document.getElementById("msg_title");
    msgTitle.innerText = title;
    var msg = document.getElementById("msg");
    msg.innerText = message;
    var msgIcon = document.getElementById("msg_icon");
    var clear = document.getElementById("solveClear");
    if (type == "error"){
        msgIcon.style.backgroundImage = "url(msgIcons/error.svg)";
        clear.style.display = 'none';
    }else if (type == "info"){
        msgIcon.style.backgroundImage = "url(msgIcons/info.svg)";
        clear.style.display = 'none';
    }else if (type == "solved"){
        msgIcon.style.backgroundImage = "url(msgIcons/solved.svg)";
        clear.style.display = 'inline';
    }
    var panel = document.getElementById("popWindow");
    panel.style.display = "inline";
}

//determine is the sudoku has been tried to solve
function isSame(grid81){
    var labels = document.getElementById("history_show").getElementsByTagName("label");
    var splitList = [];

    //this is the first sudoku
    if (labels.length <= 81){
        return false
    }

    //read all histories
    var currentList = [];
    for (var i=0;i<labels.length;i++){
        currentList[i] = labels[i].innerText;
        if (currentList.length == 81){
            splitList[Math.floor(i/81)] = currentList;
        }
    }
    
    var boolList = [];
    for (var i=0;i<splitList.length;i++){
        var current = splitList[i];
        boolList = [];
        for (var j=0;j<81;j++){
            if (grid81[j] == current[j]){
                boolList[j] = true;
            }else{
                boolList[j] = false;
            }
        }
        if (boolList.every(function (x){return x})){
            return true
        }
    }
    return false
}

//solve the puzzle from the web page
function solve(addHistory){
    var start = performance.now();

    //clone sudoku to the small table
    var tableCopy = readTopic();
    var numLabels = document.getElementById("sudokuClone").getElementsByClassName("copy_data");
    for (var i=0;i<81;i++){
        var index = tableCopy[Math.floor(i/9)][i%9];
        if (index == 0){
            tableCopy[Math.floor(i/9)][i%9] = "";
        }
        numLabels[i].innerText = tableCopy[Math.floor(i/9)][i%9];
    }

    var bool = checkInput();
    if(bool){
        var grid = readTopic();
        if(!isValidGrid(grid)){
            showMessage("Sudoku Solver","Error:Invalid grid","error");
        }else{
            if(search(grid)){
                var stop = performance.now();
                var time = stop-start;
                showOutput(time,addHistory);
            }else{
                showMessage("Sudoku Solver","Error:No solution","error");
            }
        }
    }

    //hide the load window
    var loading = document.getElementById("load");
    loading.style.display = 'none';

    if (addHistory){
        //add history
        var table = document.getElementById("sudokuClone");
        var historyPage = document.getElementById("history_show");
        var cloneId = "sudoku-"+start;
        var tableClone = table.cloneNode(true);
        tableClone.setAttribute("id",cloneId);
        tableClone.style.display = "inline";
        historyPage.appendChild(tableClone);

        var nums = document.getElementById("sudokuClone").getElementsByTagName("label");
        var inGrid = [];
        for (var i=0;i<81;i++){
            inGrid[i] = nums[i].innerText;
        }
        if (isSame(inGrid)){
            historyPage.removeChild(tableClone);
        }
    }
}

//load solver program
function load(addHistory=true){
    var loadWindow = document.getElementById("load");
    loadWindow.style.display = 'inline';

    if (addHistory){
        setTimeout("solve(true)",10);
    }else{
        setTimeout("solve(false)",20);
    }
}

//check input (web page)
function checkInput(){
    var arr = new Array();
    
    for(var i=0; i<81; i++){
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
        if(isNaN(arr[i])){
            showMessage("Sudoku Solver","Error:Input should be any number between 1 and 9","error");
            return false
        }
    }
    
    if(arr.every(function isZero(x){return x == 0})){
        showMessage("Sudoku Solver","Error:Wrong Input","error");
        return false
    }
    
    return true
}

//read topic (web page)
function readTopic(){
    var arr = new Array();
    
    for(var i=0; i<81; i++){
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
    }
    
    var grid = new Array();
    for(var i=0; i<9; i++){
        grid[i] = new Array();
        for(var j=0; j<9; j++){
            grid[i][j] = 0;
        }    
    }
    
    
    for(var i=0; i<81; i++){
        grid[Math.floor(i/9)][i%9] = arr[i];
    }
    
    return grid
}

//get free cells
function getCellList(grid){
    var freeCellList = new Array();
    var index = 0
    
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if(grid[i][j] == 0){
                freeCellList[index] = new Array(i,j);
                index++;
            }
        }
    }
                
    return freeCellList
}

//valid sudoku determine
function isValid(i,j,grid){
    for(var column=0; column<9; column++){
        if((column != j) && (grid[i][column] == grid[i][j])){
            return false
        }
    }
         
    for(var row=0; row<9; row++){
        if((row != i) && (grid[row][j] == grid[i][j])){
            return false
        }
    }
 
    for(var row=Math.floor(i/3)*3; row < Math.floor(i/3)*3+3; row++){
        for(var col=Math.floor(j/3)*3; col < Math.floor(j/3)*3+3; col++){
            if((row != i) && (col != j) && (grid[row][col] == grid[i][j])){
                return false
            }
        }
    }
             
    return true
}

//determine valid grid
function isValidGrid(grid){
    for(var i=0; i<9; i++){
        for(var j=0; j<9; j++){
            if((grid[i][j] < 0) || (grid[i][j] > 9) || ((grid[i][j] != 0) && (! isValid(i,j,grid)))){
                return false
            }
        }
    }
    return true
}


function search(grid){
    var freeCellList = getCellList(grid);
    var numberOfFreeCells = freeCellList.length;
    if(numberOfFreeCells == 0){
        return true
    }
    
    var k = 0;
 
    while(true){
        var i = freeCellList[k][0];
        var j = freeCellList[k][1];
        if(grid[i][j] == 0){
            grid[i][j] = 1;
        }
 
        if(isValid(i,j,grid)){
            if(k+1 == numberOfFreeCells){
                return true
            }else{
                k++;
            }
        }else{
            if(grid[i][j] < 9){
                grid[i][j]++;
            }else{
                while(grid[i][j] == 9){
                    if(k == 0){
                        return false
                    }
                    grid[i][j] = 0;
                    k--;
                    i = freeCellList[k][0];
                    j = freeCellList[k][1];
 
                } 

                grid[i][j]++;
            }
        }
    }
 
    return true
}

//show the output
function showOutput(time_used,showPopup=true){
    var grid = readTopic();
    var grid_original = readTopic();
    
    if(search(grid)){
        for(var i=0; i<81; i++){
            if(grid[Math.floor(i/9)][i%9] != grid_original[Math.floor(i/9)][i%9]){
                document.getElementsByTagName("input")[i].value = grid[Math.floor(i/9)][i%9];
                document.getElementsByTagName("input")[i].style.color = '#000000';
            }
        }
    }

    var formatTime = Math.round(time_used*1000)/1000;
    var msg = "Execution time: "+formatTime+"ms";
    if (showPopup){
        showMessage("Puzzle solved",msg,"solved");
    }
}
