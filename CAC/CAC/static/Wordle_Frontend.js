let games_box = document.getElementById("individual_games_box_open");

let correct_library = ['O','O','X','X','L','L'];

let global_guess_library = [];

function open_box(){
    games_box.classList.toggle("individual_games_boxes_open");
}

let wordle_box_open = document.getElementById("wordle_game_box_unknown");

let inputContainer = document.getElementById('input_container');

//fetching all the significant data 

let actual_library = "";
let num_boxes = 6;

function createInputRow() {
    const row = document.createElement("div");
    row.className = 'horizontal_display';
    row.id = 'input_container';

    for (let i = 0; i < num_boxes; i++) {
        const box = document.createElement("div");
        const input = document.createElement("input");
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'input_letter_box letter_input';
        box.appendChild(input);
        row.appendChild(box);
    }
    const creatingEnterBox = createEnterBox();
    inputContainer.appendChild(row);
    inputContainer.appendChild(creatingEnterBox);

    return row;
}

function createEnterBox() {
    const enterBox = document.createElement("div");
    enterBox.className = 'enter_box';

    const enterText = document.createElement("p");
    enterText.className = 'enter_text';
    enterText.textContent = 'Enter';

    enterBox.appendChild(enterText);

    const createDisplayBox = document.createElement("div");
    createDisplayBox.className = 'horizontal_display';
    
    enterBox.addEventListener('click', function () {
        let inputValues = []
        let inputBoxes = document.querySelectorAll('.letter_input');
        inputBoxes.forEach(function (inputBox) {
            inputValues.push(inputBox.value);
        });
        
        fetch('/Acquiring_Guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({inputValues: inputValues}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.inputValues);
        })

        const newContainer = document.createElement("div");
        newContainer.className = 'horizontal_display'; // Make them appear horizontally
       
        // Create a new input row along with a new "Enter" box
        const newRow = createInputRow();

        const creatingEnterBox2 = createEnterBox();


        // Append the new row and new "Enter" box to the new container
        newContainer.appendChild(newRow);
        newContainer.appendChild(creatingEnterBox2);

        for (let i=0; i<correct_library.length; i++){
            if (correct_library[i]=='O'){
                const createIndividualBox = document.createElement("div");
                createIndividualBox.className = 'correct_box';
                createDisplayBox.appendChild(createIndividualBox);
            }
            if (correct_library[i]=='L'){
                const createIndividualBox = document.createElement("div");
                createIndividualBox.className = 'partial_correct_box';
                createDisplayBox.appendChild(createIndividualBox);
            }
            if (correct_library[i]=='X'){
                const createIndividualBox = document.createElement("div");
                createIndividualBox.className = 'incorrect_box';
                createDisplayBox.appendChild(createIndividualBox);
            }
        }

        wordle_box_open.appendChild(createDisplayBox);
        wordle_box_open.appendChild(newContainer);
        wordle_box_open.appendChild(creatingEnterBox2);

    });

    return enterBox;
}

function wordle_open() {
    inputContainer.innerHTML = '';

    fetch("/get_library_definition")
        .then(response => response.json())
        .then(data => {
            const libraryDefinition = data.library_definition;
            const library = data.library;
            const libraryLen = data.library_length;
            num_boxes = libraryLen;
            actual_library = library;
            new_library_box = libraryLen;
            const libraryDefinitionPlaceholder = document.getElementById("library_definition_placeholder");
            libraryDefinitionPlaceholder.textContent = libraryDefinition+". The length of this library is "+libraryLen+". The library is "+library;

            for (let i = 0; i < num_boxes; i++) {
                const box = document.createElement("div");
                const input = document.createElement("input");
                input.type = 'text';
                input.maxLength = 1;
                input.className = 'input_letter_box letter_input';
                box.appendChild(input);
                inputContainer.appendChild(box);
            }
    })
        .catch(error => console.error("Error fetching library definition:", error));

    // Create the initial set of input boxes

    const initialEnterBox = createEnterBox(num_boxes);
    wordle_box_open.appendChild(initialEnterBox);
    wordle_box_open.classList.toggle("wordle_game_box_hidden");
}

