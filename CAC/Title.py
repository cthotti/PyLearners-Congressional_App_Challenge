from flask import Flask, render_template, jsonify, request
import pandas as pd
import random
import json
from datetime import datetime
from collections import deque

app = Flask(__name__)

#global values:
library = "j"
library_definition =""
length_of_library = 0

#Opening Files
@app.route('/')
def Title():
    return render_template("Title.html", static_folder = 'static', template_folder = 'templates')

@app.route('/open_Wordle_Game', methods=['GET'])
def open_Wordle_Game():
    return render_template('Wordle_Frontend.html', static_folder='static', template_folder='templates')

@app.route('/open_Guessing_Function', methods=['GET'])
def open_Guessing_Function():
    return render_template('Guessing_Function.html', static_folder='static', template_folder='templates')

@app.route('/open_Project_Dispenser', methods=['GET'])
def open_Project_Dispenser():
    return render_template('Project_Dispenser.html', static_folder='static', template_folder='templates')

@app.route('/open_Home_Page', methods=['GET'])
def open_Home_Page():
    return render_template('Title.html', static_folder='static', template_folder='templates')


##########

###### Project Dispenser Game


@app.route('/output_difficulty1', methods=['GET'])
def output_difficulty1():
    df = pd.read_csv('Projects_1.csv')
    random_index = random.randint(0,len(df['Project'])-1)
    project = df.loc[random_index]['Project']
    project_description = df.loc[random_index]['Project Description']
    length_of_project = len(project)
    project_info = []
    project_info.append(project)
    project_info.append(project_description)
    return jsonify({'inputValue': project_info})


@app.route('/output_difficulty2', methods=['GET'])
def output_difficulty2():
    df = pd.read_csv('Projects_2.csv')
    random_index = random.randint(0,len(df['Project'])-1)
    project = df.loc[random_index]['Project']
    project_description = df.loc[random_index]['Project Description']
    length_of_project = len(project)
    project_info = []
    project_info.append(project)
    project_info.append(project_description)
    return jsonify({'inputValue': project_info})

@app.route('/output_difficulty3', methods=['GET'])
def output_difficulty3():
    df = pd.read_csv('Projects_3.csv')
    random_index = random.randint(0,len(df['Project'])-1)
    project = df.loc[random_index]['Project']
    project_description = df.loc[random_index]['Project Description']
    length_of_project = len(project)
    project_info = []
    project_info.append(project)
    project_info.append(project_description)
    return jsonify({'inputValue': project_info})

###### Guessing Function Game
day0 = datetime(2023, 10, 12)
attempts=0
daycurrent = None
day = None
test_cases = None
jsondata = None
target_func = None

@app.route('/variable_initialize', methods=['GET'])
def variable_initialize():
    global daycurrent
    global day
    global test_cases
    global target_func
    global jsondata

    with open('daily_functions.json') as f:
        rawjson = f.read()
        jsondata = json.loads(rawjson)

    daycurrent = datetime.now()
    day = ((daycurrent - day0).days) % len(jsondata)
    test_cases = jsondata[day]['test_cases']
    local_vars = {}
    exec(jsondata[day]['function'], globals(), local_vars)
    target_func = local_vars['target_func']

    return "Function Executed"

def sidebar(x):
    try:
        return target_func(json.loads(x))
    except Exception as e:
        return str(e)

@app.route('/inputting_x_values', methods=['POST'])
def inptting_x_values():
    input_data = request.get_json()
    input_values = input_data.get('inputValue', [])
    new_value = sidebar(input_values)
    return jsonify({'inputValue': new_value})

@app.route('/guessfunction', methods=['POST'])
def guessfunction():
    input_data = request.get_json()
    input_values = input_data.get('inputValue', [])
    
    global attempts
    
    test_code = input_values

    try:  # in case there are errors in the actual code in test_code
        local_func={} # establishes a separate local namespace to put 'test_func' into because python is looking at the local scope of guess_function()
        exec(test_code, globals(), local_func) # STORES test_func from test_code IN THE LOCAL_VARS
        if 'test_func' in local_func:  # checks that the user defined their function as test_func
            total_correct = 0
            test_func = local_func['test_func'] # creates function test_func as the test_func from local vars
            for i in test_cases:  # compares each test case with the target_func and test_func
                if target_func(i) == test_func(i):
                    total_correct += 1
            percent_correct = int(total_correct * 100 / len(test_cases))  # % correct on the test cases
            attempts += 1
            return jsonify({'inputValue': percent_correct})
        else:
            return jsonify({'inputValue': 'Name your function as test_func(x)'})
    except Exception as e:  # catches any exceptions while running test_code
        return jsonify({'inputValue': str(e)})







####### Wordle Game
@app.route('/get_library_definition', methods=['GET'])
def get_library_definition():
    library_info = Getting_Dictionary()
    return jsonify({
        'library_definition': library_info[0], 
        'library': library_info[1],
        'library_length':library_info[2]
        })

def Getting_Dictionary():
    df = pd.read_csv('Library_Definitions.csv')
    random_index = random.randint(0,len(df['Library'])-1)
    global library
    library = df.loc[random_index]['Library']
    library_definition = df.loc[random_index]['Question']
    global length_of_library
    length_of_library = len(library)
    library_info = []
    library_info.append(library_definition)
    library_info.append(library)
    library_info.append(length_of_library)
    return library_info

def Checking_Correct_Letters(guessing_library,library, library_length):
    History_Checking = []
    words_in_library = []
    guessing_library = guessing_library[-library_length:]
    [words_in_library.append(i) for i in library]
    index = []
    [index.append(i) for i in range(0,len(library))]
    for i in range(0,len(library)):
        if library[i] == guessing_library[i]:
            History_Checking.append("O")
        elif guessing_library[i] in words_in_library:
            History_Checking.append("L")
        else:
            History_Checking.append("X")
    return History_Checking


@app.route('/Acquiring_Guess', methods=['POST'])
def Acquiring_Guess():
    input_data = request.get_json()
    input_values = input_data.get('inputValues', [])
    Checked_value = Checking_Correct_Letters(input_values, library, length_of_library)
    return jsonify({'inputValues': Checked_value})



if __name__ == "__main__":
    app.run(debug=True) 

