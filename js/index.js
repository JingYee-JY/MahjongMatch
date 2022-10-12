import  * as Game from "./game.js";
import  * as Level from "./level/Level.js";

const imageCacher = document.getElementById("cacher")

Level.initLevels();
function cacheImages(array)
{
    array.forEach((value) => {
        
        var image = new Image()
       
        
        image.onload = function ()
        {
            
            console.log(image.src + " done")
        }

        image.src = "./css/images/" + value;

        //imageCacher.src = "./css/images/" + value;
        
    });

    imageCacher.src = "";
}

cacheImages(["a1.png", "a2.png", "a3.png", "logo.svg",
"lose.svg", "next_zone.svg", "play_again.svg", "rectangle.svg", "rectangle2.png",
"start.svg", "tile.svg", "title.svg", "win.svg", "zone.svg", "assets.png"])


const startButton = document.getElementById("start_button");
const easyButton = document.getElementById("easy_button");
const normalButton = document.getElementById("normal_button");
const hardButton = document.getElementById("hard_button");

const mainMenuScreen = document.getElementById("main_screen"), 
    selectionScreen = document.getElementById("selection_screen"),
    gameScreen = document.getElementById("game_screen");


console.log(startButton);

startButton.ontouchstart = startGame;

startButton.onclick = startGame;

easyButton.onclick = Easy;
easyButton.ontouchstart = Easy;

normalButton.onclick = Noraml;
normalButton.ontouchstart = Noraml;

hardButton.onclick = Hard;
hardButton.ontouchstart = Hard;

function startGame()
{
    mainMenuScreen.classList.add("hide");
    selectionScreen.classList.remove("hide");

}

function Easy()
{
    selectionScreen.classList.add("hide");
    gameScreen.classList.remove("hide");

    Game.init(true);
}

function Noraml()
{
    selectionScreen.classList.add("hide");
    gameScreen.classList.remove("hide");

    Game.init(true);
    Game.init(true);
}

function Hard()
{
    selectionScreen.classList.add("hide");
    gameScreen.classList.remove("hide");

    Game.init(true);
    Game.init(true);
    Game.init(true);
}