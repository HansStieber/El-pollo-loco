class World {
    canvas;
    paused = false;
    keyboard;
    character = new Character();
    level = level1;
    ctx;
    camera_x = 0;
    statusBarHealth = new StatusbarHealth();
    statusBarBottles = new StatusbarBottles();
    statusBarCoins = new StatusbarCoins();
    statusBarEndboss = new StatusbarEndboss();
    endboss = new Endboss();
    energyEndboss = 100;
    throwableObjects = [];
    totalCoins = 0;
    totalBottles = 0;
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    chicken_sound = new Audio('audio/chicken.mp3');
    endboss_sound = new Audio('audio/endboss.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        if (this.paused == false) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawCloudsAndBackground();
            this.drawStatusBars();
            this.drawObjectsCharacterEndboss();
            //Draw wird immer wieder aufgerufen
            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }


    drawCloudsAndBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    drawStatusBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);
    }


    drawObjectsCharacterEndboss() {
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 50);
        setInterval(() => {
            this.checkCollisionsThrownBottles()
        }, 400);
        setInterval(() => {
            this.checkThrowObjects();
        }, 100);
        setInterval(() => {
            this.checkCollisionEnemy();
            this.checkCollisionEndboss();
        }, 200);
    }


    checkCollisions() {
        this.checkJumpOnEnemies();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
        this.checkCollisionBottle();
    }


    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.speed !== 0) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }


    checkCollisionEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }


    checkCollisionCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                if (!muteAudio) {
                    this.coin_sound.volume = 0.3;
                    this.coin_sound.play();
                }
                this.totalCoins++;
                this.level.coins.splice(index, 1);
                this.statusBarCoins.setCoins(this.totalCoins);
            }
        });
    }


    checkCollisionBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (!muteAudio) {
                    this.bottle_sound.play();
                }
                this.totalBottles++;
                this.level.bottles.splice(index, 1);
                this.statusBarBottles.setBottles(this.totalBottles);
            }
        });
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.totalBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.totalBottles--;
            this.statusBarBottles.setBottles(this.totalBottles);
        }
    }


    checkJumpOnEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) &&
                this.character.isAboveGround() &&
                this.character.speedY < 0) {
                if (!muteAudio) {
                    this.chicken_sound.volume = 0.3;
                    this.chicken_sound.play();
                }
                this.character.killEnemie(index);
            }
        });
    }


    checkCollisionsThrownBottles() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.endboss.isColliding(bottle)) {
                if (!muteAudio) {
                    this.endboss_sound.volume = 0.3;
                    this.endboss_sound.play();
                }
                this.updateEnergyEndboss();
                setTimeout(() => {
                    this.throwableObjects.splice(index, 1);
                }, 150);
            }
        });
    }


    updateEnergyEndboss() {
        this.energyEndboss -= 20;
        this.endboss.speed += 0.6;
        this.statusBarEndboss.setPercentage(this.energyEndboss);
        if (this.energyEndboss <= 0) {
            this.energyEndboss = 0;
            this.endboss.speed = 0;
        }
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}