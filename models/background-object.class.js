class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    constructor(path, x, y) {
        super().loadImage(path);
        this.y = 480 - this.height;
        this.x = x;
    }
}