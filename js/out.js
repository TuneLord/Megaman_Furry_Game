!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n=function(){this.x=0,this.y=0,this.direction="right"},o=function(){this.x=Math.floor(10*Math.random()),this.y=Math.floor(10*Math.random())};function i(){document.querySelector(".invisible").style.display="flex",document.querySelector(".invisible").style.justifyContent="center",document.querySelector(".invisible").style.flexDirection="column",document.querySelector(".invisible").style.alignItems="center",document.querySelector(".levelmusic").pause(),document.querySelector(".bossbattle").pause(),document.querySelector(".bossEnemySpawn").pause()}var s=new function(){this.board=document.getElementById("board").querySelectorAll("div"),this.megaman=new n,this.enemy=new o,this.freeze=new o,this.boss=new o,this.bossenemy=new o,this.coin=new o,this.score=0,this.index=function(e,t){return e+10*t},this.showMegaman=function(){null!=document.querySelector(".megaman")&&this.hideVisibleMegaman(),this.board[this.index(this.megaman.x,this.megaman.y)].classList.add("megaman")},this.hideVisibleMegaman=function(){document.querySelector(".megaman").classList.remove("megaman")},this.showCoin=function(){this.coin=new o,this.board[this.index(this.coin.x,this.coin.y)].classList.add("coin")},this.showEnemy=function(){this.board[this.index(this.enemy.x,this.enemy.y)].classList.add("enemy")},this.showEnemyBoss=function(){this.board[this.index(this.bossenemy.x,this.bossenemy.y)].classList.add("bossenemy")},this.showBoss=function(){this.board[this.index(this.boss.x,this.boss.y)].classList.add("boss")},this.freezer=function(){this.board[this.index(this.freeze.x,this.freeze.y)].classList.add("freeze")};var e=this;this.moveMegaman=function(){"right"===this.megaman.direction?this.megaman.x=this.megaman.x+1:"left"===this.megaman.direction?this.megaman.x=this.megaman.x-1:"up"===this.megaman.direction?this.megaman.y=this.megaman.y-1:"down"===this.megaman.direction&&(this.megaman.y=this.megaman.y+1),this.gameOver(),this.showMegaman(),this.checkCoinCollision(),this.checkEnemyCollision()},this.turnMegaman=function(e){switch(e.which){case 65:this.megaman.direction="left";break;case 68:this.megaman.direction="right";break;case 87:this.megaman.direction="up";break;case 83:this.megaman.direction="down"}},document.addEventListener("keydown",function(t){e.turnMegaman(t)}),this.checkCoinCollision=function(){this.checkCoinInEnemy(),this.megaman.x===this.coin.x&&this.megaman.y===this.coin.y&&(this.score++,document.querySelector(".coinCollect").play(),document.querySelector(".coin").classList.remove("coin"),document.querySelector("#score span").innerHTML=this.score,this.coin=new o,this.showCoin(),10===this.score)&&(e.showBoss(),clearInterval(t),document.querySelector(".levelmusic").pause(),document.querySelectorAll(".enemy").forEach(function(){document.querySelector(".enemy").classList.remove("enemy")}),setInterval(function(){e.freeze=new o,e.freezer()},null),setInterval(function(){e.bossenemy=new o,e.showEnemyBoss(),document.querySelector(".bossEnemySpawn").play()},6e3))},this.checkEnemyCollision=function(){var e=document.querySelector(".megaman").classList.value;"enemy"!==e.slice(0,5)&&"boss"!==e.slice(0,4)&&"bossenemy"!==e.slice(7,16)||(i(),document.querySelector(".score span").innerHTML=this.score,document.querySelector(".score").innerText=this.score,document.querySelector(".death").play(),document.querySelector(".death").onended=function(){document.querySelector(".death").pause()})},this.checkCoinInEnemy=function(){var e=document.querySelector(".enemy.coin"),t=document.querySelector(".bossenemy.coin");document.querySelector(".boss"),null!==e?(e.classList.remove("coin"),this.coin=new o,this.showCoin()):null!==t&&(t.classList.remove("coin"),this.coin=new o,this.showCoin())},this.gameOver=function(){(this.megaman.x<0||this.megaman.x>9||this.megaman.y<0||this.megaman.y>9)&&(i(),document.querySelector(".score span").innerHTML=this.score,document.querySelector(".score").innerText=this.score,document.querySelector(".death").play(),document.querySelector(".death").onended=function(){document.querySelector(".death").pause()})},this.startGame=function(){this.idSetInterval=setInterval(function(){e.moveMegaman(),document.querySelector(".levelmusic").play(),document.querySelector(".levelmusic").loop=!0,null!==document.querySelector(".boss")&&(document.querySelector(".levelmusic").pause(),document.querySelector(".bossbattle").play(),document.querySelector(".bossbattle").loop=!0)},260)};var t=setInterval(function(){e.enemy=new o,e.showEnemy()},12e3)};s.showCoin(),s.showEnemy(),s.showMegaman(),s.startGame()}]);