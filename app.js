var scoreValue = 0
var honestValue = true
const websocket = new WebSocket("ws://localhost:8080")
var en = true

$(document).ready(function(){
        var xCount = 0;
        var yCount = 0;
   
        $(".cell").each( function(){   
        $(this).attr("xCoord", xCount);   
        $(this).attr("yCoord", yCount);
        $(this).attr("visited", "false")
        if(yCount == 0 && xCount == 0){
          $(this).css("background-color", "rgb(6, 104, 87)");
          $(this).attr("visited", "true")
        }
        
        if(yCount == 7) {
           yCount=0;
           xCount+=1;
        }   
        else
        {yCount+=1};
        showInstruction();
        showImages();

   });

   //here reset all grid
   document.getElementById("rst").addEventListener('click', function(event){
    websocket.send('reset')
    scoreValue = 0;
    score.innerHTML = "score: " + scoreValue
    honestValue = true
    honest.innerHTML = "honest"
    instr = document.getElementById('ins')
    instr.style.background = "rgb(227, 250, 246 )"
    instr.innerHTML = "all x -mine(x, 0)."
    en = true
    $(".cell").each(function(){
        $(this).attr("visited", "false")
        var xCellPosition = parseInt( $(this).attr("xCoord"));
        var yCellPosition = parseInt( $(this).attr("yCoord")); 
        if(xCellPosition == 0 && yCellPosition == 0)
        $(this).attr("visited", "false")
        xPosition = 0;
        yPosition = 0;
        hideInstructions();
        if(xCellPosition == 0 && yCellPosition == 0)
           $(this).css("background-color","rgb(6, 104, 87)"); 
        else
           $(this).css("background-color", "rgb( 137, 163, 159)");   
    });
});

    });
    websocket.addEventListener('open', () => {
        console.log('we are connected')
    })
    websocket.addEventListener('message', ({data}) => {
        var score = document.getElementById("score")
        var honest = document.getElementById('honest')
        var cells = document.getElementsByClassName("cell")
        var gameStatus = document.getElementById("ins")
        
        if(data.toString() === "ok") {
            for(const element of cells) {
                if( parseInt($(element).attr('xCoord')) === xPosition &&
                    parseInt($(element).attr('yCoord')) === yPosition &&
                    String($(element).attr('visited')) === "false" ) {
                        scoreValue+=1
                        $(element).attr('visited', "true")
                    }
            }
      }
       if(scoreValue == 59)
         {
            $(".cell").css('background', "green")
            gameStatus.innerHTML = "WINNER"
            gameStatus.style.background = "green"
            showMines();
            en = false
         }       
        if(data.toString() === "notok")
           honestValue = false   
        score.innerHTML = "score: " + scoreValue
        if(honestValue === true)
             honest.innerHTML = "honest"
        else
             honest.innerHTML = "cheater"    
        if(data.toString() === "bomb") {
            $(".cell").css('background', 'rgb(256, 0, 0)')
            gameStatus.innerHTML = "GAME OVER"
            gameStatus.style.background = "red"
            en =false
        }
                  
     })
//scrolling by arrow keys disabled
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);       

window.addEventListener('load', () => {
    xPosition = 0;
    yPosition = 0;
});
window.addEventListener('keyup', (e) => {
      if(en == true) {
       switch(e.key) {
        case 'ArrowDown':     
            if(xPosition <7)       
            xPosition+=1; 
            $(".cell").each( function(){ 
            var xCellPosition = parseInt( $(this).attr("xCoord"));
            var yCellPosition = parseInt( $(this).attr("yCoord")); 
            if(xPosition-1 == xCellPosition && yPosition == yCellPosition) {
                $(this).css("background-color", "rgb(121, 204, 166)"); 
            }   
            if(xPosition == xCellPosition && yPosition == yCellPosition) {
                $(this).css("background-color", "rgb(6, 104, 87)"); 
            }   
            });
            break;
            case 'ArrowUp': 
            if(xPosition>0)           
            xPosition-=1; 
            $(".cell").each( function(){ 
            var xCellPosition = parseInt( $(this).attr("xCoord"));
            var yCellPosition = parseInt( $(this).attr("yCoord"));
            if(xPosition+1 == xCellPosition && yPosition == yCellPosition) {
                $(this).css("background-color", "rgb(121, 204, 166)"); 
            }   
            if(xPosition == xCellPosition && yPosition == yCellPosition) {
                $(this).css("background-color", "rgb(6, 104, 87)"); 
            }   
            });
            break;      
            case 'ArrowRight':
            if(yPosition <7)                
            yPosition+=1; 
            $(".cell").each( function(){ 
            var xCellPosition = parseInt( $(this).attr("xCoord"));
            var yCellPosition = parseInt( $(this).attr("yCoord"));
            if(xPosition == xCellPosition && yPosition-1 == yCellPosition) {
                $(this).css("background-color", "rgb(121, 204, 166)"); 
            }   
            if(xPosition == xCellPosition && yPosition == yCellPosition) {
                $(this).css("background-color", "rgb(6, 104, 87)"); 
            }   
            });
            break;
            case 'ArrowLeft': 
            if(yPosition > 0)           
            yPosition-=1; 
            $(".cell").each( function(){ 
            var xCellPosition = parseInt( $(this).attr("xCoord"));
            var yCellPosition = parseInt( $(this).attr("yCoord"));
            if(xPosition == xCellPosition && yPosition+1 == yCellPosition) {
                $(this).css("background-color", "rgb(121, 204, 166)"); 
            }   
            if(xPosition == xCellPosition && yPosition == yCellPosition) {
                $(this).css("background-color", "rgb(6, 104, 87)"); 
            }      
            });
            break;                              
       }
       showImages();
       showInstruction();
       var coord1 = new String(xPosition)
        var coord2 = new String(yPosition)
        var coord = coord1.concat(",").concat(coord2)
        websocket.send(coord)    
    }
    
});

function showImages(){
    var elem = document.getElementById("bomb1");
    if(xPosition == 1 && yPosition == 1) 
      elem.style.visibility = "visible";
    var elem = document.getElementById("bomb2");
      if(xPosition == 1 && yPosition == 4) 
        elem.style.visibility = "visible";
    var elem = document.getElementById("bomb3");
      if(xPosition == 3 && yPosition == 2) 
        elem.style.visibility = "visible";
    var elem = document.getElementById("bomb4");
      if(xPosition == 6 && yPosition == 5) 
        elem.style.visibility = "visible";        
    


    elem = document.getElementById("file1");
    if(xPosition == 0 && yPosition == 0) 
       elem.style.visibility = "visible"
    elem = document.getElementById("file2");
       if(xPosition == 7 && yPosition == 0) 
          elem.style.visibility = "visible"
    elem = document.getElementById("file3");
        if(xPosition == 4 && yPosition == 3) 
             elem.style.visibility = "visible"         

    elem = document.getElementById("file4");
             if(xPosition == 4 && yPosition == 6) 
                  elem.style.visibility = "visible"
    elem = document.getElementById("file5")
             if(xPosition == 4 && yPosition == 7) 
                  elem.style.visibility = "visible"
    elem = document.getElementById("file6")
             if(xPosition == 6 && yPosition == 7)
                 elem.style.visibility = "visible"   
    elem = document.getElementById("file7");
            if(xPosition == 7 && yPosition == 1) 
                 elem.style.visibility = "visible"
    elem = document.getElementById("file8")
            if(xPosition == 6 && yPosition == 6) 
                 elem.style.visibility = "visible"                         
            }

function hideImages(){
    var elem = document.getElementById("bomb1");
      elem.style.visibility = "hidden";
    elem = document.getElementById("file1"); 
       elem.style.visibility = "hidden"
}
function showMines(){
      var elem = document.getElementById("bomb1");
      elem.style.visibility = "visible";
      var elem = document.getElementById("bomb2");
      elem.style.visibility = "visible";
      var elem = document.getElementById("bomb3");
      elem.style.visibility = "visible";
      var elem = document.getElementById("bomb4");
      elem.style.visibility = "visible";  

}
function hideMines(){
    var elem = document.getElementById("bomb1");
    elem.style.visibility = "hidden";
    var elem = document.getElementById("bomb2");
    elem.style.visibility = "hidden";
    var elem = document.getElementById("bomb3");
    elem.style.visibility = "hidden";
    var elem = document.getElementById("bomb4");
    elem.style.visibility = "hidden";  
}
function hideInstructions(){
    var elements = document.getElementsByClassName('cellImg')
    for(const elem of elements) {
        elem.style.visibility = "hidden"
    }
}
function showInstruction() {
    var instr = document.getElementById("ins");
    if(xPosition == 0 && yPosition == 0)
        {instr.innerHTML = "all x -mine(x, 0)."
        return}
    else 
        instr.innerHTML = ""
    
    if(xPosition == 7 && yPosition == 0)
        {instr.innerHTML = "all x -mine(4,x)."
        return}
    else 
        instr.innerHTML = ""

    if(xPosition == 4 && yPosition == 3)
        {instr.innerHTML = "mine(3,2)."
        return}
    else 
        instr.innerHTML = ""

    if(xPosition == 4 && yPosition == 6)
        {instr.innerHTML = "mine(4,4) | mine(1,4)."
        return}
    else 
        instr.innerHTML = ""  
    
    if(xPosition == 4 && yPosition == 7)
        {instr.innerHTML = "-mine(5,7)&-mine(6,7)&-mine(7,7)."
        return}
    else 
        instr.innerHTML = ""
    
    if(xPosition == 6 && yPosition == 7)
        {instr.innerHTML = "all x -mine(7, x)."
        return}
    else 
        instr.innerHTML = ""

    if(xPosition == 7 && yPosition == 1)
        {instr.innerHTML = "mine(6,5) & -(mine(6,6))."
        return}
    else 
        instr.innerHTML = ""

    if(xPosition == 6 && yPosition == 6)
        {instr.innerHTML = "mine(1,1)."
        return}
    else 
        instr.innerHTML = ""                           
}


