let video, classifier;
let label = "waiting...";
let modelURL = 'https://teachablemachine.withgoogle.com/models/emNfFayJ/';
let modelBucket = 'https://storage.googleapis.com/tm-model/emNfFayJ/';
let modelFolder = 'assets/models/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelBucket + 'model.json');
}

function setup() {
  createCanvas(screen.availWidth, screen.availHeight - 100);

  let options = {
    audio: false,
    video: {
      facingMode: 'environment'
    }
  }

  // Create the video
  video = createCapture(options);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0, screen.availWidth, screen.availHeight - 100);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}
