class SmallChicken extends MovableObject {
    y = 365;
    height = 50;
    width = 40;
    alive = true;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 500 + Math.random() * 1700;

        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    
    animate() {
        setInterval(() => {
        this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.alive == true) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            }
        }, 200);
    }
}