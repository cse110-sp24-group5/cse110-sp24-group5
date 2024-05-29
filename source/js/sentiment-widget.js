
window.addEventListener('DOMContentLoaded', init);
    // Corrected selector

function init(){
    const sentimentSlider = document.querySelector('#sentiment');
    const faceIcon = document.querySelector('#sentiment-widget img');
    document.querySelector('#name');

    function recordSentiment(value) {
        const timestamp = new Date().toISOString(); // Generate timestamp
        const sentimentEntry = { timestamp, value };
        // Store sentiment entry in local storage
        const sentimentData = JSON.parse(localStorage.getItem('sentimentData')) || [];
        sentimentData.push(sentimentEntry);
        localStorage.setItem('sentimentData', JSON.stringify(sentimentData));
    }

     // Function to update the face icon based on the slider value
     function updateFaceIcon(value) {
        value = parseInt(value);
        console.log("Slider value:", value); 
        if (value <= 33) {
            faceIcon.src = "../img/sad_face.png"; // Directly set the src attribute
        } else if (value <= 67) {
            faceIcon.src = "../img/middle.svg"; // Directly set the src attribute
        } else {
            faceIcon.src = "../img/end.svg"; // Directly set the src attribute
        }
    }

    // Initial face icon update
    updateFaceIcon(sentimentSlider.value);

    // Add event listener to the slider
    sentimentSlider.addEventListener('input', () => {
        const mood = sentimentSlider.value;
        updateFaceIcon(mood);
        recordSentiment(mood); 
    });

    let userName = localStorage.getItem("userName");
    //if userName has not yet been entered
    if(!userName) {
        //prompt the user for their name and if they hti cancel then make userName an empty string
        userName = prompt("Please enter your name:") || "";
        // Save the name in local storage for future use
        localStorage.setItem("userName", userName);
    }
    
    //if and else statements for correct spacing between greeting and ! or greeting and the name depending on if name has been entered or not
    if(userName) {
        document.querySelector('#name').textContent = " " + userName + "!";
    }
    else{
        document.querySelector('#name').textContent = userName + "!";
    }
}
