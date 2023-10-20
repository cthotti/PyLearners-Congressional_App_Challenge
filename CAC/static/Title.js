let games_box = document.getElementById("individual_games_box_open");

function open_box(){
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