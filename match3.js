window.addEventListener('load', function(){
    const canvas=document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width=500
    canvas.height=400
    t=Date.now()
    var row=[]
    var empty=[]
    var board=[]
    for(let j=0;j<8;j++){
        row=[]
    for(let i=0;i<8;i++){
        row.push([Math.floor(6*Math.random()),0,false,false]) 
        }
    board.push(row)
    }
    class background{

    }
    class powerup{
        constructor(game){
            this.game=game
            this.xVer=0
            this.yVer=100
            this.xHor=0
            this.yHor=150
            this.xBomb=0
            this.yBomb=200
            this.xCBomb=0
            this.yCBomb=250
            this.activate=true
            this.type=0
            this.imgVer=document.getElementById('blueVer')
            this.imgHor=document.getElementById('blueHor')
            this.imgBomb=document.getElementById('blueBomb')
            this.imgColorBomb=document.getElementById('colorBomb')
        }
        update(){
        
        }
        draw(context){
            if(this.type==1){
                context.strokeStyle = "green";
                context.strokeRect(this.xVer-7,this.yVer-7,this.game.candy.size*1.25,this.game.candy.size*1.25)
            }
            if(this.type==2){
                context.strokeStyle = "green";
                context.strokeRect(this.xHor-7,this.yHor-7,this.game.candy.size*1.25,this.game.candy.size*1.25)
            }
            if(this.type==3){
                context.strokeStyle = "green";
                context.strokeRect(this.xBomb-7,this.yBomb-7,this.game.candy.size*1.25,this.game.candy.size*1.25)
            }
            if(this.type==4){
                context.strokeStyle = "green";
                context.strokeRect(this.xCBomb-7,this.yCBomb-7,this.game.candy.size*1.25,this.game.candy.size*1.25)
            }
            context.drawImage(this.imgVer,this.xVer,this.yVer,this.game.candy.size,this.game.candy.size)
            context.drawImage(this.imgHor,this.xHor,this.yHor,this.game.candy.size,this.game.candy.size)
            context.drawImage(this.imgBomb,this.xBomb,this.yBomb,this.game.candy.size,this.game.candy.size)
            context.drawImage(this.imgColorBomb,this.xCBomb,this.yCBomb,this.game.candy.size,this.game.candy.size)
        }
    }
    class select{
        constructor(game){
            this.game=game
            this.axisX=0
            this.axisY=0
            this.mouseX=0
            this.mouseY=0
        }
        update(){
            document.addEventListener('mousemove',(e)=>{
                this.mouseX=e.offsetX
                this.mouseY=e.offsetY
            })
        }
        draw(context){
            this.axisX=(this.mouseX-8)%50
            this.axisY=(this.mouseY-8)%50
            context.lineWidth="2"
            context.strokeStyle = "black";
            context.strokeRect(this.mouseX-this.axisX-13,this.mouseY-this.axisY-13,50,50)
            if(this.game.candy.choice1!==empty.toString()){
            context.strokeStyle = "red";
            context.strokeRect(this.game.candy.choice1[0]*50+96,this.game.candy.choice1[1]*50-4,50,50)
            }
        }
    }
    class candy{
        constructor(game){
            this.game=game
            this.turns=10
            this.size=40
            this.choice1=[]
            this.choice2=[]
            this.choice3=[]
            this.a=0
            this.ti=Date.now()
            this.position=board
            this.combo=false
            this.bomb=true
            this.color=7
            this.img1=document.getElementById('red')
            this.img2=document.getElementById('orange')
            this.img3=document.getElementById('yellow')
            this.img4=document.getElementById('green')
            this.img5=document.getElementById('blue')
            this.img6=document.getElementById('purple')
            this.img7=document.getElementById('redVer')
            this.img8=document.getElementById('orangeVer')
            this.img9=document.getElementById('yellowVer')
            this.img10=document.getElementById('greenVer')
            this.img11=document.getElementById('blueVer')
            this.img12=document.getElementById('purpleVer')
            this.img13=document.getElementById('redHor')
            this.img14=document.getElementById('orangeHor')
            this.img15=document.getElementById('yellowHor')
            this.img16=document.getElementById('greenHor')
            this.img17=document.getElementById('blueHor')
            this.img18=document.getElementById('purpleHor')
            this.img19=document.getElementById('redBomb')
            this.img20=document.getElementById('orangeBomb')
            this.img21=document.getElementById('yellowBomb')
            this.img22=document.getElementById('greenBomb')
            this.img23=document.getElementById('blueBomb')
            this.img24=document.getElementById('purpleBomb')
            this.img25=document.getElementById('colorBomb')

        }
        update(){
        function check(position){
            for(let i=0;i<position.length;i++){
                for(let j=0;j<position.length;j++){
                if(i<position.length-2){
                if(position[i][j][0]==position[i+1][j][0]&&position[i+2][j][0]==position[i][j][0]&&position[i][j][0]!==7){
                    return false
                    break
                }
                }
                if(j<position.length-2){
                if(position[i][j][0]==position[i][j+1][0]&&position[i][j][0]==position[i][j+2][0]&&position[i][j][0]!==7){
                    return false
                    break
                }
            }
            }
        } 
        return true  
        }
        function done(position){
            for(let i=0;i<position.length;i++){
                for(let j=0;j<position.length;j++){
                    if(position[i][j][2]){
                        return true
                    }
                }
            }
            return false
        }
         function fall(position){
            for(let i=0;i<position.length;i++){
                for(let j=0;j<position.length;j++){
                    if(position[i][j][0]==7){
                        return false
                    }
                }
            }
            return true
        }
        function rowClear(row,position){
            for(let i=0;i<position.length;i++){
                position[row][i][2]=true
            }
            return position
        }
        function columnClear(column,position){
            for(let x=0;x<position.length;x++){
                position[x][column][2]=true
            }
            return position
        }
        function explosion(x,y,position){
            for(let a=0; a<3;a++){
                for(let b=0; b<3;b++){
                if(x-1+b>-1 && position.length>x-1+b){
                if(y-1+a>-1 && position.length>y-1+a){
                    position[y-1+a][x-1+b][2]=true
                }
                }
                }
            }
            return position
        }
        function Colorexplosion(color,position){
            for(let a=0;a<position.length;a++){
                for(let b=0;b<position.length;b++){
                    if(position[a][b][0]==color){
                        position[a][b][2]=true
                    }

            }
            }
            return position
        }
        function ComboColorexplosion(color,position,combo){
            for(let a=0;a<position.length;a++){
                for(let b=0;b<position.length;b++){
                    if(position[a][b][0]==color){
                            if(combo==1){
                                position[a][b][1]=1+Math.floor((2*Math.random()));
                            }
                            if(combo==2){
                                position[a][b][1]=1+Math.floor((2*Math.random()));
                            }
                            if(combo==3){
                                position[a][b][1]=3
                            }
                        position[a][b][2]=true
                    }

            }
            }
            return position
        }
        function clear(position){
            for(let a=0;a<position.length;a++){
                for(let b=0;b<position.length;b++){
                        position[a][b][2]=true
                    }

            }
            return position
        }

        if(fall(this.position)&&(Date.now()>this.ti+2000)){
        for(let i=0;i<this.position.length;i++){
            for(let j=0;j<this.position.length;j++){
            this.bomb=true
            if(i<this.position.length-2){
            if(this.position[i][j][0]==this.position[i+1][j][0]&&this.position[i+2][j][0]==this.position[i][j][0]&&this.position[i][j][2]==false&&this.position[i+1][j][2]==false&&this.position[i+2][j][2]==false&&this.position[i][j][0]!==7){
                if(i<this.position.length-4){
                if(this.position[i][j][0]==this.position[i+3][j][0] && this.position[i][j][0]==this.position[i+4][j][0] && this.position[i+3][j][2]==false&&this.position[i+4][j][2]==false){
                    switch(this.position[i+2][j][1]){
                        case 1:
                            this.position=columnClear(j,this.position)
                        case 2:
                            this.position=rowClear(i+2,this.position)
                        case 3:
                            this.position=explosion(j,i+2,this.position)
                        } 
                                this.position[i][j][2]=true
                                this.position[i+1][j][2]=true
                                this.position[i+3][j][2]=true
                                this.position[i+4][j][2]=true
                                this.position[i+2][j][1]=4
                                this.position[i+2][j][0]=6
                                this.position[i+2][j][2]=false
                                break;
                                
                }
            }
                if(j<this.position.length-2){
                    for(let k=0;k<3;k++){
                        if(this.position[i+k][j][0]==this.position[i+k][j+1][0]&&this.position[i+k][j+2][0]==this.position[i+k][j][0]&&this.position[i][j+k][2]==false&&this.position[i+1][j+k][2]==false&&this.position[i+2][j+k][2]==false&&this.position[i][j+k][0]!==7){
                            switch(this.position[i+k][j][1]){
                                case 1:
                                    this.position=columnClear(j,this.position)
                                case 2:
                                    this.position=rowClear(i+k,this.position)
                                case 3:
                                    this.position=explosion(j,i+k,this.position)

                            }
                            this.position[i+k][j][2]=true
                            this.position[i+k][j+1][2]=true
                            this.position[i+k][j+2][2]=true
                            this.position[i][j][2]=true
                            this.position[i+1][j][2]=true
                            this.position[i+2][j][2]=true
                            this.position[i+k][j][1]=3
                            this.position[i+k][j][2]=false
                            this.bomb=false
                            break
                        }
                    }
                }
                if(this.bomb){
                    if(j>1){
                        for(let k=0;k<3;k++){
                            if(this.position[i+k][j][0]==this.position[i+k][j-1][0]&&this.position[i+k][j-2][0]==this.position[i+k][j][0]&&this.position[i][j+k][2]==false&&this.position[i+1][j+k][2]==false&&this.position[i+2][j+k][2]==false&&this.position[i][j+k][0]!==7){
                                switch(this.position[i+k][j][1]){
                                    case 1:
                                        this.position=columnClear(j,this.position)
                                    case 2:
                                        this.position=rowClear(i+k,this.position)
                                    case 3:
                                        this.position=explosion(j,i+k,this.position)
    
                                }
                                this.position[i+k][j][2]=true
                                this.position[i+k][j-1][2]=true
                                this.position[i+k][j-2][2]=true
                                this.position[i][j][2]=true
                                this.position[i+1][j][2]=true
                                this.position[i+2][j][2]=true
                                this.position[i+k][j][1]=3
                                this.position[i+k][j][2]=false
                                this.bomb=false
                                break
                            }
                        }
                    }   
                }





                if(this.bomb){
                    if(j<this.position.length-1 && j>0){
                        for(let k=0;k<3;k++){
                            if(this.position[i+k][j-1][0]==this.position[i+k][j][0]&&this.position[i+k][j+1][0]==this.position[i+k][j-1][0]&&this.position[i][j+k][2]==false&&this.position[i+1][j+k][2]==false&&this.position[i+2][j+k][2]==false&&this.position[i][j+k][0]!==7){
                                switch(this.position[i+k][j][1]){
                                    case 1:
                                        this.position=columnClear(j,this.position)
                                    case 2:
                                        this.position=rowClear(i+k,this.position)
                                    case 3:
                                        this.position=explosion(j,i+k,this.position)
    
                                }
                                this.position[i+k][j-1][2]=true
                                this.position[i+k][j][2]=true
                                this.position[i+k][j+1][2]=true
                                this.position[i][j][2]=true
                                this.position[i+1][j][2]=true
                                this.position[i+2][j][2]=true
                                this.position[i+k][j][1]=3
                                this.position[i+k][j][2]=false
                                this.bomb=false
                                break
                            }
                        }
                    }
                if(this.bomb){
                if(i<this.position.length-3){
                if(this.position[i][j][0]==this.position[i+3][j][0]){
                    switch(this.position[i+3][j][1]){
                        case 1:
                        this.position=columnClear(j,this.position)
                        
                        case 2:
                        if(this.position[i+3][j][1]==2){
                        this.position[i+3][j][1]=0
                        for(let k=0;k<this.position.length;k++){
                        this.position[i+3][k][2]=true
                        }
                    }
                        case 3:
                            this.position=explosion(j,i+3,this.position)
                            /** 
                            for(let a=0; a<3;a++){
                                for(let b=0; b<3;b++){
                                if(j-1+b>-1 && this.position.length>j-1+b){
                                if(i+2+a>-1 && this.position.length>i+2+a){
                                    this.position[i+2+a][j-1+b][2]=true
                }
            }
        }
    }
    */
}
                this.position[i][j][2]=true
                this.position[i+1][j][2]=true
                this.position[i+2][j][2]=true
                this.position[i+3][j][1]=2
                this.position[i+3][j][2]=false
                
            }
            else{
                this.position[i][j][2]=true
                this.position[i+1][j][2]=true
                this.position[i+2][j][2]=true 
            }
            }
            else{
                this.position[i][j][2]=true
                this.position[i+1][j][2]=true
                this.position[i+2][j][2]=true 
            }
            }
            }
        }
    }
            if(this.bomb){
            if(j<this.position.length-2){
            if(this.position[i][j][0]==this.position[i][j+1][0]&&this.position[i][j][0]==this.position[i][j+2][0]&&this.position[i][j][2]==false&&this.position[i][j+1][2]==false&&this.position[i][j+2][2]==false&&this.position[i][j][0]!==7){
                if(j<this.position.length-4){
                    if(this.position[i][j][0]==this.position[i][j+3][0] && this.position[i][j][0]==this.position[i][j+4][0] && this.position[i][j+3][2]==false&&this.position[i][j+4][2]==false){
                        switch(this.position[i][j+2][1]){
                            case 1:
                                this.position=columnClear(j+2,this.position)
                            case 2:
                                this.position=rowClear(i,this.position)
                            case 3:
                                this.position=explosion(j+2,i,this.position)
                            } 
                                    this.position[i][j][2]=true
                                    this.position[i][j+1][2]=true
                                    this.position[i][j+3][2]=true
                                    this.position[i][j+4][2]=true
                                    this.position[i][j+2][1]=4
                                    this.position[i][j+2][0]=6
                                    this.position[i][j+2][2]=false
                                    break;
                                    
                    }
                }
                if(i<this.position.length-2){
                    for(let k=0;k<3;k++){
                        if(this.position[i][j+k][0]==this.position[i+1][j+k][0]&&this.position[i+2][j+k][0]==this.position[i][j+k][0]&&this.position[i][j+k][2]==false&&this.position[i+1][j+k][2]==false&&this.position[i+2][j+k][2]==false&&this.position[i][j+k][0]!==7){
                            switch(this.position[i][j+k][1]){
                                case 1:
                                    this.position=columnClear(j+k,this.position)
                                case 2:
                                    this.position=rowClear(i,this.position)
                                case 3:
                                    this.position=explosion(j+k,i,this.position)

                            }
                            this.position[i][j+k][2]=true
                            this.position[i+1][j+k][2]=true
                            this.position[i+2][j+k][2]=true
                            this.position[i][j][2]=true
                            this.position[i][j+1][2]=true
                            this.position[i][j+2][2]=true
                            this.position[i][j+k][1]=3
                            this.position[i][j+k][2]=false
                            this.bomb=false
                            break
                        }
                    }
                }
                if(this.bomb){
                if(j<this.position.length-3){
                if(this.position[i][j][0]==this.position[i][j+3][0]){
                this.position[i][j][2]=true
                this.position[i][j+1][2]=true
                this.position[i][j+2][2]=true
                this.position[i][j+3][2]=true
                for(let k=0;k<4;k++){
                    if(this.position[i][j+k][3]){
                        switch(this.position[i][j+k][1]){
                            case 1:
                            this.position[i][j+k][1]=0
                            for(let m=0;m<this.position.length;m++){
                            this.position[m][j+k][2]=true
                            }
                            
                            case 2:
                            if(this.position[i][j+k][1]==2){
                            this.position[i][j+k][1]=0
                            for(let m=0;m<this.position.length;m++){
                            this.position[i][m][2]=true
                            }

                        }
                            case 3:
                                this.position=explosion(j+k,i,this.position)
                    }
                        this.position[i][j+k][2]=false
                        this.position[i][j+k][1]=1
                        break;
                    }
                }
                }
                else{
                this.position[i][j][2]=true
                this.position[i][j+1][2]=true
                this.position[i][j+2][2]=true
                }
            }
            else{
                this.position[i][j][2]=true
                this.position[i][j+1][2]=true
                this.position[i][j+2][2]=true 
            }
        }
        }
        }
    }
    }
}
        }
    for(let i=0;i<this.position.length;i++){
        for(let j=0;j<this.position.length;j++){
            this.position[i][j][3]=false;
        }
    }
    for(let i=0;i<this.position.length-1;i++){ 
        if(Date.now()>t+1000){
        for(let j=0;j<this.position.length;j++){
            if(this.position[this.position.length-1-i][this.position.length-1-j][0]== 7){
                this.position[this.position.length-1-i][this.position.length-1-j]=this.position[this.position.length-1-i-1][this.position.length-1-j]
                this.position[this.position.length-1-i-1][this.position.length-1-j]=[7,0,false,false]
                this.position[this.position.length-1-i][this.position.length-1-j][3]=true
            }
        }
        }
    }
    if(Date.now()>t+1000){
        t=Date.now()
    }
    for(let j=0;j<this.position.length;j++){
        if(this.position[0][j][0]==7){
            this.position[0][j]=[Math.floor(6*Math.random()),0,false,false]
            this.position[0][j][3]=true
        }
    }
    while(done(this.position) && Date.now()>this.ti+2000){
    for(let i=0;i<this.position.length;i++){
        for(let j=0;j<this.position.length;j++){
            if(this.position[i][j][2]){
                switch(this.position[i][j][1]){
                    case 1:
                    this.position[i][j][1]=0
                    for(let k=0;k<this.position.length;k++){
                    this.position[k][j][2]=true
                    }
                    
                    case 2:
                    if(this.position[i][j][1]==2){
                    this.position[i][j][1]=0
                    for(let k=0;k<this.position.length;k++){
                    this.position[i][k][2]=true
                    }
                }
                    case 3:
                    this.position=explosion(j,i,this.position)
                    this.position[i][j][1]=0
                    case 4:
                        this.position=Colorexplosion(6*Math.random(),this.position)
                    case 0:
                this.position[i][j][0]=7
                this.position[i][j][1]=0
                this.position[i][j][2]=false
            }
            }
            }
            }
            }
            if(Date.now()>this.ti+2000){
                this.ti= Date.now() 
            }
            this.combo=true
            document.addEventListener('mousedown',(e)=>{
                if(this.game.powerup.activate){
                if(this.game.select.mouseX>100){
                if(this.choice1.toString()==empty.toString()){
                this.choice1.push(Math.floor((this.game.select.mouseX-100)/50))
                this.choice1.push(Math.floor((this.game.select.mouseY)/50))
                }
                else{
                    this.choice2.push(Math.floor((this.game.select.mouseX-100)/50))
                    this.choice2.push(Math.floor((this.game.select.mouseY)/50)) 
                }
  
                    if(this.choice1.toString()==this.choice2.toString()){
                    this.choice1=[]
                    this.choice2=[]
                }
                if((Math.abs(this.choice1[0]-this.choice2[0])==1 && this.choice1[1]-this.choice2[1]==0)||(Math.abs(this.choice1[1]-this.choice2[1])==1 && this.choice1[0]-this.choice2[0]==0)){
                if(this.position[this.choice2[1]][this.choice2[0]][1]>0 && this.position[this.choice1[1]][this.choice1[0]][1]>0){
                    this.combo=false
                    if(this.position[this.choice2[1]][this.choice2[0]][1]<3 && this.position[this.choice1[1]][this.choice1[0]][1]<3){
                    if(this.choice1[0]==this.choice2[0]){
                        for(let i=0;i<this.position.length;i++){
                            this.position[this.choice2[1]][i][2]=true
                        }
                        for(let i=0;i<this.position.length;i++){
                            this.position[i][this.choice2[0]][2]=true
                        }
                    }
                    if(this.choice1[1]==this.choice2[1]){
                        for(let i=0;i<this.position.length;i++){
                            this.position[this.choice2[1]][i][2]=true
                        }
                        for(let i=0;i<this.position.length;i++){
                            this.position[i][this.choice2[0]][2]=true
                        }
                    }
                    }
                    else if((this.position[this.choice2[1]][this.choice2[0]][1]<3 && this.position[this.choice1[1]][this.choice1[0]][1]==3)||(this.position[this.choice2[1]][this.choice2[0]][1]==3 && this.position[this.choice1[1]][this.choice1[0]][1]<3)){
                        for(let i=0;i<3;i++){
                            this.position=columnClear(this.choice2[0]-1+i,this.position)
                            this.position=rowClear(this.choice2[1]-1+i,this.position)
                        }
                    }
                    else if(this.position[this.choice2[1]][this.choice2[0]][1]==3 && this.position[this.choice1[1]][this.choice1[0]][1]==3){
                        for(let a=0; a<5;a++){
                        for(let b=0; b<5;b++){
                            if(this.choice2[0]-2+b>-1 && this.position.length>this.choice2[0]-2+b){
                            if(this.choice2[1]-2+a>-1 && this.position.length>this.choice2[1]-2+a){
                            this.position[this.choice2[1]-2+a][this.choice2[0]-2+b][2]=true
                            }
                         }
                            }
                        }
                    }
                    if(this.position[this.choice2[1]][this.choice2[0]][1]==4 && this.position[this.choice1[1]][this.choice1[0]][1]<4){
                        this.position=ComboColorexplosion(this.position[this.choice1[1]][this.choice1[0]][0],this.position,this.position[this.choice1[1]][this.choice1[0]][1])
                        this.position[this.choice1[1]][this.choice1[0]][1]=0
                        this.position[this.choice1[1]][this.choice1[0]][0]=7
                        this.combo=false
                    }
                    if(this.position[this.choice1[1]][this.choice1[0]][1]==4 && this.position[this.choice2[1]][this.choice2[0]][1]<4){
                        this.position=ComboColorexplosion(this.position[this.choice2[1]][this.choice2[0]][0],this.position,this.position[this.choice2[1]][this.choice2[0]][1])
                        this.position[this.choice1[1]][this.choice1[0]][1]=0
                        this.position[this.choice1[1]][this.choice1[0]][0]=7
                        this.combo=false
                    }
                    if(this.position[this.choice1[1]][this.choice1[0]][1]==4 && this.position[this.choice2[1]][this.choice2[0]][1]==4){
                        this.position=clear(this.position)
                        this.position[this.choice1[1]][this.choice1[0]][1]=0
                        this.position[this.choice1[1]][this.choice1[0]][0]=7
                        this.position[this.choice2[1]][this.choice2[0]][1]=0
                        this.position[this.choice2[1]][this.choice2[0]][0]=7
                        this.combo=false
                    }
                    this.position[this.choice2[1]][this.choice2[0]][1]=0
                    this.position[this.choice1[1]][this.choice1[0]][1]=0
                }
    
                
                if(this.choice1.toString()!==empty.toString&&this.choice2.toString()!==empty.toString()){
                    this.a=this.position[this.choice1[1]][this.choice1[0]]
                    this.position[this.choice1[1]][this.choice1[0]]=this.position[this.choice2[1]][this.choice2[0]]
                    this.position[this.choice2[1]][this.choice2[0]]=this.a

                    if(this.position[this.choice2[1]][this.choice2[0]][1]==4){
                        this.position=Colorexplosion(this.position[this.choice1[1]][this.choice1[0]][0],this.position)
                        this.position[this.choice2[1]][this.choice2[0]][1]=0
                        this.position[this.choice2[1]][this.choice2[0]][0]=7
                        this.combo=false
                    }
                    if(this.position[this.choice1[1]][this.choice1[0]][1]==4){
                        this.position=Colorexplosion(this.position[this.choice2[1]][this.choice2[0]][0],this.position)
                        this.position[this.choice1[1]][this.choice1[0]][1]=0
                        this.position[this.choice1[1]][this.choice1[0]][0]=7
                        this.combo=false
                    }

                    if(check(this.position)&&this.combo){
                        this.position[this.choice2[1]][this.choice2[0]]= this.position[this.choice1[1]][this.choice1[0]]
                        this.position[this.choice1[1]][this.choice1[0]]=this.a
                    }
                    else{
                        this.position[this.choice2[1]][this.choice2[0]][3]= true
                        this.position[this.choice1[1]][this.choice1[0]][3]=true
                    }
                    this.choice1=[]
                    this.choice2=[]
                }
                else{
                    this.choice1=[]
                    this.choice2=[]
                }
                }
                else if(this.choice2.toString()!==empty.toString()){
                    this.choice1=[]
                    this.choice2=[]
                }
            }
            else if(this.game.select.mouseX<50 && 100<this.game.select.mouseY && this.game.select.mouseY<150){
                    this.game.powerup.activate=false
                    this.game.powerup.type=1
                    
            }
            else if(this.game.select.mouseX<50 && 150<this.game.select.mouseY && this.game.select.mouseY<200){
                this.game.powerup.activate=false
                this.game.powerup.type=2       
        }
        else if(this.game.select.mouseX<50 && 200<this.game.select.mouseY && this.game.select.mouseY<250){
            this.game.powerup.activate=false
                this.game.powerup.type=3
        }
        else if(this.game.select.mouseX<50 && 250<this.game.select.mouseY && this.game.select.mouseY<300){
            this.game.powerup.activate=false
                this.game.powerup.type=4
        }
        }
        else{
            if(this.game.select.mouseX>100){
            this.choice3.push(Math.floor((this.game.select.mouseX-100)/50))
            this.choice3.push(Math.floor((this.game.select.mouseY)/50)) 
            this.position[this.choice3[1]][this.choice3[0]][1]=this.game.powerup.type
            if(this.game.powerup.type==4){
                this.position[this.choice3[1]][this.choice3[0]][0]=6
            }
            this.choice3=[]
            }
            else 
            if(this.game.select.mouseX<50 && 100<this.game.select.mouseY &&this.game.select.mouseY<200){
                this.game.powerup.activate=true
                this.game.powerup.type=0 
            }
        }
            })

    }
        draw(context){
            for(let i=0; i<this.position.length; i++){
                for(let j=0; j<this.position[i].length; j++){
                    var color=[this.position[i][j][0],this.position[i][j][1]]
                    switch(color.toString()){
                        case[0,0].toString():
                            context.drawImage(this.img1,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [1,0].toString():
                            context.drawImage(this.img2,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [2,0].toString():
                            context.drawImage(this.img3,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [3,0].toString():
                            context.drawImage(this.img4,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [4,0].toString():
                            context.drawImage(this.img5,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [5,0].toString():
                            context.drawImage(this.img6,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [0,1].toString():
                            context.drawImage(this.img7,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [1,1].toString():
                            context.drawImage(this.img8,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [2,1].toString():
                            context.drawImage(this.img9,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [3,1].toString():
                            context.drawImage(this.img10,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [4,1].toString():
                            context.drawImage(this.img11,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [5,1].toString():
                            context.drawImage(this.img12,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [0,2].toString():
                            context.drawImage(this.img13,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [1,2].toString():
                            context.drawImage(this.img14,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [2,2].toString():                                
                            context.drawImage(this.img15,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [3,2].toString():
                            context.drawImage(this.img16,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [4,2].toString():
                            context.drawImage(this.img17,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [5,2].toString():
                             context.drawImage(this.img18,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                           break;
                        case [0,3].toString():
                            context.drawImage(this.img19,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [1,3].toString():
                            context.drawImage(this.img20,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [2,3].toString():                                
                            context.drawImage(this.img21,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [3,3].toString():
                            context.drawImage(this.img22,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [4,3].toString():
                            context.drawImage(this.img23,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                            break;
                        case [5,3].toString():
                            context.drawImage(this.img24,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                           break;
                        case [6,4].toString():
                            context.drawImage(this.img25,100+1.25*this.size*j,i*1.25*this.size,this.size,this.size)
                           break;
                        default:
                            break;
                    }

                }
            }
        }
    }
    class Game{
        constructor(width,height){
            this.candy=new candy(this)
            this.select=new select(this)
            this.powerup=new powerup(this)
        }
        update(){
            this.candy.update()
            this.select.update()
            this.powerup.update()
        }
        draw(context){
            this.candy.draw(context);
            this.select.draw(context);
            this.powerup.draw(context)
            
        }
    
    }
    const game= new Game(canvas.width, canvas.height);
    function play(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        game.update();
        game.draw(ctx);
        requestAnimationFrame(play)
    }
    play();
    })