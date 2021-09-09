//Funcion anonima
(function(){
    self.Board=function(width,height){
        this.width=width;
        this.height=height;
        this.playing=false;
        this.game_over = false;
        this.bars=[];
        this.ball=null;
        this.playing= false;
    }

    self.Board.prototype = { //Retorna las barras y la pelota
        get elements(){
            var elements=this.bars.map(function(bar){return bar; });
            elements.push(this.ball);
            return elements;
        }
    }

    //Nueva linea para el merge

})();

(function(){
    self.Marcador=function(){
        this.puntosBarraIzquierda=0;
        this.puntosBarraDerecha=0;
    }

    self.Marcador.prototype = {
        puntoDerecha: function(){
            this.puntosBarraDerecha+=1;
            alert("El marcador va: "+ this.puntosBarraIzquierda +" a "+this.puntosBarraDerecha);
            if(this.puntosBarraIzquierda >= 10){
                alert("El jugador de la Izquierda ah ganado");
            }
        },
        puntosIzquierda: function(){
            this.puntosBarraIzquierda+=1;
            alert("El marcador va: "+this.puntosBarraIzquierda +" a "+this.puntosBarraDerecha);
            if(this.puntosBarraIzquierda >= 10){
                alert("el jugador de la Derecha ah ganado");
            }
        }
     
    }
})();

(function(){
    self.Ball = function(x,y,radius,board){
        this.x=x;
        this.y=y;
        this.radius = radius;
        this.speed_y = 1;
        this.speed_x = 3;
        this.board = board;
        this.direction = 1;//Sentido de movimiento
        this.directiony = 1;
        this.bounce_angle = 0;
        this.max_bounce_angle= Math.PI/9;
        this.speed=3;
        
        board.ball = this;  
        this.kind="circle";
    }
    self.Ball.prototype = {
        move: function(){
            this.x += (this.speed_x*this.direction);
            this.y += (this.speed_y*this.direction*this.directiony);
        },
        get width(){
            return this.radius*2;
        },
        get height(){
            return this.radius*2;
        },
        
        collision: function(bar){//Reacciona a la colision
            var relative_intersect_y = ( bar.y + (bar.height / 2) ) - this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speed_y = this.speed * - Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            if (this.x > (this.board.width / 2)) this.direction = -1;
            else this.direction = 1;
        }
    }
})();

(function(){
    self.Bar = function(x,y,width,height,board){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.board=board;
        this.board.bars.push(this);  /// agregar al arreglo las barra
        this.kind = "rectangle";
        this.speed=15; //Velocidad de las barras
    }

    self.Bar.prototype = {
        down: function(){
            if(this.y <= 350){
                this.y += this.speed;
            }
        },
        up: function(){
            if(this.y >= -25){
                this.y -= this.speed;
            }
        },
        toString: function(){
            return "x: " + this.x + "y: " + this.y;
        }
    }
})();

(function(){
    self.BoardView = function(canvas,board){
        this.canvas=canvas;
        this.canvas.width=board.width;
        this.canvas.height=board.height;
        this.board = board;
        this.ctx=canvas.getContext("2d");
    }

    self.BoardView.prototype ={

        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },

        draw: function(){
            for (var i=this.board.elements.length-1; i>=0;i--){
                var el= this.board.elements[i];
                draw(this.ctx,el);
            };
        },

        check_collisions: function(){
            for ( var i = this.board.bars.length - 1 ; i>=0; i--){
                var bar = this.board.bars[i];
                if(hit(bar,this.board.ball)){
                    this.board.ball.collision(bar);
                }
            };
        },

        play:function(){   
            if(this.board.playing){ //Condicional del pause
                boar_view.clean();
                boar_view.draw();   
                this.check_collisions();
                this.board.ball.move();
            }            
        }
    }

    function hit(a,b){ //Revisa si a colisiona con b
    var hit = false;
    //Colisiones hirizontales
    if(b.x + b.width >= a.x && b.x < a.x + a.width){
        //Colisiona verticales
        if (b.y + b.height >= a.y && b.y < a.y + a.height) 
        hit = true;
    }

  //Colisión de a con b
    if(b.x <= a.x && b.x + b.width >= a.x + a.width){
        if (b.y <= a.y && b.y + b.height >= a.y + a.height) 
            hit = true;
    }

  //Colision b con a
    if(a.x <= b.x && a.x + a.width >= b.x + b.width){
        //Colisiona verticales
        if (a.y <= b.y && a.y + a.height >= b.y + b.height) 
            hit = true;
    }
    return hit;
    }

    function draw(ctx,element){
       switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x,element.y,element.radius,0,7);   
                ctx.fill();
                ctx.closePath();               
                if(element.x < -20 ){
                    marcador.puntoDerecha();
                    element.x = 380;
                    element.y =170;
                    board.playing = !board.playing;
                    element.direction = ramd();

                }else if(element.x > 820){
                    marcador.puntosIzquierda();
                    element.x = 380;
                    element.y = 170;
                    board.playing = !board.playing;
                    element.direction = ramd();  
                }
                if(element.y <-1){
                    element.directiony = element.directiony*-1;
                }else if(element.y > 401){
                    element.directiony = element.directiony*-1;
                }
                break  
        }  
    }
})();

function ramd(){
let ram=Math.random()*2-1;
    if(ram>0)
        return 1;
    else if(ram<0)
        return-1;                   
}


var board = new Board(800,400);


var bar1 = new Bar(40,150,20,100,board);
var bar2 = new Bar(740,150,20,100,board);
// var bar3 = new Bar(2,0,796,5,board);
// var bar4 = new Bar(2,395,796,5,board);

var marcador = new Marcador();
var canvas = document.getElementById('canvas');
var boar_view = new BoardView(canvas,board);
var ball = new Ball(380,170,15,board);


document.addEventListener("keydown",function(ev){ //Lectura de teclado por codigo   
    if(ev.keyCode==38){
        ev.preventDefault();
        bar2.up();
    }else if(ev.keyCode===40){
        ev.preventDefault();
        bar2.down();
    }else if(ev.keyCode===87){
        ev.preventDefault();
        bar1.up();
    }else if(ev.keyCode===83){
        ev.preventDefault();
        bar1.down();
    }else if(ev.keyCode===32){
        ev.preventDefault();
        board.playing = !board.playing; //Pausa con espacio
    }
    console.log(bar1.toString());
    
});

///setInterval(main,200); //forma antigua
boar_view.draw();
window.requestAnimationFrame(controller);

function controller(){ 
    boar_view.play();
    window.requestAnimationFrame(controller);
}