var Megaman = function () {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
};

var Random = function () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};

var startGameTimer = 260;
var phaseFirst = null;

//Deklaracja gry ////////////////////////////////////////////////////////////////////////////////////////////////////////
var Game = function () {
    this.board = document.getElementById('board').querySelectorAll('div');
    this.megaman = new Megaman();
    this.enemy = new Random();
    this.freeze = new Random();
    this.boss = new Random();
    this.bossenemy = new Random();
    this.coin = new Random();
    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);
    };

//Pokaż postać //////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.showMegaman = function () {
        if (document.querySelector('.megaman') != null) {
            this.hideVisibleMegaman();
        }
        this.board[this.index(this.megaman.x, this.megaman.y)].classList.add('megaman');
    };

//Ukryj postać //////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.hideVisibleMegaman = function () {
        document.querySelector('.megaman').classList.remove('megaman');
    };

//Pokaż coin ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.showCoin = function () {
        this.coin = new Random();
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

//Pokaż enemy ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.showEnemy = function () {
        this.board[this.index(this.enemy.x, this.enemy.y)].classList.add('enemy');
    };

//Pokaż enemy bossa /////////////////////////////////////////////////////////////////////////////////////////////////////
    this.showEnemyBoss = function () {
        this.board[this.index(this.bossenemy.x, this.bossenemy.y)].classList.add('bossenemy');
    };

//Pokaż bossa ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.showBoss = function () {
        this.board[this.index(this.boss.x, this.boss.y)].classList.add('boss');
    };


//Faza 1 bossa //////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.freezer = function () {
        this.board[this.index(this.freeze.x, this.freeze.y)].classList.add('freeze');
    };

//Kierunek poruszania się megamana //////////////////////////////////////////////////////////////////////////////////////
    var self = this;
    this.moveMegaman = function () {
        if (this.megaman.direction === "right") {
            this.megaman.x = this.megaman.x + 1;
        } else if (this.megaman.direction === "left") {
            this.megaman.x = this.megaman.x - 1;
        } else if (this.megaman.direction === "up") {
            this.megaman.y = this.megaman.y - 1;
        } else if (this.megaman.direction === "down") {
            this.megaman.y = this.megaman.y + 1;
        }
        this.gameOver();
        this.showMegaman();
        this.checkCoinCollision();
        this.checkEnemyCollision();

    };
    this.turnMegaman = function (event) {
        switch (event.which) {
            case 65:
                this.megaman.direction = 'left';
                break;
            case 68:
                this.megaman.direction = 'right';
                break;
            case 87:
                this.megaman.direction = 'up';
                break;
            case 83:
                this.megaman.direction = 'down';
                break;
        }
    };
    document.addEventListener('keydown', function (event) {
        self.turnMegaman(event);
    });

//Sprawdzanie kolizji z Coinem //////////////////////////////////////////////////////////////////////////////////////////
    this.checkCoinCollision = function () {
        this.checkCoinInEnemy();
        if (this.megaman.x === this.coin.x && this.megaman.y === this.coin.y) {
            this.score++;
            document.querySelector(".coinCollect").play();
            document.querySelector('.coin').classList.remove('coin');
            document.querySelector('#score span').innerHTML = this.score;
            this.coin = new Random();
            this.showCoin();

//Przyzwanie bossa
            if (this.score === 10) {
                self.showBoss();
                clearInterval(spawnEnemies);
                document.querySelector(".levelmusic").pause();
                var allEnemies = document.querySelectorAll('.enemy');
                allEnemies.forEach(function () {
                    document.querySelector('.enemy').classList.remove('enemy');
                });
                var spawnIce = setInterval(function () {
                    self.freeze = new Random();
                    self.freezer();
                }, phaseFirst);

                var bossEnemiesSpawn = setInterval(function () {
                    self.bossenemy = new Random();
                    self.showEnemyBoss();
                    document.querySelector(".bossEnemySpawn").play();
                }, 6000);
            }
        }
    };

//Sprawdzenie kolizji ze wszystkimi wrogami /////////////////////////////////////////////////////////////////////////////
    this.checkEnemyCollision = function () {
        var megaman = document.querySelector(".megaman");
        var megamanClass = megaman.classList;
        var token = megamanClass.value;
        if (token.slice(0, 5) === "enemy" || token.slice(0, 4) === "boss" || token.slice(7, 16) === "bossenemy") {
            endGame();
            document.querySelector(".score span").innerHTML = this.score;
            document.querySelector(".score").innerText = this.score;
            document.querySelector(".death").play();
            document.querySelector(".death").onended = function () {
                document.querySelector(".death").pause();
            };
        }
    };
//Sprawdzenie czy coin nie leży w enemy /////////////////////////////////////////////////////////////////////////////////
    this.checkCoinInEnemy = function () {
        var enemies = document.querySelector('.enemy.coin');
        var bossenemies = document.querySelector('.bossenemy.coin');
        var boss = document.querySelector('.boss');

        if (enemies !== null) {
            enemies.classList.remove('coin');
            this.coin = new Random();
            this.showCoin();
        } else if (bossenemies !== null) {
            bossenemies.classList.remove('coin');
            this.coin = new Random();
            this.showCoin();
        }
    };

//Warunki zakonczenia gry ///////////////////////////////////////////////////////////////////////////////////////////////
    this.gameOver = function () {
        if (this.megaman.x < 0 || this.megaman.x > 9 || this.megaman.y < 0 || this.megaman.y > 9) {
            endGame();
            document.querySelector(".score span").innerHTML = this.score;
            document.querySelector(".score").innerText = this.score;
            document.querySelector(".death").play();
            document.querySelector(".death").onended = function () {
                document.querySelector(".death").pause();
            };
        }
    };

// Rozpoczęcie gry //////////////////////////////////////////////////////////////////////////////////////////////////////
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveMegaman();
            document.querySelector(".levelmusic").play();
            document.querySelector(".levelmusic").loop = true;

            if (document.querySelector(".boss") !== null) {
                document.querySelector(".levelmusic").pause();
                document.querySelector(".bossbattle").play();
                document.querySelector(".bossbattle").loop = true;
            }
        }, startGameTimer);
    };

//Spawnery //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var spawnEnemies = setInterval(function () {
        self.enemy = new Random();
        self.showEnemy();
    }, 12000);
};

// Funkcja kończąca grę /////////////////////////////////////////////////////////////////////////////////////////////////
function endGame() {
    document.querySelector('.invisible').style.display = 'flex';
    document.querySelector('.invisible').style.justifyContent = 'center';
    document.querySelector('.invisible').style.flexDirection = 'column';
    document.querySelector('.invisible').style.alignItems = 'center';
    document.querySelector(".levelmusic").pause();
    document.querySelector(".bossbattle").pause();
    document.querySelector(".bossEnemySpawn").pause();
}

var game = new Game();
game.showCoin();
game.showEnemy();
game.showMegaman();
game.startGame();