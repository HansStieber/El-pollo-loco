class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;

        this.animate();
    }

    animate() {
        if (world.character.otherDirection) {
            this.throwLeft();
        } else {
            this.throwRight();
        }

        setInterval(() => {
            if(this.y < 350) {
            this.playAnimation(this.IMAGES_ROTATION);} else {
                this.playAnimation(this.IMAGES_SPLASH);
            }
            console.log(this.y);
        }, 50);

        setStoppableInterval(() => {
            world.throwableObjects.forEach((bottle) => {
                if (world.endboss.isColliding(bottle)) {
                    this.playAnimation(this.IMAGES_SPLASH);
                }
            });
        }, 10);
    }

    throwRight() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    throwLeft() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x -= 10;
        }, 25);
    }
}