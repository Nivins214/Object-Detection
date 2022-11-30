img = "";
status_ = "";
_x = 0;
_y = 0;
objects = [];
function setup() {
    canvas = createCanvas(380.380);
    canvas.position(350, 180);
    //    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("result").innerHTML = "Status : Detecting Objects";
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

}
function modelLoaded() {
    console.log("Model Loaded!");
    status_ = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
//    console.log(objects.length);
}
function preload() {
    img = loadImage('dog_cat.jpg');
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").inerHTML = "Status : Detecting Objects"
}
function draw() {
//    img.resize(380, 380);
    image(video, 0, 0, 640, 420);
    if (status_ != "") {
        r = random(225);
        g = random(225);
        b = random(225);
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are : "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}