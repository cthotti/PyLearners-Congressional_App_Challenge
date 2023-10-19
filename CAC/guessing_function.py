import json
from datetime import datetime
from collections import deque

# takes in the json data into python format from daily_functions.json
jsondata=None
with open('CAC/daily_functions.json') as f:
    rawjson = f.read()
    jsondata = json.loads(rawjson)

#---------------------------------- VARIABLES ------------------------------------------------------
day0 = datetime(2023, 10, 12) #this is the starting index for the days
daycurrent = datetime.now()
day = ((daycurrent - day0).days)%len(jsondata) #covers for out-of-range errors for the day
test_cases = jsondata[day]['test_cases']
sidebar=deque() #this is a queue of tuples for the x and f(x) values on the sidebar
attempts=0
user_presses_submit = True #this should later be changed to detect user input from textbox

# this stores the target_func() in the local namespace from the json file
exec(jsondata[day]['function'],globals(),locals())


#---------------------------------- FUNCTIONS ----------------------------------------------------------
def colorcheck(x): #this is the system for having colors represent the percentage correct
    color_list = []
    for i in range(x//20):
        color_list.append('green')
    for i in range((x%20)//10):
        color_list.append('yellow')
    while len(color_list) < 5:
        color_list.append('gray')
    return color_list 

def guess_function(): # this will take in the new user input from text box as the function
    # this reads the text file from test_code.txt
    test_code = None
    with open('CAC/test_code.txt') as f:
        test_code = f.read()

    try:  # in case there are errors in the actual code in test_code
        local_vars={} # establishes a separate local namespace to put 'test_func' into because python is looking at the local scope of guess_function()
        exec(test_code, globals(), local_vars) # STORES test_func from test_code IN THE LOCAL_VARS
        if 'test_func' in local_vars:  # checks that the user defined their function as test_func
            total_correct = 0
            test_func = local_vars['test_func'] # creates function test_func as the test_func from local vars
            for i in test_cases:  # compares each test case with the target_func and test_func
                if target_func(i) == test_func(i):
                    total_correct += 1
            percent_correct = int(total_correct * 100 / len(test_cases))  # % correct on the test cases
            print(percent_correct)
            print(colorcheck(percent_correct))
        else:
            print('test_func() not found in code')
    except Exception as e:  # catches any exceptions while running test_code
        print(f'An error occurred while executing the code: {str(e)}')

#-------------------------------- MAIN LOOP --------------------------------------------------------------
while True: #separate block for the section where the user will test their own cases to target_func
    if user_presses_submit:
        if attempts < 6:
            guess_function()
            attempts += 1
        else:
            print('max attempts reached')

    #the code below should be separated, but idk how to be able to take these separately 
    test_input = input()
    if test_input == '': #press enter to escape while loop
        break
    try:
        #print(target_func(json.loads(test_input))) # [int] --> str
        sidebar.appendleft((test_input,target_func(json.loads(test_input))))
        if len(sidebar)>10: sidebar.pop()
        print(list(sidebar))
    except Exception as e:
        print(f'An error occurred while executing the code: {str(e)}')