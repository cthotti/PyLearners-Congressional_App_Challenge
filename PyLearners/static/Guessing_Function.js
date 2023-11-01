//Frontend Code

let games_box = document.getElementById("individual_games_box_open");

function open_box(){
    games_box.classList.toggle("individual_games_boxes_open");
}

let how_to_play_box = document.getElementById("how_to_play_box");

function close_how_play_box(){
    how_to_play_box.classList.toggle("how_to_play_content_hidden");
}

function open_Wordle_Game(){
    
    fetch('/open_Wordle_Game').then(() => {
        window.location.href = '/open_Wordle_Game';
    });

}

function open_Guessing_Function(){
    
    fetch('/open_Guessing_Function').then(() => {
        window.location.href = '/open_Guessing_Function';
    });

}

function open_Project_Dispenser(){
    
    fetch('/open_Project_Dispenser').then(() => {
        window.location.href = '/open_Project_Dispenser';
    });

}

function open_Home_Page(){
    
    fetch('/open_Home_Page').then(() => {
        window.location.href = '/open_Home_Page';
    });

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

const inputX2 = document.getElementById("input_x2");
inputX2.addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        const inputValue = inputX2.value;
        const displayInput = document.createElement("div");
        displayInput.textContent = inputValue; 
        displayInput.style.fontSize = "50px";
        displayInput.style.textAlign = "center";
        inputting_x2(inputValue);
        inputX2.parentNode.replaceChild(displayInput, inputX2);
    }
});

const inputX3 = document.getElementById("input_x3");
inputX3.addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        const inputValue = inputX3.value;
        const displayInput = document.createElement("div");
        displayInput.textContent = inputValue; 
        displayInput.style.fontSize = "50px";
        displayInput.style.textAlign = "center";
        inputting_x3(inputValue);
        inputX3.parentNode.replaceChild(displayInput, inputX3);
    }
});

const inputX4 = document.getElementById("input_x4");
inputX4.addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        const inputValue = inputX4.value;
        const displayInput = document.createElement("div");
        displayInput.textContent = inputValue; 
        displayInput.style.fontSize = "50px";
        displayInput.style.textAlign = "center";
        inputting_x4(inputValue);
        inputX4.parentNode.replaceChild(displayInput, inputX4);
    }
});

const inputX5 = document.getElementById("input_x5");
inputX5.addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        const inputValue = inputX5.value;
        const displayInput = document.createElement("div");
        displayInput.textContent = inputValue; 
        displayInput.style.fontSize = "50px";
        displayInput.style.textAlign = "center";
        inputting_x5(inputValue);
        inputX5.parentNode.replaceChild(displayInput, inputX5);
    }
});

const inputX6 = document.getElementById("input_x6");
inputX6.addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        const inputValue = inputX6.value;
        const displayInput = document.createElement("div");
        displayInput.textContent = inputValue; 
        displayInput.style.fontSize = "50px";
        displayInput.style.textAlign = "center";
        inputting_x6(inputValue);
        inputX6.parentNode.replaceChild(displayInput, inputX6);
    }
});

let sending_output = document.getElementById("sending_output");

function user_code(){
    sending_output.innerHTML = '';
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
        let value = data.inputValue; 
        const OutputContainer = document.createElement("div");
        OutputContainer.className = "horizontal_display";

        const literalOutput = document.createElement("p");
        literalOutput.textContent = "Output";
        literalOutput.className = "output_words";
        sending_output.appendChild(literalOutput);

        if (typeof value == 'number'){

            let modValue = value / 20;
            let roundedValue = Math.round(modValue); 
            let incorrectValue = 5-roundedValue;
            let initial = true;
            for (let i=0; i < roundedValue; i++){
                const testcasesText = document.createElement("p");
                if (initial){
                    testcasesText.textContent = "Test Cases: "+roundedValue+"/5";
                    testcasesText.className = "testcasesclass";
                    sending_output.appendChild(testcasesText);
                    initial = false;
                }
                const CorrectBox = document.createElement("div");
                CorrectBox.className = "correct_box";
                OutputContainer.appendChild(CorrectBox);
            }
            for (let i=0; i < incorrectValue; i++){
                const testcasesText = document.createElement("p");
                if (initial){
                    testcasesText.textContent = "Test Cases: "+roundedValue+"/5"
                    testcasesText.className = "testcasesclass";
                    sending_output.appendChild(testcasesText);
                    initial = false;
                }
                const CorrectBox = document.createElement("div");
                CorrectBox.className = "incorrect_box";
                OutputContainer.appendChild(CorrectBox);
            }
            sending_output.appendChild(OutputContainer);
            
        }
        else{
            const ErrorMessage = document.createElement("p");
            ErrorMessage.textContent = "Error:";
            ErrorMessage.className = "ErrorOutputClass";
            
            const ErrorDisplay = document.createElement("p");
            ErrorDisplay.textContent = value;
            //ErrorDisplay.className = "ErrorOutputClass";
            sending_output.appendChild(ErrorMessage);
            sending_output.appendChild(ErrorDisplay);

        }
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
        const numOutput = document.createElement("p");
        numOutput.className = "numOutput";
        numOutput.textContent = data.inputValue;
        outputX1.appendChild(numOutput);
    })
}

let outputX2 = document.getElementById("output_x2");

function inputting_x2(inputValue){
    fetch('/inputting_x_values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({inputValue: inputValue}),
    })
    .then(response => response.json())
    .then(data => {
        const numOutput = document.createElement("p");
        numOutput.className = "numOutput";
        numOutput.textContent = data.inputValue;
        outputX2.appendChild(numOutput);
    })
}

let outputX3 = document.getElementById("output_x3");

function inputting_x3(inputValue){
    fetch('/inputting_x_values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({inputValue: inputValue}),
    })
    .then(response => response.json())
    .then(data => {
        const numOutput = document.createElement("p");
        numOutput.className = "numOutput";
        numOutput.textContent = data.inputValue;
        outputX3.appendChild(numOutput);
    })
}

let outputX4 = document.getElementById("output_x4");

function inputting_x4(inputValue){
    fetch('/inputting_x_values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({inputValue: inputValue}),
    })
    .then(response => response.json())
    .then(data => {
        const numOutput = document.createElement("p");
        numOutput.className = "numOutput";
        numOutput.textContent = data.inputValue;
        outputX4.appendChild(numOutput);
    })
}

let outputX5 = document.getElementById("output_x5");

function inputting_x5(inputValue){
    fetch('/inputting_x_values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({inputValue: inputValue}),
    })
    .then(response => response.json())
    .then(data => {
        const numOutput = document.createElement("p");
        numOutput.className = "numOutput";
        numOutput.textContent = data.inputValue;
        outputX5.appendChild(numOutput);
    })
}

let outputX6 = document.getElementById("output_x6");

function inputting_x6(inputValue){
    fetch('/inputting_x_values', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({inputValue: inputValue}),
    })
    .then(response => response.json())
    .then(data => {
        const numOutput = document.createElement("p");
        numOutput.className = "numOutput";
        numOutput.textContent = data.inputValue;
        outputX6.appendChild(numOutput);
    })
}