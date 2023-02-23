class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
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
            this.playAnimation(this.IMAGES_ROTATION);
        }, 50);
    }

    throwRight() {
        if (this.y > 200) {
            this.speedY = 20;
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);
        }
    }

    throwLeft() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x -= 10;
        }, 25);
    }
}