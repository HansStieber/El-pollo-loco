class Bottle extends MovableObject {
    y = 340;
    height = 80;
    width = 80;

    constructor(path) {
        super().loadImage(path);

        this.x = 500 + Math.random() * 1700;
    }
}