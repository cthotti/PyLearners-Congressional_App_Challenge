import json
from datetime import date

day = -1
#format is YYYY-MM-DD
today_date = date.today()

# stores yesterday's date to determine if a new day has begun, iso converts string to YYYY-MM-DD
yesterday_date = None
with open('day.txt') as f:
    yesterday_str = f.read()
    yesterday_date = date.fromisoformat(yesterday_str)

#if day has changed then day counter increases and today's date is stored in day.txt
if today_date != yesterday_date:
    day += 1
    with open('day.txt') as f:
        f.write(str(today_date))

# takes in the json data into python format from daily_functions.json
jsondata=None
with open('daily_functions.json') as f:
    rawjson = f.read()
    jsondata = json.loads(rawjson)


input_data = jsondata[day]['test_cases']

# this stores the target_func() in the local namespace from the json file
exec(jsondata[day]['function'],globals(),locals())


# this reads the text file from test_code.txt
test_code = None
with open('test_code.txt') as f:
    test_code = f.read()


try: # in case there are errors in the actual code in test_code
    exec(test_code, globals(),locals()) # STORES test_func from test_code IN THE LOCAL NAMESPACE
    if 'test_func' in locals(): # checks that the user defined their function as test_func
        for i in input_data: #compares each test case with the target_func and test_func
            if target_func(i) == test_func(i):
                print(f'{i}: true '+str(target_func(i)))
            else:
                print(f'{i}: false, got {test_func(i)} expected '+str(target_func(i)))
    else:
        print('test_func() not found in code')
except Exception as e: #catches any exceptions while running test_code
    print(f'An error occurred while executing the code: {str(e)}')

while True: #separate block for the section where the user will test their own cases to target_func
    test_input = input()
    if test_input == '': #press enter to escape while loop
        break
    try:
        print(target_func(json.loads(test_input))) # [int] --> str
    except Exception as e:
        print(f'An error occurred while executing the code: {str(e)}')