class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;

        if (world.character.otherDirection) {
            this.throwLeft();
        } else {
            this.throwRight();
        }
    }

    throwRight() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
                this.x += 10;
        }, 25);
    }

    throwLeft() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
                this.x -= 10;
        }, 25);
    }
}