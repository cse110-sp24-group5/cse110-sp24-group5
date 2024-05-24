// changes emoji when user uses slider
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

});