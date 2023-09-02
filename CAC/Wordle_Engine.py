import pandas as pd
import random


#Getting Randomly Generated Guessing Library
df = pd.read_csv('/Users/cthotti/VS Code/CAC/Library_Definitions.csv')
random_index = random.randint(0,len(df['Library'])-1)
library = df.loc[random_index]['Library']
library_definition = df.loc[random_index]['Question']
length_of_library = len(library)

#Asking User to Guess Library
definition_output = False
Guess_Number_1 = 0
guessing_library = ""

First_Guess = True
History_Checking = []
def History_Checking_Function(guessing_library):
    if First_Guess == True:
        for i in range(0,len(guessing_library)):
            both_library_values = [guessing_library[i],i]
            History_Checking.append(both_library_values)

#Checking if Words are Right
def Checking_Correct_Letters(guessing_library,library,length_of_library,Guess_Number):
    words_in_library = []
    [words_in_library.append(i) for i in library]
    index = []
    [index.append(i) for i in range(0,len(library))]
    words_index = list(zip(words_in_library,index))
    for i in range(0,len(library)):
        if library[i] == guessing_library[i]:
            History_Checking[i+length_of_library*Guess_Number].append('O')
        elif guessing_library[i] in words_in_library:
            History_Checking[i+length_of_library*Guess_Number].append("L")
        else:
            History_Checking[i+length_of_library*Guess_Number].append("X")
    Output = Output_After_Guess(History_Checking,length_of_library,Guess_Number,guessing_library)
    for i in Output:
        print(i)
    if guessing_library != library:
        Guess_Library()

#After Guessing, a specific output
def Output_After_Guess(History_Checking,length_of_library,Guess_Number,guessing_library):
    global Guess_Number_1
    Corrections = []
    for i in History_Checking[length_of_library*Guess_Number:]:
        Corrections.append(i[2])
    answer_reformat = ""
    for i in guessing_library:
        answer_reformat = answer_reformat + i +"        "
    reformating_check = ""
    for i in Corrections:
        reformating_check = reformating_check + i + "        "
    Guess_Number_1 += 1
    return answer_reformat , reformating_check

#User Input
def Guess_Library():
    global Guess_Number_1
    global definition_output
    if Guess_Number_1 <=(length_of_library-1):
        if definition_output == False:
            global guessing_library
            guessing_library = (input(f"Guess the library that has a length of {length_of_library} characters and the following Definition: \n {library_definition} \n")).lower()
            definition_output = True
        else:
            guessing_library = (input()).lower()
        reformating_guess = ""
        for i in guessing_library:
            reformating_guess = reformating_guess + i + "       "
        History_Checking_Function(guessing_library)
        Checking_Correct_Letters(guessing_library,library,length_of_library,Guess_Number_1)
    else:
        print("Play again")
Guess_Library()
