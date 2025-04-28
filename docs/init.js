import * as  plr from './src/class_player.js';
import * as cam from './src/camera.js';
import vec2 from './src/vec2.js';
import * as gamestate from './src/gamestate.js';
import * as buttons from './src/button.js';
import {resetTime} from './update.js';
import {plat} from './src/plataformas.js';
import * as Vars from './src/variaveis de mundo.js';


function clearAllEntities() {
    buttons.removeAll()
    plr.removeAll()
    cam.removeAll()
}

function gameinit(){
    pauseScreenInit()

    plr.add(vec2(8, -1400))
    cam.add(vec2(0, -1500))
}

function pauseScreenInit(){
    buttons.add(
        "resume",
        function() {
            Vars.setPause(false)
        },
        vec2(100, 50)
    )
}

function menuinit(){
    buttons.add(
        "Play", 
        function() { 
            gamestate.setByName("game")
            init()
        }, 
        vec2(100, 50)
    )
    buttons.add(
        "Settings", 
        function() { 
            gamestate.setByName("settings")
            init()
        }, 
        vec2(100, 50)
    )
    buttons.add(
        "Creditos", 
        function() { 
            gamestate.setByName("creditos")
            init()
        }, 
        vec2(100, 50)
    )
}


buttons.add(
    "back to menu", 
    function() { 
        gamestate.setByName("menu")
        init()
    }, 
    vec2(100, 50)
)

function settingsinit(){
    buttons.add(
        "back to menu", 
        function() { 
            gamestate.setByName("menu")
            init()
        }, 
        vec2(100, 50)
    )
}
function creditoinit(){
    buttons.add(
        "back to menu", 
        function() { 
            gamestate.setByName("menu")
            init()
        }, 
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
        creditoinit()
    } else if (gamestate.get() == "settings") {
        settingsinit()
    } else gamestate.setByName("menu")
}


export default init;