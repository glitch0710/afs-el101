# afs-el101
Andot's Food Services - An E-Commerce Project for EL101 E-Commerce Course

## Things to install: <br>
  * Python <i>(make sure to add Python to path during installation)</i> <br>
  * Node.js <br>
  * Git <br>


## Configuring your Git profile (essential for git commits): <br>
In your git bash or any terminal, type in the following, one-by-one: <br>
  1. Set your username `git config --global user.name "FIRST_NAME LAST_NAME"` <br>
  2. Set your email address `git config --global user.email "MY_NAME@example.com"` <br>


## Clone repository: <br>
  * In your git bash or any terminal, type in: `git clone https://github.com/glitch0710/afs-el101.git`


## How to get the project up and running
In your terminal, go into the cloned repository folder in where you can see the `backend` and `frontend` folders. Here, we want to install the dependencies first.


### Setup virtual environment for the backend
  * `cd` into `backend` folder: `cd backend`
  * Type in: `python -m virtualenv env`
    * _If you're in `powershell` terminal and executing the command above doesn't work, you need to enable Powershell Execution Policy. Just type in the terminal: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted` and execute the command again._
    * Take note that you only need to type in `python -m virtualenv env` once. If the `env` folder is already present in your project directory, please proceed to the last step.
  * After that, you should be able to see a new folder named `env` in the project directory.
  * Activate the virtual environment by typing:
    * In powershell: `env\Scripts\activate`
    * In Git Bash: `source env\Scripts\activate`

### Deactivating your virtual environment
* If you need to deactivate the virtual environment, type in the terminal `deactivate`.

### Backend Dependencies
To install the backend dependencies, we first need to activate our virtual environment so that all dependencies are separated to your actual machine's environment. This will help decouple and isolate Python installs and associated pip packages. This allows end-users to install and manage their own set of packages that are independent of those provided by the system or used by other projects.

To start with, here are the following commands to execute after enabling the virtual environment for our backend;
  * `cd` into `backend` folder: `cd backend`
  * Type in: `pip install -r requirements.txt`
    * _If pip is not working on your terminal, please look up on how to install pip. Normally, it is included upon Python installation, otherwise please install it manually._

After installing all backend dependencies, lets head over to the frontend dependencies.

### Frontend Dependencies
  * `cd` into `frontend` folder: `cd frontend`
  * Type in: `npm install`

### Running the project
After installing all the dependencies from our `backend` and `frontend` folders, it is time to run our project. I highly recommend you to open two terminals at the same time, one for `backend` server and one for the `frontend` server
  * Backend Server
    * On one of your terminal, type in: `cd backend`
    * And run your server from there by enabling your environment (steps on how to enable virtual environment above)
    * Type in: `python manage.py runserver`

  * Frontend Server
    * On one of your terminal, type in: `cd frontend`
    * Type in: `npm start`

You can now access the project by going into your browser and type in the address bar: `localhost:3000`

## How to get updates from the main repository
Be sure to execute this command everytime you plan to make changes into the code:
  * Execute this command in your terminal: `git pull origin`
  * This will update your local copy of the project

## How to push updates or progress into Github
If you made any changes and want to push the update into our Github Repository, execute these series of commands:
  * To check any untracked and modified files, type in: `git status`
  * In your terminal, type in: `git add .`
  * After staging the files for commit, type in the git commit command with this convention:
    * `git commit -m "### <general description of the updates>"`
      * For example: `git commit -m "#32 added Andot's Food Services logo in the login screen"`
    * You can either hold these changes until you are done or push the commits right away by typing: `git push origin <branch_name>`
      * For example: `git push origin my_branch`
