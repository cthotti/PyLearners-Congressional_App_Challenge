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

function open_Home_Page(){
    
    fetch('/open_Home_Page').then(() => {
        window.location.href = '/open_Home_Page';
    });

}

// Code for backend 

let project_display = document.getElementById("project_display");

function output_difficulty1(){
    fetch("/output_difficulty1")
        .then(response => response.json())
        .then(data => {
            let project_word = data.inputValue[0];
            let project_description_word = data.inputValue[1];
            project_display.innerHTML = '';
            const project = document.createElement("p");
            project.className = "project_word";
            project.innerText = "Create "+project_word;
            const project_description = document.createElement("p");
            project_description.className = "project_description_word";
            project_description.innerHTML = "Task: "+project_description_word;
            project_display.appendChild(project);
            project_display.appendChild(project_description);
    })
}

function output_difficulty2(){
    fetch("/output_difficulty2")
        .then(response => response.json())
        .then(data => {
            let project_word = data.inputValue[0];
            let project_description_word = data.inputValue[1];
            project_display.innerHTML = '';
            const project = document.createElement("p");
            project.className = "project_word";
            project.innerText = "Create "+project_word;
            const project_description = document.createElement("p");
            project_description.className = "project_description_word";
            project_description.innerHTML = "Task: "+project_description_word;
            project_display.appendChild(project);
            project_display.appendChild(project_description);
    })
}

function output_difficulty3(){
    fetch("/output_difficulty3")
        .then(response => response.json())
        .then(data => {
            let project_word = data.inputValue[0];
            let project_description_word = data.inputValue[1];
            project_display.innerHTML = '';
            const project = document.createElement("p");
            project.className = "project_word";
            project.innerText = "Create "+project_word;
            const project_description = document.createElement("p");
            project_description.className = "project_description_word";
            project_description.innerHTML = "Task: "+project_description_word;
            project_display.appendChild(project);
            project_display.appendChild(project_description);
    })
}