$(document).ready(function(){
        var xCount = 0;
        var yCount = 0;
   
        $(".cell").each( function(){   
        $(this).attr("xCoord", xCount);   
        $(this).attr("yCoord", yCount);
        if(yCount == 0 && xCount == 0)
        $(this).css("background-color", "rgb(6, 104, 87)");
        if(yCount == 7) {
           yCount=0;
           xCount+=1;
        }   
        else
        {yCount+=1};
   });

    });

//scrolling by arrow keys disabled
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);       

window.addEventListener('load', () => {
    xPosition = 0;
    yPosition = 0;
    $(cell).each(function(){
        if( parseInt( $(this).attr("xCoord")) == 0 && parseInt( $(this).attr("yCoord")) == 0)
             $(this).css("background-color", "rgb(6, 104, 87)");   
    })
});
window.addEventListener('keyup', (e) => {
    var instr = document.getElementById("ins"); 
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
            
            instr.innerHTML = "down pressed";
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
            instr.innerHTML = "up pressed";
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
            instr.innerHTML = "right pressed";
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
            instr.innerHTML = "left pressed";
            break;                              
       }
       var elem = document.getElementById("bomb1");
       if(yPosition == 1 && xPosition == 0) 
         elem.style.visibility = "visible";
       elem = document.getElementById("file1");
       if(yPosition == 5 && xPosition == 3) 
          elem.style.visibility = "visible"

});   

