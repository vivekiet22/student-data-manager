## Student Data Manager
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fvivekiet22%2Fstudent-data-manager&count_bg=%2379C83D&title_bg=%23555555&icon=keybase.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
### Tech Stack

- Backend : Nodejs, ExpressJs 
- Frontend : ReactJs
- Database : MongoDB




### Aim
* Develop an application in which the user can upload and download CSV files with student details.

* Sample csv file : [Sample](public/uploads/sample.csv)
* Sample UI :

![](public/sample%20ui/login.png)
![](public/sample%20ui/dashboard.png)

<!-- add image of ui here -->

### How will it work

- The user will be first presented with a login screen. After logging in the user will be redirected to the main screen.
- The main screen has a table UI which is displaying the student data fetched from the database in form of a table.
- It also has two options namely
- Import Students - It will allow the user to upload a csv file onto the server and the data in the csv file will be added to the database.
- Export as CSV - This option would let the user to download a csv file that is having all the data present in the database in the format that is provided in the sample student sheet.


### Backend Task: 

- [x] Authentication (login & signup) with email & password + JWT token generation
- [x] User should be able to add a list of students to student table from a CSV file. 
- [x] CSV sheet can have multiple duplicate rows, you have to make sure that in database only unique rows should get inserted.
- [x] User should be able to see a list of students in UI fetched from database in a REST API
- [x] User should be able to export and download CSV file which contains list of all students stored in the Database.

### Frontend Task: 

- [x] Design a React APP which consists Authentication screen.
- [] Design Dashboard panel. 
- [] In dashboard, design an import export feature which can be handled through local storage of browser.
- [] Import -> Try importing a CSV file having list of students and convert into JSON structure (CSV to JSON) and save into local storage (Key: StudentData, Value: JSON data)
- [] Export -> On Export, Download the JSON file saved in local storage of browser







### Full Stack Task ->

- [] Design Backend APIs + Frontend UI + Integrate APIs to give an end to end touch to the application.

### Backend Working

https://user-images.githubusercontent.com/57106245/224502302-0925c378-ae02-40ab-bb3a-fa717c0c35f7.mp4

## Getting Started


#### Install dependencies


- run this command from your `root` directory and also from `client` folder 

    ```npm install ```

- create .env file and store and set `  JWT_SECRET="any_string";`
`NODE_ENV ="production"` and 
`DB = 'mongodb://127.0.0.1:27017/student_data_manager'
`
- make sure you have installed mongoDB Compass if you are setting the database in your system


- Run this code from the root directory.

    `npm run dev `


## Contributing

Everyone is welcomed to contribute to this project. You can contribute either by submitting bugs or suggesting improvements by opening an issue on GitHub.There are many feature available to add. Please see the [CONTRIBUTING](CONTRIBUTING.md) guidelines for more information.


## Feature to Add

### You can add these features which are not implemented as of now-
-  Design Dashboard panel. 
-  In dashboard, design an import export feature which can be handled through local storage of browser.
-  Import -> Try importing a CSV file having list of students and convert into JSON structure (CSV to JSON) and save into local storage (Key: StudentData, Value: JSON data)
-  Export -> On Export, Download the JSON file saved in local storage of browser
-  Add notification feature to show when a user log in,sign up,import or export.

