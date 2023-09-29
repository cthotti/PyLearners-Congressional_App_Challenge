let games_box = document.getElementById("individual_games_box_open");

let correct_library = ['O','O','X','X','L','L'];

let global_guess_library = [];

function open_box(){
    games_box.classList.toggle("individual_games_boxes_open");
}

let wordle_box_open = document.getElementById("wordle_game_box_unknown");

let enterButton = document.getElementById('box_button');

let inputContainer = document.getElementById('input_container');

function createInputRow() {
    const row = document.createElement("div");
    row.className = 'horizontal_display';
    row.id = 'input_container';

    for (let i = 0; i < 6; i++) {
        const box = document.createElement("div");
        const input = document.createElement("input");
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'input_letter_box letter_input';
        box.appendChild(input);
        row.appendChild(box);
        inputContainer.appendChild(row);
    }

    const initialEnterBox = createEnterBox();
    wordle_box_open.appendChild(initialEnterBox);


    return row;
}

function createEnterBox() {
    const enterBox = document.createElement("div");
    enterBox.className = 'enter_box';
    enterBox.id = 'box_button';

    const enterText = document.createElement("p");
    enterText.className = 'enter_text';
    enterText.textContent = 'Enter';

    enterBox.appendChild(enterText);
    
    let inputValues = []
    
    enterBox.addEventListener('click', function () {
        let inputBoxes = document.querySelectorAll('.letter_input');
        inputBoxes.forEach(function (inputBox) {
            inputValues.push(inputBox.value);
        });
        // Now you can work with the inputValues array as needed.

        // Create a new container for the new input row and "Enter" box

        const newContainer = document.createElement("div");
        newContainer.className = 'horizontal_display'; // Make them appear horizontally
       
        // Create a new input row along with a new "Enter" box
        const newRow = createInputRow();
        const newEnterBox = createEnterBox();


        // Append the new row and new "Enter" box to the new container
        newContainer.appendChild(newRow);
        newContainer.appendChild(newEnterBox);

        wordle_box_open.appendChild(newContainer);


    });

    for (let i=0; i<inputValues.length; i++){
        console.log(inputValues[i])
    }

    return enterBox;
}

function wordle_open() {
    inputContainer.innerHTML = '';

    // Create the initial set of input boxes
    for (let i = 0; i < 6; i++) {
        const box = document.createElement("div");
        const input = document.createElement("input");
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'input_letter_box letter_input';
        box.appendChild(input);
        inputContainer.appendChild(box);
    }

    const initialEnterBox = createEnterBox();
    wordle_box_open.appendChild(initialEnterBox);
    wordle_box_open.classList.toggle("wordle_game_box_hidden");
}

