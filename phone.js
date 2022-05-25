img = "";
status = "";
objectdetector = "";
objects = [];
function preload() {
    img = loadImage('https://media.istockphoto.com/photos/mobile-phone-top-view-with-white-screen-picture-id1161116588?k=20&m=1161116588&s=612x612&w=0&h=NKv_O5xQecCHZic53onobxjqGfW7I-D-tBrzXaPbj_Q=')
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center()
    objectdetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "status: detecting objects"
}

function modelLoaded() {
    console.log("Model is Loaded")
    status = true;
    objectdetector.detect(img, gotResult)
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
} 

function draw() {
    image(img, 0, 0, 640, 420);
    if (status!="") {
        for (let index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML = "status: object is detected";
            fill("red");
            percent = floor(objects[index].confidence*100);
            text(objects[index].label+" "+percent+"%", objects[index].x, objects[index].y);
            noFill()
            stroke("red")
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);

            
        }
    }
}