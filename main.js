prediction_1 = "";
prediction_2 = "";

Webcam.set({
width : 250,
height : 250,
image_format : 'png',
png_quality : 100,
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {

    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>';
    });

}

console.log(ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/03DPItsMq/model.json', modelLoaded);

function modelLoaded() {

    console.log("ml5 is loaded");

}

function speak() {

    var synth = window.speechSynthesis;
    data1 = "The first prediction is "+prediction_1;
    data2 = "The second prediction is "+prediction_2;
    var utter_this = new SpeechSynthesisUtterance(data1+data2);
    synth.speak(utter_this);

}

function CHECK() {

    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);

}

function gotResult(error, results) {

    if (error) {

        console.error(error);

    }
    else {

        console.log(results);

        document.getElementById("result1").innerHTML=results[0].label;
        document.getElementById("result2").innerHTML=results[1].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

    }

}