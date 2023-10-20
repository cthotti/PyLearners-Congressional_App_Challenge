import json
from random import randint

jsondata = None

with open('projects.json') as f:
    rawjson = f.read()
    jsondata = json.loads(rawjson)

def next_project():
    x = randint(0,len(jsondata)-1)
    return jsondata[x]