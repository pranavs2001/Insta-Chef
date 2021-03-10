# Insta-Chef

## Installation 
The easiest way to run this project is to run it locally. 
Installation can be done with the following three shell commands
```
git clone https://github.com/pranavs2001/Insta-Chef
cd Insta-Chef
npm install
```
Once the install has completed, the app can be started using this command from inside the 
Insta-Chef repository
```
npm start
```
This should open up a window in your preferred browser running the Insta-Chef app.

## Supported Browsers
Note that not all browsers have been tested. 
The following browsers have been tested:
- Chrome

## Servicing Firebase
NOTE: service account credentials are needed to perform this maintenance.
Service account credentials need to be provided by a manager of Firebase.

The list of valid recipes is stored in Firebase to decrease lookup time.
From time to time, it may be helpful to update the list of recipes stored in Firebase
Perform the following commands from inside the top level Insta-chef repository to do this.
```
cd src/support
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python mealdbparser.py
```
This script pulls recipes for each category and area, and stores all recipes together.
It prints out each category and area as it reads them.
If the script is successful, the last line printed out will be 
```
Firebase successfully updated
```
