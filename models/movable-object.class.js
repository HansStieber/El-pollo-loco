class MovableObject {
    x = 120;
    y = 125;
    img;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){
        console.log('moving right');
    }

    moveLeft(){
        
    }
}