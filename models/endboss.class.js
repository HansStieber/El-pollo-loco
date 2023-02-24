class Endboss extends MovableObject {
    y = 120;
    height = 320;
    width = 240;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_EB_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_EB_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    offset = {
        top: 60,
        left: 40,
        right: 50,
        bottom: 10,
    };
    success = new Audio('audio/success.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_EB_DEAD);

        this.x = 2400;

        this.speed = 0.2;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (world.energyEndboss > 80) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                if (world.energyEndboss <= 80 && world.energyEndboss > 60) {
                    this.playAnimation(this.IMAGES_ALERT);
                } else {
                    if (world.energyEndboss <= 60 && world.energyEndboss > 0) {
                        this.playAnimation(this.IMAGES_ATTACK);
                    }
                    if (world.energyEndboss == 0) {
                        this.playAnimation(this.IMAGES_EB_DEAD);
                        if (!muteAudio) {
                            this.success.loop = false;
                            this.success.volume = 0.4;
                            this.success.play();
                        }
                        setTimeout(() => {
                        this.showGameOverScreen();
                        }, 500);
                    }
                }
            }
        }, 200);
    }

    showGameOverScreen() {
        document.getElementById('game-over').classList.remove('d-none');
        document.getElementById('exit-icon').classList.add('d-none');
        document.getElementById('fullscreen-btn').classList.add('d-none');
        document.getElementById('back-button').classList.remove('d-none');
        muteAudio = true;
        world.paused = true;
    }
}