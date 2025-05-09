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
    plat(vec2(0, 15), vec2(20, 3)) 
    plat(vec2(24, 13), vec2(5, 5))
    plat(vec2(29, 12), vec2(3, 6))
    plat(vec2(37, 8), vec2(3, 10))
    plat(vec2(43, 5), vec2(3, 13))
    plat(vec2(46, 8), vec2(2, 15))
    plat(vec2(-3, -100), vec2(3, 115))
    plat(vec2(5, -109), vec2(15, 115))
    plat(vec2(26, 4), vec2(4, 4)) 
    plat(vec2(20, -1), vec2(2, 2)) 
    plat(vec2(20, 1), vec2(6, 6)) 
    plat(vec2(28, -7), vec2(9, 6)) 
    plat(vec2(54, 12), vec2(3, 8))
    plat(vec2(69, 9), vec2(3, 6)) 
    plat(vec2(72, 5), vec2(6, 13)) 
    plat(vec2(57, 15), vec2(20, 6)) 

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