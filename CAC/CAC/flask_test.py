from flask import Flask, render_template, jsonify, request
import pandas as pd
import random

app = Flask(__name__)

#global values:
library = ""
library_definition =""
length_of_library = 0


@app.route('/')
def Wordle_Frontend():
    return render_template("Wordle_Frontend.html", static_folder = 'static', template_folder = 'templates')

@app.route('/get_library_definition', methods=['GET'])
def get_library_definition():
    library_info = Getting_Dictionary()
    return jsonify({
        'library_definition': library_info[0], 
        'library': library_info[1],
        'library_length':library_info[2]
        })

def Getting_Dictionary():
    df = pd.read_csv('/Users/chetant/VSCode/CAC/Library_Definitions.csv')
    random_index = random.randint(0,len(df['Library'])-1)
    library = df.loc[random_index]['Library']
    library_definition = df.loc[random_index]['Question']
    length_of_library = len(library)
    library_info = []
    library_info.append(library_definition)
    library_info.append(library)
    library_info.append(length_of_library)
    return library_info

@app.route('/Acquiring_Guess', methods=['POST'])
def Acquiring_Guess():
    input_data = request.get_json()
    input_values = input_data.get('inputValues', [])
    return jsonify({'inputValues': input_values})




if __name__ == "__main__":
    app.run(debug=True) 

