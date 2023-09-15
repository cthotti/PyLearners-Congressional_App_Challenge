import json

# namespace is necessary for functions within the txt file to appear
# in the global namespace while using the exec() command
namespace = {}

# these are the test cases (changes daily)
input_data = [[0,1,2,3,4,5,6],[3,4,2],[123,232,1],[1234]]

# this is the target function (changes daily)
def target_func(x): 
    x = list(x)
    return int(len(x))+int(sum(x))

# this reads the text file from test_code.txt
test_code = None
with open('test_code.txt') as f:
    test_code = f.read()


try: # in case there are errors in the actual code in test_code
    exec(test_code, namespace)
    if 'test_func' in namespace: # checks that the user defined their function as test_func
        for i in input_data: #compares each test case with the target_func and test_func
            if target_func(i) == namespace['test_func'](i):
                print(f'{i}: true {target_func(i)}')
            else:
                x=namespace['test_func'](i)
                print(f'{i}: false, got {x} expected {target_func(i)}')
    else:
        print('test_func() not found in code')
except Exception as e: #catches any exceptions while running test_code
    print(f'An error occurred while executing the code: {str(e)}')

while True: #separate block for the section where the user will test their own cases to target_func
    test_input = input()
    if test_input == '': #press enter to escape while loop
        break
    try:
        print(target_func(json.loads(test_input)))
    except Exception as e:
        print(f'An error occurred while executing the code: {str(e)}')
