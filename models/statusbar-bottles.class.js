class StatusbarBottles extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    bottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 55;
        this.y = 45;
        this.width = 180;
        this.height = 50;
        this.setBottles(0);
    }

    setBottles(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottles >= 9) {
            return 5
        } else if (this.bottles > 6) {
            return 4
        } else if (this.bottles > 4) {
            return 3
        } else if (this.bottles > 2) {
            return 2
        } else if (this.bottles > 0) {
            return 1
        } else {
            return 0
        }
    }
}