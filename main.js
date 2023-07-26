

function setup() { 
    canvas = createCanvas(280, 280);
    canvas.center(); 
    background("white"); 
    canvas.mouseReleased(classifyCanvas);
    synth = window.SpeechSynthesis
}

function preload() {


    classifier = ml5.imageClassifier('DoodleNet');
}



function clearCanvas() {

    background("white");
}

function draw() {

    //Defina strokeWeight como 13
    strokeWeight(13);
    //defina a cor de stroke como preto
    stroke(0);
    //Se o mouse for cliclado, desenhe uma linha entre a antiga e atual do mouse
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    var result = results[0].label;
    document.getElementById('label').innerHTML = 'Nome: ' + result.replace('_', ' ');


    document.getElementById('confidence').innerHTML = 'Precisão: ' + Math.round(results[0].confidance * 100) +'%';

    utterThis = new SpeechSynthesisUtterance(result.replace('_', ' '));
    synth.speak(utterThis);

}