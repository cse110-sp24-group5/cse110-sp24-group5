
window.addEventListener('DOMContentLoaded', init);
    // Corrected selector

function init(){
    const sentimentSlider = document.querySelector('#sentiment');
    const faceIcon = document.querySelector('#sentiment-widget img');
    document.querySelector('#name');

    function recordSentiment(value) {
        const now = new Date();

        // Format the date and time as a local string
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const localTimestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        //const timestamp = new Date().toISOString(); // Generate timestamp
        console.log('Local Timestamp:', localTimestamp);
        const sentimentEntry = { localTimestamp, value };
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

    // Add event listener to the slider
    sentimentSlider.addEventListener('input', () => {
        const mood = sentimentSlider.value;
        localStorage.setItem('savedMood', mood);
        updateFaceIcon(mood);
        recordSentiment(mood); 
    });

    const savedMood = localStorage.getItem('savedMood');
    if(savedMood) {
        sentimentSlider.value = parseInt(savedMood);
        updateFaceIcon(savedMood);
    }

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
