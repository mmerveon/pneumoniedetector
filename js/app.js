const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

const LINK = "https://teachablemachine.withgoogle.com/models/dkX2vP48D/";

// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier(LINK + "model.json", modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
  fileButton.addEventListener("change", (event)=>loadFile(event))
  image.addEventListener('load', () => userImageUploaded())
}

function loadFile(event) {
	image.src = URL.createObjectURL(event.target.files[0])
}

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
    classifier.classify(document.getElementById('output'), (err, results) => {
        console.log(results);
        
        let label = results[0].label;
        console.log(label);

        let confidence = results[0].confidence;
        console.log(confidence);
   
        document.getElementById('confidence').innerHTML = "Uitkomst:" + label +  " " + Math.round(confidence*10000)/100 + "%";
    });
}
