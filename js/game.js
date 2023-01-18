let canvas;
let world;
let keyboard = new Keyboard();
let muteAudio = false;
soundtrack = new Audio('audio/soundtrack.mp3');
soundtrack.volume = 0.3
soundtrack.loop = true;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    this.soundtrack.play();

    hideStartscreen();
    setMobileBtns();
}

function hideStartscreen() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('play-button').classList.add('d-none');
    document.getElementById('explanation-container').classList.add('d-none');
    document.getElementById('exit-icon').classList.remove('d-none');
    document.getElementById('fullscreen-btn').classList.remove('d-none');
}

function turnSoundOff() {
    muteAudio = true;
    if (muteAudio) {
        this.soundtrack.muted = true;
        document.getElementById('speaker-muted').classList.remove('d-none');
        document.getElementById('speaker-icon').classList.add('d-none');
    }
}

function turnSoundOn() {
    muteAudio = false;
    if (!muteAudio) {
        this.soundtrack.muted = false;
        document.getElementById('speaker-muted').classList.add('d-none');
        document.getElementById('speaker-icon').classList.remove('d-none');
    }
}

function exitGame() {
    window.location.reload();
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    showCanvasInFull();
    removeBtns();
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function showCanvasInFull() {
    let fullscreenCont = document.getElementById('canvas');
    fullscreenCont.style.width = '100%';
}

function removeBtns() {
        document.getElementById('exit-icon').classList.add('d-none');
        document.getElementById('fullscreen-btn').classList.add('d-none');
        if (window.innerWidth < 992) {
            document.getElementById('close-fullscreen-btn').classList.remove('d-none');
        }
}

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        showBtns();
    }
}

function showBtns() {
        document.getElementById('exit-icon').classList.remove('d-none');
        document.getElementById('fullscreen-btn').classList.remove('d-none');
        document.getElementById('close-fullscreen-btn').classList.add('d-none');
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

/*----------Control buttons for Smartphones----------*/

function setMobileBtns() {
    setBtnRight();
    setBtnLeft();
    setBtnJump();
    setBtnThrow();
}

function setBtnRight() {
    document.getElementById('move-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('move-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

function setBtnLeft() {
    document.getElementById('move-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('move-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}

function setBtnJump() {
    document.getElementById('jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

function setBtnThrow() {
    document.getElementById('throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}