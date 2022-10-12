import {init, clearGame} from "./game.js";

const resultImage = document.getElementById("results_image"), 
    playAgainButton = document.getElementById("play_again_button");

const thisScreen = document.getElementById("results_screen")
const mainMenuScreen = document.getElementById("main_screen")

playAgainButton.ontouchstart = onRestartGame;

function onRestartGame()
{
    clearGame();
    thisScreen.classList.add("hide");
    mainMenuScreen.classList.remove("hide");
    init(false);
}



export function onShowResults(status)
{
    var imageSource;
    if(status === "win")
        imageSource = "./css/images/win.svg"
    else
        imageSource = "./css/images/lose.svg"


    resultImage.src = imageSource;
    
    
}
