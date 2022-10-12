
import  * as Tile from "./tile.js";
import  * as Level from "./level/Level.js";
import {TILES_PER_ROW} from "./level/Level.js";
import {onShowResults} from "./results.js";

const movesLeftColumns = document.getElementById("moves_left").querySelectorAll("div");

let allTiles;
var differentTile;
var allTilesOnBoard = [], allTilesOnBoardCount = {};

var tappedTilesCount = 0;
var lastCheckOverlap;

const menuUI = document.getElementById("menu-div"), menuTitle = document.getElementById("title"), 
    restartButton = document.getElementById("restart-button"), 
    nextLevelButton = document.getElementById("next-level-button"),
    levelUI = document.getElementById("level_title");

//restartButton.ontouchstart = onRestartGame;
//nextLevelButton.ontouchstart = onNextLevel;

//console.log(movesLeftColumns)

let tappedTile = undefined;

var movesLeftList = [];


export const NUMBER_TO_ELIMINATE = 3;

let currentLevel = undefined;

let minutes, seconds;

const resultsScreen = document.getElementById("results_screen")
const thisScreen = document.getElementById("game_screen")

//Level.initLevels();
//init(true);


function onNextLevel()
{
    clearlevel()
    menuUI.classList.add("hide");
    init(true);
}

function clearlevel()
{
    allTilesOnBoard = [];
    tappedTilesCount = 0;
    allTilesOnBoardCount = {};
    movesLeftList = [];
    updateMovesLeftColumn();
}

export function clearGame()
{
    allTilesOnBoard = [];
    tappedTilesCount = 0;
    allTilesOnBoardCount = {};
    movesLeftList = [];
    currentLevel = undefined
    updateMovesLeftColumn();
}

function onRestartGame()
{
    clearGame();
    menuUI.classList.add("hide");
    init(false);
}

function gameOver(status)
{
    console.log("over " + status)

    thisScreen.classList.add("hide");
    resultsScreen.classList.remove("hide");
    onShowResults(status);
    //menuUI.classList.remove("hide");
    //menuTitle.textContent = "You " + statusMessage + "!"; 
    
    
}

function nextLevel()
{

    allTilesOnBoard = [];

    let level = 0;
    
    if(currentLevel)
    {
   
        level = currentLevel.level;
    }
    
   


    currentLevel = Level.getLevels()[level];
    
  
    
    if(!currentLevel) // last level probs
    {
        level = 0;
        currentLevel = Level.getLevels()[0];
    }

    levelUI.textContent = "Level " + (level + 1);

    if((level + 1) == 1){
        differentTile = 3
    }

    if((level + 1) == 2){
        differentTile = 4
    }
    if((level + 1) == 3){
        differentTile = 6
    }
 
 

}
function generateGame(nextLevelBool)
{
    
    if(nextLevelBool)
    {
        
        nextLevel();
        
    }
 
    let tempoArray = null
    
    console.log(currentLevel)
    for(let i = 0; i < currentLevel.tilesMap.length; i++)
    {
        
        let lastTileMap = false;
        
  
        
        if(i === currentLevel.tilesMap.length - 1)
        {

            lastTileMap = true;
            
        }

 
        
        const tileGrid = document.getElementById("tile_grid" + (i + 1));
        //console.log(lastTileMap + " LE")
        //console.log((lastTileMap ? "faded_tile" : ""))
        console.log(tileGrid);

        
        tileGrid.innerHTML = "";
   
       



        let count = 0;

        let splitTileMap = currentLevel.tilesMap[i].split(", ");

        var tiles = 0;

        splitTileMap.forEach((value) => {
            if(value === "1")
                tiles++;
        });

        //tiles*=currentLevel.tilesMap.length;
        
     
        console.log("total tiles: " + tiles)
        //console.log((currentLevel.maxEachTileAppear * Tile.TYPE_OF_TILES.length))
        
        if(tiles > (currentLevel.maxEachTileAppear * Tile.TYPE_OF_TILES.length)) // checking how many tiles can appear
        {
            console.error("Error with Tile Map. Expecting " +
                (currentLevel.maxEachTileAppear * Tile.TYPE_OF_TILES.length) + " tiles but got more than that.")
            return;
        }

        splitTileMap.forEach((value) => {

            let tileType = "nothing", br ="";

            var tileNotFound = true;


      



            if(value === "1")
            {
                let alltile = [];
                for(let x = 0; x < Tile.TYPE_OF_TILES.length;x++){
                    let tile = Tile.TYPE_OF_TILES[x];
                    alltile.push(tile)
                }

                if(tempoArray == null){
                    tempoArray = []
                    for(let x = 0; x< differentTile;x++){
                        let randomIndex = Math.floor(Math.random() * alltile.length)
                        let randomTile = alltile[randomIndex];
                        tempoArray.push(randomTile)
                        alltile.splice(randomIndex, 1)
                    }
                }
                

                console.log(tempoArray)
                let count = 0;
                while(tileNotFound)
                {
                    let randomTile = tempoArray[Math.floor(Math.random() * tempoArray.length)];
                    let randomTileCount = allTilesOnBoardCount[randomTile];


                    console.log(randomTile)
     
 
                    
                    if(randomTileCount < currentLevel.maxEachTileAppear
                        || randomTileCount === 0) // not multiple and not at max appear
                    {
                        // so we can use on the board

                        tileType = randomTile;
                        allTilesOnBoardCount[randomTile] = randomTileCount + 1;
                        tileNotFound = false;








                    }

                    count++;


                }
            }

            count++;

            if(count === Level.TILES_PER_ROW)
            {

                br = "<br>";
       
                count = 0;
            }




            let htmlDomTileTemplate = "<div class=\"tiles_"+ tileType + " " + (!lastTileMap ? "tile_sub" : "") +
                
                " tile\" " +
                "style=\"background: url('./css/images/tile.svg'); background-size: 100% 100%;\n" +
                "                        background-repeat: no-repeat;\">" +
                "" +
                "<img class='tiles_image' src='./css/images/" + tileType + ".png'>" +
                "</div>" + br;




            tileGrid.innerHTML += htmlDomTileTemplate;
           


        })

    

   
    }
    
}

export function init(nextLevelBool)
{
    
    
    console.log("init");
    Tile.TYPE_OF_TILES.forEach((value) => {
        
        allTilesOnBoardCount[value] = 0;
        
    })
    
    generateGame(nextLevelBool);

    allTiles = document.querySelectorAll(".tile");
    
    allTiles.forEach((value) => {
        
        
           
       
        
        value.ontouchstart = onTileTapped;
        value.onclick = onTileTapped;
        
        const tileName = value.className
            
            .substring(value.className.indexOf("tiles_"),
                value.className.indexOf(" ")).replace("tiles_", "");
        
 
        if(!tileName.includes("nothing"))
        {

            console.log(allTilesOnBoard.length)
            console.log(tileName)

            allTilesOnBoard.push(new Tile.Tile(value, tileName)); // just in case we need it later, idk
        }
 
        
        
   
        
        
        
        
    })


    checkAllTilesOverlap();

}

function checkAllTilesOverlap()
{
    var delayInMilliseconds = 200; //1 second

    lastCheckOverlap = setTimeout(function() {

        for(let i = 0; i < allTiles.length; i++)
        {
            const currentTile = allTiles[i];

            if(currentTile.className.includes("tiles_nothing"))
                continue;


            var tileNotOverlapped = true;
            

            if(currentTile.className.includes("tile_sub"))
            {

                for(let i = 0; i < allTiles.length; i++)
                {
                    const currentTile2 = allTiles[i];

                    if(currentTile !== currentTile2)
                    {

                        if(currentTile2.className.includes("tiles_nothing"))
                            continue;

                        if(isCollide(currentTile2, currentTile))
                        {
                           
                            tileNotOverlapped = false;
                        }
                    


                    }


                }

            }
            
            if(!tileNotOverlapped)
            {
                currentTile.classList.add("faded_tile")
            
                
            }
            else
            {
                currentTile.classList.remove("faded_tile")
                currentTile.style.animation = "pop 0.3s linear 1";
            }


        }
    }, delayInMilliseconds);
}



function onTileTapped(event)
{

 
    if(!event.target.className.includes("tiles_nothing") && !event.target.getAttribute("removed"))
        onTileRemoved(event.target, event)
}


function onTileRemoved(tile, event)
{
    
    if(movesLeftList.length === 5 || tile.className.includes("faded_tile"))
    {
        return;
    }
    

 
 
   

    tile.setAttribute("removed", true)
    tile.style.animation = "removeTile .25s";

    var delayInMilliseconds = 25; //1 second
    

    setTimeout(function() {
     

        tile.classList.remove("faded_tile");
        tile.classList.add("tiles_nothing")

        var tempBackgroundCache = tile.style.background;


        var currentMovesLeftColumn = movesLeftColumns[movesLeftList.length];
        
        var currentMovesLeftColumnImage = currentMovesLeftColumn.children[0];
        


        currentMovesLeftColumnImage.src = tile.children[0].src;
        currentMovesLeftColumnImage.style.display = "block";
        
        
        currentMovesLeftColumn.style.background = tempBackgroundCache;
        currentMovesLeftColumn.style.backgroundSize = "contain";

  



        movesLeftList.push(tile);







        checkTileDuplicate(tile.className)

        clearTimeout(lastCheckOverlap);
        checkAllTilesOverlap();
        tappedTilesCount++;
        
        if(!checkIfBoardStillHasTiles())
        {
            gameOver("win")
        }
        
    }, delayInMilliseconds);
 
    

    
  
    
}


function checkTileDuplicate(className)
{
    const simplifiedClassName = className

        .substring(className.indexOf("tiles_"),
            className.indexOf(" ")).replace("tiles_", "");
    
    //console.log(movesLeftList)
    var count = 0;
    movesLeftList.forEach((value) => {
        
        
        
        if(value.className
            .substring(value.className.indexOf("tiles_"),
                value.className.indexOf(" ")).replace("tiles_", "")
                === simplifiedClassName)
        {
            count++;
        }
        
    });
    
    
 
    if(count === 3)
    {
      
        
        var index = 0, successCount = 0;


        const indexesToDelete = [];
        
        
        movesLeftList.forEach((value) => {


         
            // time to remove the tiles because we confirmed duplication.

            if(successCount === 3)
            {
                return;
            }

            if(value.className
                .substring(value.className.indexOf("tiles_"),
                    value.className.indexOf(" ")).replace("tiles_", "")
                    === simplifiedClassName)
            {
             


                movesLeftColumns[index].style.animation = "pulse 0.5s ease-in .5";
           


                indexesToDelete.push(index);
             
                
                
                
                successCount++;
            }
            
            index++;

        });


        // start from the greatest index so we don't disrupt the list.
        for(let i = NUMBER_TO_ELIMINATE; i > 0; i--)
        {

            movesLeftList.splice(indexesToDelete[i - 1], 1)

        }


        updateMovesLeftColumn();
        
       
  


  
    }
    else
    {
        if(movesLeftList.length === 5)
        {
            if(checkIfBoardStillHasTiles)
            {
                gameOver("lose")
                console.log("here")
            }
          
            else
                gameOver("win")
            
        }
    }
}

function checkIfBoardStillHasTiles()
{
    console.log(tappedTilesCount + " TILES COUNT")
    console.log(allTilesOnBoard.length + " ALL TILES")
    return tappedTilesCount !== allTilesOnBoard.length;
}

function updateMovesLeftColumn()
{
    for(let i = 0; i < movesLeftColumns.length; i++)
    {
        const existingTile = movesLeftList[i];
        const tileColumn = movesLeftColumns[i];
        
        
        
        let background = "", image = "";
        
        if(existingTile)
        {
            background = existingTile.style.background;
            
            image = existingTile.children[0].src;
     
            
          
        }

        tileColumn.style.background = background;
        tileColumn.style.backgroundSize = "contain";
        tileColumn.style.animation = "";

        tileColumn.children[0].src = image;
        
        console.log(tileColumn.children[0])
        
        if(!image.length > 0)
        {
            tileColumn.children[0].style.display = "none";
        }
        
    }
}

function isCollide(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();


    return !(
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    );
}


document.addEventListener('dblclick', function(event) {
    event.preventDefault();
}, { passive: false });

