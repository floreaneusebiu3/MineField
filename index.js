const Websocket = require('ws')

//create a new websocket server

const wss = new Websocket.Server({port:8080})
var assump = []
    assump.push("all x -mine(x, 0).\n",
               "all x -mine(4,x).\n",
               "mine(3,2).\n",
               "mine(4,4) | mine(1,4).\n",
               "-mine(5,7) & -mine(6,7) & -mine(7,7).\n",
               "all x -mine(7, x).\n",
               "mine(6,5) & -(mine(6,6)).\n",
               "mine(1,1).\n"
               )
var formulas = assump[0]    
var minesCoord = []
minesCoord.push( {x:1, y:1} , {x:1, y:4}, {x:3,y:2} , {x:6,y:5} )         
wss.on('connection', (ws) => {
    console.log('A new client is connected')
ws.send("hi client, I am server") 
ws.on('message', (data) => {
    var coordo = data.toString().split(',');
    var xCoordo = coordo[0];
    var yCoordo = coordo[1];
    console.log(xCoordo);
    console.log(yCoordo);
    const fs = require('fs')    
     if(xCoordo == 7 && yCoordo == 0 && formulas.includes(assump[1]) == false)
          formulas+=assump[1]
     if(xCoordo == 4 && yCoordo == 3 && formulas.includes(assump[2]) == false)
          formulas+=assump[2]
     if(xCoordo == 4 && yCoordo == 6 && formulas.includes(assump[3]) == false)
           formulas+=assump[3]
     if(xCoordo == 4 && yCoordo == 7 && formulas.includes(assump[4]) == false)
           formulas+=assump[4]
     if(xCoordo == 6 && yCoordo == 7 && formulas.includes(assump[5]) == false)
           formulas+=assump[5]
     if(xCoordo == 7 && yCoordo == 1 && formulas.includes(assump[6]) == false)
           formulas+=assump[6]
     if(xCoordo == 6 && yCoordo == 6 && formulas.includes(assump[7]) == false)
           formulas+=assump[7]                                  
     
    var content ="formulas(assumptions).\n" + formulas + "end_of_list.\n\n" + 
                 "formulas(goals).\n"+ "-mine("+xCoordo+ "," +yCoordo+").\n"+ "end_of_list.";
    try {
      const data = fs.writeFileSync('file.in', content)
      //file written successfully
    } catch (err) {
      console.error(err);
    }
    
        var exec = require('child_process').exec;
exec('prover9 -f file.in',
    function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);

        var result = stdout.toString();
        if(result.includes("THEOREM PROVED") && formulas.length <165) {
             console.log("ok");
             ws.send("ok");
           } else if(result.includes("THEOREM PROVED") == false && formulas.length <165){
             console.log("notok");
             ws.send("notok");
             }
             else if(formulas.length >=165 && (minesCoord.some(item => item.x != parseInt(xCoordo) && item.y != parseInt(yCoordo)) == false)) {
                  console.log(minesCoord.some(item => item.x === parseInt(xCoordo) && item.y === parseInt(yCoordo)));
                  console.log({x:parseInt(xCoordo), y:parseInt(yCoordo)})
                  console.log(typeof parseInt(xCoordo))
                  console.log(typeof minesCoord[0].x)
                  ws.send("ok");  
             }
             else if(formulas.length >=165 && (minesCoord.some(item => item.x != parseInt(xCoordo) && item.y != parseInt(yCoordo)) == true)) {
                 console.log("bomb");
                 ws.send('bomb'); 
            }
                
    });
    
})   
})
