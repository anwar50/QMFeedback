***QM FEEDBACK DATASET AND HOW TO USE***

Installation and Instructions:

***Running Django:***

1. You would have to install Miniconda from: https://docs.conda.io/en/latest/miniconda.html

2. After installing this then you should create an environment from your terminal by typing: create --name environment python=3.7"

3. After you activate the environment by typing 'conda activate app'

4. Through the requirement.txt you would have to install of the packages through the command 'pip install -r requirements.txt'

5. To run the server you would have to go into the 'backend/src' directory and type in the command 'python manage.py runserver'

***Running React:***

1. To run the frontend which holds the React packages you would have to open a new terminal and go into the 'frontend/automated_frontend' directory.

2. You then have to install all of the packages through the command 'npm install'. 

3. Once you have done this, you simply run it through the command 'npm start'.


                    ***DATASET DESCRIPTION:***

This dataset below has product reviews about clothing, shoes and jewelry. it has 2.5 million reviews that span from May 1996-July 2014.

You will have to change the path to the dataset in your local directory.

The line that you have to change is found in backend/src/api/views.py in line 214. This line downloads the dataset You will have to download the dataset and place it in your local directory.

DATASET LINK: https://drive.google.com/drive/folders/1v8mjkJswJkV3fc6COBqc5oSYFPR7GrSw

