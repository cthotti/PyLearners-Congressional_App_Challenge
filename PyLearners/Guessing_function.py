import json
from datetime import datetime
from collections import deque

day0 = datetime(2023, 10, 12)
attempts=0
daycurrent = None
day = None
test_cases = None
jsondata = None
target_func = None

with open('daily_functions.json') as f:
    rawjson = f.read()
    jsondata = json.loads(rawjson)

def variable_initialize():
    global daycurrent
    global day
    global test_cases
    global target_func
    global jsondata

    daycurrent = datetime.now()
    day = ((daycurrent - day0).days) % len(jsondata)
    test_cases = jsondata[day]['test_cases']
    print(test_cases)
    local_vars = {}
    exec(jsondata[day]['function'], globals(), local_vars)
    target_func = local_vars['target_func']

def guessfunction():
    global attempts

    test_code = None
    with open('test_code.txt') as f:
        test_code = f.read()

    fhand = open('test_code.txt','w')
    fhand.close()
    fhand = open('test_code.txt','w')
    fhand.write(test_code)

    print(test_code)

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
            return percent_correct
        else:
            return 'test_func() not found in code'
    except Exception as e:  # catches any exceptions while running test_code
        return str(e)

def sidebar(x):
    try:
        return target_func(json.loads(x))
    except Exception as e:
        return str(e)

variable_initialize()
print(guessfunction())

