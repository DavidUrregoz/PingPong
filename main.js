
//Funcion anonima
(function(){
    self.Board=function(width,height){
        this.width=width;
        this.height=height;
        this.playing=false;
        this.game_over = false;
        this.bars=[];
        this.ball=null;
    }

    self.Board.prototype = { //Retorna las barras y la pelota
        get elements(){
            var elements=this.bars;
            elements.push(ball);
            return elements;
        }
    }

})();


(function(){
    self.Bar = function(x,y,width,height,board){

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
})();

window.addEventListener("load",main);

function main(){
    var board = new Board(800,400);
    var canvas = document.getElementById('canvas');
    var boar_view = new BoardView(canvas,board);
}