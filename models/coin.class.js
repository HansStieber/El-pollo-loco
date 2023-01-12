class Coin extends StaticObject {
    height = 120;
    width = 120;

    constructor(path, y) {
        super().loadImage(path);

        this.x = 500 + Math.random() * 1700;
        this.y = y;
    }
}