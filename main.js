img="";
status="";
objects=[];

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    object_detector=ml5.objectDetector('cocossd',model_loaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function model_loaded(){
    console.log('model_loaded');
    status=true;
}

function got_results(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,380,380);
    
    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);

        object_detector.detect(video,got_results);
    }
       
    if(objects[i].label == "person"){
        document.getElementById("status").innerHTML="Status : Object detected!";
        fill(r,g,b);
            percentage=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    }
    else{
        sound.play("sound.wav");
    }
}
