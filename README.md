# Agromonitor

A project, designed to help farmers in forehanded planning of crops growing. Workflow consist of two main steps:
* getting familiar with current/planned situation in agriculture (plant growing)
* inputting data over farmer landholding

# Setup & start

To start project on local server run `$ git clone https://github.com/keenethics/agromonitor.git && cd agromonitor`.
Then install dependencies via `$ meteor npm install` and start server with `$ meteor --settings development.settings.json`.

# Workflow

1. Receive a task
2. Create a new appropriate branch
3. [Pull there from `development` branch]
4. Do the task
5. Commit your changes (checking linter errors before is a must!)
6. Pull from `development`
7. Push changes to GitHub
8. Create pull request

# WARNINGS

1. Please, do not change names of existing variables!
2. Do not remove methods, if you don't know where they are used!
3. Plug the ESLint and follow the rules inviolately

# Lint

Install `linter` and `linter-eslint` packages in Atom.

# Sign in/up application

To sign user in/up, submit your email at `login` page. In case you caught an error, revise Terminal and copy `body` parameter found there. Paste into browser this URL: `localhost:3000/login/<body>`.
