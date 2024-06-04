
window.addEventListener('DOMContentLoaded', init);
    // Corrected selector

function init(){
    initializeServiceWorker();
    const sentimentSlider = document.querySelector('#sentiment');
    const faceIcon = document.querySelector('#sentiment-widget img');
    document.querySelector('#name');

    function initializeServiceWorker() {   
        //Check if 'serviceWorker' is supported in the current browser
        if('serviceWorker' in navigator) {
      
          // Listen for the 'load' event on the window object.
          window.addEventListener('load', function() {
            try {
              //Register './sw.js' as a service worker
              const registration = navigator.serviceWorker.register("../../sw.js", {
                scope: "./",
              });
      
              // Once the service worker has been successfully registered, console
              //  log that it was successful.
              if (registration.installing) {
                console.log("Service worker installing");
              } else if (registration.waiting) {
                console.log("Service worker installed");
              } else if (registration.active) {
                console.log("Service worker active");
              }
            } catch (error) {
      
              console.error(`Registration failed with ${error}`);
            }
          });
        }
      }


    function recordSentiment(value) {


        let currentDate = new Date();  
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
        let day = currentDate.getDate();
        let timestamp = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`; // Generate timestamp
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
        if (value <= 20) {
            faceIcon.src = "../img/angry_face.png"; // Directly set the src attribute
        } else if (value <= 40) {
            faceIcon.src = "../img/sad_face.png"; // Directly set the src attribute
        } else if(value <= 60){
            faceIcon.src = "../img/soso_face.png"; // Directly set the src attribute
        } else if(value <= 80){
            faceIcon.src = "../img/happy_face.png"; // Directly set the src attribute
        }else {
            faceIcon.src = "../img/laughing_face.png"; // Directly set the src attribute
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
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
        let day = currentDate.getDate();
        let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        localStorage.setItem(formattedDate, currentEmotionSrc);
    });

    let userName = localStorage.getItem("userName");
    //if userName has not yet been entered
    if(!userName) {
        //prompt the user for their name and if they hit cancel then make userName an empty string
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
