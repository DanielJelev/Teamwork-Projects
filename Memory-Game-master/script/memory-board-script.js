/**
 * Created by user on 13.3.2015 г..
 */
/************************* CONSTRUCTORS *************************/
var SoundPlayer = new function soundPlayer(){
    var mutter = false;
    var startingSoundPlaying = true;
    var background_sound = new Audio('sounds/background-sound.mp3');
    var new_game_sound = new Audio('sounds/new-game.mp3');
    var  hit = new Audio('sounds/hit.mp3');
    var incorrect = new Audio('sounds/incorrect.mp3');
    var game_over = new Audio('sounds/game_over.mp3');

    this.playSound = function(soundPath){
        var sound = new Audio(soundPath);
        sound.play();
    };
    this.playHitSound = function(){
        startingSoundPlaying = true;
        if(mutter === false){
            hit.play();
        }
    };
    this.playIncorrect = function(){
        startingSoundPlaying = true;
        if(mutter === false){
            incorrect.play();
        }
    };

    this.playBackgroundMusic = function(){
        startingSoundPlaying = true;
        if(mutter === false){
            background_sound.play();
            background_sound.loop = 'true';
        }
    };

    this.stopBackgroundSound = function(){
        startingSoundPlaying = false;
        background_sound.pause();
    };

    this.startNewGameSound = function(){
        if(mutter === false){
            new_game_sound.play();
        }
    };
    this.playGameOver = function(){
        startingSoundPlaying = true;
        if(mutter === false){
            game_over.play();
        }
    };

    this.muteAllSounds = function(){
        if(mutter === false){
            background_sound.pause();
            mutter = true;
            document.getElementById('mutter').innerHTML = "<img src=\'images/sounds-off.png\'/>";
        }else{
            mutter = false;
            document.getElementById('mutter').innerHTML = "<img src=\'images/sounds-on.png\'/>";
            if(startingSoundPlaying === true){
                background_sound.play();
            }

        }
    }
};
function Levels(lvl, boardWidth, timeInSec, tiles){
    this.level = lvl;
    this.boardWidth = boardWidth;
    this.timeInSec = timeInSec;
    this.tilesCount = tiles;
    this.cardsFlipped = 0;
    this.playing = false;
}

function Card(pair, id, imgUrl){
    var image = document.createElement('div');
    image.id = id;
    image.setAttribute('backside', imgUrl );
    image.setAttribute("pairID", pair);
    image.setAttribute("flipped", "false");

    return image;
}

var Board = new function mBoard(){
    this.memory_board_wrapper = document.getElementById("memory-board-wrapper");
    this.memory_board =  document.getElementById("memory-board");
    this.playerName = document.getElementById("player-name");
    this.lvlInfo = document.getElementById("level-info");
    this.scoreInfo = document.getElementById("score-info");
};

var timer = new function Timer(){
    var progress = document.getElementById("loading-bar-progress");
    this.start = function(Level){
        Level.playing = true;
        progress.style.width = "0%";
        progress.style.transition = "width " + Level.timeInSec +"s linear 0s";
        progress.style.width = "100%";
        SoundPlayer.playBackgroundMusic();
    };
    this.stop = function(Level){
        if(Level.playing === true){
            SoundPlayer.playGameOver();
            gameOver();
        }
    };
    this.reset = function(){
        progress.style.transition = "width 0s linear 0s";
        progress.style.width = "0%";
    }
};
/******************************************************************/

Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

function generateDeck(count){
    var Deck = [];

    for(var i = 0, j = 0; i < count; i += 2, j++){
        Deck[i] = new Card(j,"tile_" + i, "url(\'images/tiles/tile_" + j + ".jpg\')");
        Deck[i+1] = new Card(j, "tile_" + (i + 1), "url(\'images/tiles/tile_" + j + ".jpg\')");
    }
    Deck.shuffle();

    return Deck;

}

function addTiles(board, Deck, i, Level){
    if(i < Level.tilesCount){
        setTimeout(function(){
            board.appendChild(Deck[i]);
            addTiles(board, Deck, i+1, Level);

            if(i === (Level.tilesCount-1) ){
             startPlaying(Deck, Level);
            }
        }, 100);
    }
}

function gameOver(){
    function displayCredits(){
        document.getElementById('credits').removeEventListener("click", displayCredits, false);
		document.getElementById('memory-board').innerHTML = '';
        var wrapper = document.getElementById("wrapper");
        wrapper.style.background  = "url(\'images/background-no-text.jpg\')";

        var creditsDiv = document.createElement("div");
        var creditsParagraph = document.createElement("div");
        var endParagraph = document.createElement("div");
        var okButton = document.createElement("div");


        creditsParagraph.style.marginTop = "80px";
        creditsParagraph.style.fontSize = "30px";
        endParagraph.style.marginTop = "100px";


        creditsDiv.id = "login-div";
        okButton.id = "start-btn";

        creditsParagraph.innerHTML =
            'G A M E    O V E R </br>'+
            document.getElementById("player-name").innerHTML+'</br>'+
            document.getElementById("score-info").innerHTML
        ;

        okButton.innerHTML = "Restart";

        wrapper.appendChild(creditsDiv);
        creditsDiv.appendChild(creditsParagraph);
        creditsDiv.appendChild(endParagraph);
        creditsDiv.appendChild(okButton);

        slideOpen(creditsDiv, 450, 1.2);

        okButton.onclick = function(){
            document.getElementById('credits').addEventListener("click", displayCredits, false);
            slideClose(creditsDiv, 1.2);
            location.reload();
        }
    }
    displayCredits();
}

function levelUp(Level, Deck){
    var nextLevel = Level.level;
    Level = null;
    Deck = null;

    timer.reset();
    memoryBoard(nextLevel);
}



function startPlaying(Deck, Level){
    var cardsOpened = 0;
    var tempCard;

    for(var i = 0; i < Deck.length; i++){
        Deck[i].addEventListener('click', hitMe);
    }

    setTimeout(function(){
        timer.stop(Level, Deck);
    }, Level.timeInSec*1000);
    timer.start(Level);


    function hitMe(e){
        if(this.getAttribute('flipped') === "false"){
            SoundPlayer.playHitSound();
            this.setAttribute('flipped', "true");
            this.style.background = this.getAttribute("backside");
            if(cardsOpened === 0){
                tempCard = this;
                cardsOpened = 1;
            }else if(cardsOpened === 1){
                cardsOpened = 0;
                if(this.getAttribute('pairId') === tempCard.getAttribute('pairID')){
                    Level.cardsFlipped += 2;
                    Player.score += 2*Level.level;
                    Board.scoreInfo.innerHTML = "Score: " + Player.score;
                    if(Level.tilesCount === Level.cardsFlipped){
                        Level.playing = false;
                        levelUp(Level,  Deck);
                    }
                }else{
                    SoundPlayer.playIncorrect();
                    flip2Back(this, tempCard);
                }
            }
        }
    }

    function flip2Back(cardA, cardB){
        setTimeout(function(){
            cardA.setAttribute('flipped', "false");
            cardA.style.background = "url('images/redDot18.png')";
            cardB.setAttribute('flipped', "false");
            cardB.style.background = "url('images/redDot18.png')";
        }, 750);
    }
}

function winn(){
    alert('You beat the game madafaka');
}
/***-------------------------------- MAIN BOARD --------------------------------***/
function memoryBoard(lvl){
    if(lvl === 10){
        winn();
    }
    var lvlWidth  = [300, 400, 500, 400, 400, 600, 500, 600, 600, 600];
    var lvlTime   = [12, 16, 20, 25, 30, 35, 40, 50, 60, 80];
    var lvlTiles = [6, 8, 10, 12, 16, 18, 20, 24, 30, 36];
    var Level = new Levels(lvl + 1, lvlWidth[lvl], lvlTime[lvl], lvlTiles[lvl]);

    var Deck = generateDeck(Level.tilesCount);
    Board.playerName.innerHTML = "Player: " + Player.nick;
    Board.lvlInfo.innerHTML  = "Level: " + Level.level;
    Board.scoreInfo.innerHTML = "Score: " + Player.score;
    Board.memory_board_wrapper.style.visibility = "visible";
    Board.memory_board.innerHTML = "";
    Board.memory_board.style.width = Level.boardWidth + "px";
    Board.memory_board.style.visibility = "visible";

    setTimeout(function(){
        addTiles(Board.memory_board, Deck, 0, Level);
    }, 500);
}