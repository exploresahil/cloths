import os

folder_path = r'C:\Users\explo\Documents\GitHub\kapda\app\scss\fonts'

file_names = os.listdir(folder_path)

# Write the file names to a text file
with open('file_names.txt', 'w') as file:
    file.write('\n'.join(file_names))
