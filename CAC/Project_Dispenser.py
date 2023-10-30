import pandas as pd
import random

df = pd.read_csv('Project_Dispenser_csv.csv')
random_index = random.randint(0,len(df['Project'])-1)
project = df.loc[random_index]['Project']
project_description = df.loc[random_index]['Project Description']
length_of_project = len(project)

print(project)
print(project_description)