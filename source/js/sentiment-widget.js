/*// changes emoji when user uses slider
let currentSentiment = document.querySelector('.sentiment');
currentSentiment.addEventListener("change", (event) => {
    let current = event.target.value;

    // sad emoji
    if((current >= 0) || (current <= 33)){

    }
    // neutral emoji
    else if ((current >= 34) || (current <= 67)){

    }
    // happy emoji
    else{

    }

});*/

document.addEventListener('DOMContentLoaded', () => {
    const sentimentSlider = document.getElementById('sentiment');
  
    sentimentSlider.addEventListener('input', () => {
      const value = sentimentSlider.value;
      console.log("Value:", value);
      updateSliderThumb(value);
    });
    
    // Function to update the CSS variable based on slider value
    function updateSliderThumb(value) {
      document.documentElement.style.setProperty('--emoji1', value <= 33 ? 'url(\'../img/Group 8.svg\')' : 'none');
      document.documentElement.style.setProperty('--emoji2', (value > 33 && value <= 66) ? 'url(\'../img/Group 10.svg\')' : 'none');
      document.documentElement.style.setProperty('--emoji3', value > 66 ? 'url(\'../img/Group 10.svg\')' : 'none');
    }
    
    // Initial update
    sentimentSlider.dispatchEvent(new Event('input'));
  });