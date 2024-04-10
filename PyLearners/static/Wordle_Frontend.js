let games_box = document.getElementById("individual_games_box_open");

function open_box(){
    console.log("function exectued");
    games_box.classList.toggle("individual_games_boxes_open");
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

let wordle_box_open = document.getElementById("wordle_game_box_unknown");

let inputContainer = document.getElementById('input_container');

//fetching all the significant data 

let actual_library = "";
let num_boxes = 6;
let index_num = 0;
let Lib_len = 0;
let Guess = 1;
let Correct_Answer = false;
let stop_displaying_enter = false;

function createInputRow() {
    if (Correct_Answer == true){
        play_again();
    }
    console.log(Guess);
    if ((Guess<Lib_len+1)){
        
        const row = document.createElement("div");
        row.className = 'horizontal_display';
        row.id = 'input_container';

        if (Guess<Lib_len){
            for (let i = 0; i < num_boxes; i++) {
                const box = document.createElement("div");
                const input = document.createElement("input");
                input.type = 'text';
                input.maxLength = 1;
                input.className = 'input_letter_box letter_input';
                box.appendChild(input);
                row.appendChild(box);
            }
            inputContainer.appendChild(row);
        }


        Guess += 1;
        return row;
    }
    else{
        stop_displaying_enter = true;
        play_again();
    }
}

function createEnterBox() {
    if (stop_displaying_enter==false){
        const enterBox = document.createElement("div");
        enterBox.className = 'enter_box';

        const enterText = document.createElement("p");
        enterText.className = 'enter_text';
        enterText.textContent = 'Enter';

        enterBox.appendChild(enterText);

        const createDisplayBox = document.createElement("div");
        createDisplayBox.className = 'horizontal_display';
        

        enterBox.addEventListener('click', function () {
            enterBox.style.display = 'none';
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

                let numCorrect = 0;

                for (let i=0; i<data.inputValues.length; i++){
                    if (data.inputValues[i]=='O'){
                        const createIndividualBox = document.createElement("div");
                        createIndividualBox.className = 'correct_box';
                        createDisplayBox.appendChild(createIndividualBox);
                        numCorrect +=1;
                    }
                    if (data.inputValues[i]=='L'){
                        const createIndividualBox = document.createElement("div");
                        createIndividualBox.className = 'partial_correct_box';
                        createDisplayBox.appendChild(createIndividualBox);
                    }
                    if (data.inputValues[i]=='X'){
                        const createIndividualBox = document.createElement("div");
                        createIndividualBox.className = 'incorrect_box';
                        createDisplayBox.appendChild(createIndividualBox);
                    }
                }

                if (Guess < Lib_len+1){
                    wordle_box_open.appendChild(createDisplayBox);
                }


                if (numCorrect == Lib_len){
                    console.log(numCorrect);
                    play_again();
                }
                else{
                    const newContainer = document.createElement("div");
                    newContainer.className = 'horizontal_display'; // Make them appear horizontally
        
                    const newRow = createInputRow();

                    const creatingEnterBox2 = createEnterBox();


                    // Append the new row and new "Enter" box to the new container
                    newContainer.appendChild(newRow);
                    newContainer.appendChild(creatingEnterBox2);

                    wordle_box_open.appendChild(newContainer);
                    wordle_box_open.appendChild(creatingEnterBox2);
                }
            })

        });

        return enterBox;
    }
}

function wordle_open() {
    inputContainer.innerHTML = '';
    index_num = 0;
    Guess = 1;

    fetch("/get_library_definition")
        .then(response => response.json())
        .then(data => {
            const libraryDefinition = data.library_definition;
            const library = data.library;
            const libraryLen = data.library_length;
            num_boxes = libraryLen;
            actual_library = library;
            new_library_box = libraryLen;
            Lib_len = libraryLen;
            const libraryDefinitionPlaceholder = document.getElementById("library_definition_placeholder");
            libraryDefinitionPlaceholder.textContent = libraryDefinition+" You have "+(libraryLen)+" guesses!";

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
}

function play_again(){
    const correct_answer = document.createElement("p");
    correct_answer.className = "correct_answer_display";
    correct_answer.textContent = "Correct Library: "+actual_library;
    const play_again_box = document.createElement("div");
    play_again_box.className = "play_again_box play_again_text";
    play_again_box.textContent = "Play Again";
    wordle_box_open.appendChild(correct_answer);
    wordle_box_open.appendChild(play_again_box);
    play_again_box.addEventListener('click', function () {
        location.reload();
    });

}
