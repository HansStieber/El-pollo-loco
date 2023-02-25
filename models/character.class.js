class Character extends MovableObject {
    y = 130;
    height = 300;
    width = 150;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png'
    ];
    world;
    walking_sound = new Audio('audio/steps.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurting_sound = new Audio('audio/hurt.mp3');
    dead_sound = new Audio('audio/dead.mp3');
    speed = 10;
    offset = {
        top: 100,
        left: 50,
        right: 50,
        bottom: 5,
    };

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    animate() {
        this.intervalFunction();
        this.intervalAnimations();
    }


    intervalFunction() {
        setInterval(() => {
            this.walking_sound.pause();
            this.playWalkingSoundWhenMovingLeft();
            this.playWalkingSoundWhenMovingRight();
            this.playJumpingSound();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }


    playWalkingSoundWhenMovingLeft() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (!this.isAboveGround() && !muteAudio) {
                this.walking_sound.play();
                this.walking_sound.playbackRate = 1.5;
            }
        }
    }


    playWalkingSoundWhenMovingRight() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (!this.isAboveGround() && !muteAudio) {
                this.walking_sound.play();
            }
        }
    }


    playJumpingSound() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            if (!muteAudio) {
                this.jumping_sound.play()
            }
        }
    }


    intervalAnimations() {
        this.animationLeftRight();
        this.animationJump();
        this.animationHurt();
        this.animationDead();
    }


    animationLeftRight() {
        setInterval(() => {
            if (!this.world.keyboard.RIGHT || !this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 350);
        setInterval(() => {
            if (this.world.keyboard.RIGHT && !this.isAboveGround() || this.world.keyboard.LEFT && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }


    animationJump() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 100);
    }


    animationHurt() {
        setInterval(() => {
            if (this.isHurt()) {
                console.log(this.energy)
                this.playAnimation(this.IMAGES_HURT);
                if (!muteAudio) {
                    this.hurting_sound.play();
                }
            }
        }, 200);
    }


    animationDead() {
        setInterval(() => {
            if (this.isDead() || this.x > this.world.endboss.x) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!muteAudio) {
                    this.dead_sound.loop = false;
                    this.dead_sound.volume = 0.3;
                    this.dead_sound.play();
                }
                setTimeout(() => {
                    this.showLostScreen();
                    }, 250);
            }
        }, 50);
    }

    
    showLostScreen() {
        document.getElementById('endscreen').classList.remove('d-none');
        document.getElementById('exit-icon').classList.add('d-none');
        document.getElementById('fullscreen-btn').classList.add('d-none');
        document.getElementById('back-button').classList.remove('d-none');
        muteAudio = true;
        this.world.paused = true;
    }
}