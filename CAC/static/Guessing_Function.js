//Frontend Code

let games_box = document.getElementById("individual_games_box_open");

function open_box(){
    games_box.classList.toggle("individual_games_boxes_open");
}

let how_to_play_box = document.getElementById("how_to_play_box");

function close_how_play_box(){
    how_to_play_box.classList.toggle("how_to_play_content_hidden");
}

//Backend Code 

//Inputing x values
const inputX1 = document.getElementById("input_x1");
inputX1.addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        const inputValue = inputX1.value;
        const displayInput = document.createElement("div");
        displayInput.textContent = inputValue; 
        displayInput.style.fontSize = "50px";
        displayInput.style.textAlign = "center";
        inputting_x1(inputValue);
        inputX1.parentNode.replaceChild(displayInput, inputX1);
    }
});

function user_code(){
    let textarea = document.querySelector("textarea");
    let storedContent = '';
    storedContent = textarea.value;
    fetch('/guessfunction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({inputValue: storedContent}),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.inputValue);
    })
}

let outputX1 = document.getElementById("output_x1");

function inputting_x1(inputValue){
    fetch('/inputting_x_values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({inputValue: inputValue}),
    })
    .then(response => response.json())
    .then(data => {
        outputX1.textContent=data.inputValue;
    })
}