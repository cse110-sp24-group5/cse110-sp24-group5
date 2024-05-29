
window.addEventListener('DOMContentLoaded', init);
    // Corrected selector

function init(){
    const sentimentSlider = document.querySelector('#sentiment');
    const faceIcon = document.querySelector('#sentiment-widget img');
    document.querySelector('#name');

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
    });

    // Store user's sentiment in localStorage
    document.querySelector('#sentiment').addEventListener('input', () => {
        let currentEmotionSrc = faceIcon.src;
        let currentDate = new Date();  
        let formattedDate = currentDate.toISOString().split('T')[0];
        localStorage.setItem(formattedDate, currentEmotionSrc);
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
