class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor(img, x) {
        super().loadImage(img);

        this.x = x + Math.random() * 500;

        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}