import pandas as pd
import random




df = pd.read_csv('/Users/cthotti/VS Code/CAC/Library_Definitions.csv')

random_index = random.randint(0,len(df['Library'])-1)

library = df.loc[random_index]['Library']
library_definition = df.loc[random_index]['Question']

guessing_library = (input(f"Guess Library With following Definition: \n {library_definition} \n")).lower()
index = []
[index.append(i) for i in range(0,len(library))]
reformating_guess = ""
for i in guessing_library:
    reformating_guess = reformating_guess + i + "       "
print(reformating_guess)

length_of_library = len(library)

History_of_guesses = []


History_Checking = []
for i in range(0,len(guessing_library)):
    both_library_values = [guessing_library[i],i]
    History_Checking.append(both_library_values)


Number_of_Guesses = len(library)-1

def History_Guesses(guessing_library):
    for i in guessing_library:
        History_of_guesses.append(i)

definition_output = False
def Guess_Library():
    if definition_output == False:
        guessing_library = (input(f"Guess the library that has a length of {length_of_library} characters and the following Definition: \n {library_definition} \n")).lower()
        definition_output = True
    else:
        guessing_library = (input()).lower()

def Checking_Correct_Letters(guessing_library,library):
    words_in_library = []
    [words_in_library.append(i) for i in library]
    index = []
    [index.append(i) for i in range(0,len(library))]
    words_index = list(zip(words_in_library,index))
    for i in range(0,len(library)):
        if library[i] == guessing_library[i]:
            History_Checking[i].append('O')
        elif guessing_library[i] in words_in_library:
            History_Checking[i].append("L")
        else:
            History_Checking[i].append("X")
        
Checking_Correct_Letters(guessing_library,library)

print(History_Checking)

def Output_After_Guess(History_Checking):
    Corrections = []
    for i in History_Checking:
        Corrections.append(i[2])
    print(reformating_guess)
    reformating_check = ""
    for i in Corrections:
        reformating_check = reformating_check + i + "       "
    print(reformating_check)

Output_After_Guess(History_Checking)