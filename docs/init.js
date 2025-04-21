import * as  plr from './src/class_player.js';
import * as cam from './src/camera.js';
import vec2 from './src/vec2.js';
import * as gamestate from './src/gamestate.js';
import * as buttons from './src/button.js';
import {resetTime} from './update.js';


function clearAllEntities() {
    buttons.removeAll()
    plr.removeAll()
    cam.removeAll()
}

function gameinit(){
    plr.add()
    cam.add(vec2(0, 0))
}

function menuinit(){
    buttons.add(
        "Play", 
        function() { 
            gamestate.setByName("game")
            init()
        }, 
        vec2(50, 100), 
        vec2(100, 50)
    )
    buttons.add(
        "Settings", 
        function() { 
            gamestate.setByName("settings")
            init()
        }, 
        vec2(50, 175), 
        vec2(100, 50)
    )
}

function settingsinit(){
    buttons.add(
        "Back", 
        function() { 
            gamestate.setByName("menu")
            init()
        }, 
        vec2(50, 240), 
        vec2(100, 50)
    )
}


function init(){
    clearAllEntities()
    resetTime()
    if (gamestate.get() == "game") {
        gameinit()
    } else if (gamestate.get() == "menu") {
        menuinit()
    } else if (gamestate.get() == "creditos") {
        
    } else if (gamestate.get() == "settings") {
        settingsinit()
    } else gamestate.setByName("menu")
}


export default init;