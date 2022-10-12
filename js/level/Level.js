import  * as Main from "../game.js";

export class Level {
    
    
    constructor(level, tilesMap) {
        
        this.level = level;
        this.tilesMap = tilesMap;
        //this.maxEachTileAppear = Main.NUMBER_TO_ELIMINATE * tilesMap.length;
        this.maxEachTileAppear = 3;
    }
}




const levels = [];


export const TILES_PER_ROW = 3;

export function initLevels()
{

    levels.push(new Level(1, ["1, 1, 1, " +
                                           "0, 0, 0, ",
                                        
                                           "1, 1, 1, " +
                                           "1, 1, 1, "]))

    levels.push(new Level(2, ["0, 1, 1, " +
                                           "1, 1, 0, ",
                                        
                                           "1, 1, 1, " +
                                           "1, 1, 1, " +
                                            "0, 1, 1"]))
    
    levels.push(new Level(3, ["1, 1, 1, " +
                                            "1, 1, 1, " +
                                            "1, 1, 1",

                                            "1, 1, 1, " +
                                            "1, 1, 1, " +
                                            "1, 1, 1"]))
}


export function getLevels()
{
    return levels;
}