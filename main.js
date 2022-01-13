prediction="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src="+data_uri+">";
    })
}

console.log("ml5 version:", ml5.version)

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8ss9_gkDR/.json', modelLoaded)
function modelLoaded(){
    console.log("modelLoaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The prediction is "+ prediction;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function predictGesture(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="OK"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[0].label=="Peace"){
            document.getElementById("update_emoji").innerHTML="&#9996;"
        }
        if(results[0].label=="Thumbs Up"){
            document.getElementById("update_emoji").innerHTML="&#128077;"
        }
        if(results[1].label=="OK"){
            document.getElementById("update_emoji2").innerHTML="&#128076;"
        }
        if(results[1].label=="Peace"){
            document.getElementById("update_emoji2").innerHTML="&#9996;"
        }
        if(results[1].label=="Thumbs Up"){
            document.getElementById("update_emoji2").innerHTML="&#128077;"
        }
    }
}



