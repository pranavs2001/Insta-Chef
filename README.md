# cs97-project

# Installation 
To install the program locally
INSTALL REACT LIBRARY
```
git clone https://github.com/pranavs2001/Insta-Chef
cd Insta-Chef
npm install
```
To run the program :
```
npm start
```

# Updating Firebase
NOTE: service account credentials are needed to perform this maintenance
The list of valid recipes is stored in Firebase to decrease lookup time
From time to time, it may be helpful to update the list of recipes stored in Firebase
From inside the top level Insta-chef repository, use the following commands
```
cd src/support
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python mealdbparser.py
```
This script pulls recipes for each category and area, and stores all recipes together
It prints out each category and area as it reads them
If the script is successful, the last line printed out will be 
```
Firebase successfully updated
```
