let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    hideStartscreen();
}

function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('play-button').classList.add('d-none');
    document.getElementById('explanation-container').classList.add('d-none');
    document.getElementById('exit-icon').classList.remove('d-none');
}

function exitGame() {
    window.location.reload();
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});