from datetime import datetime, timedelta

#keep track of current project index along with date
project_index = 0
last_date = datetime.now()
#two arrays to store descriptions and video IDs
project_descriptions = []
video_IDs = []

with open('projects.txt', 'r') as file:
    # 
    descriptions = file.readlines()

#text file is in the format description, *new line* video 
for i in range(0, len(descriptions), 2):
    projects = descriptions[i].strip()
    videos = descriptions[i+1].strip()
    project_descriptions.append(projects)
    video_IDs.append(videos)


def next_project():
    global project_index, last_date
    days_elapsed = datetime.now() - last_date
    #project changes every 3 days
    if days_elapsed >= timedelta(days=3):
        last_date = datetime.now()
        #index is updated as a mod of the number of total projects so that it automatically resets once the index surpasses total number
        project_index = (project_index + 1) % len(project_descriptions)
        return project_descriptions[project_index], video_IDs[project_index]
    
