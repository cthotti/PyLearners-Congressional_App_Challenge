import pandas as pd
import random

def dispenser():
    df = pd.read_csv('Projects_3.csv')
    random_index = random.randint(0,len(df['Project'])-1)
    project = df.loc[random_index]['Project']
    project_description = df.loc[random_index]['Project Description']
    length_of_project = len(project)

    print(project)
    print(project_description)