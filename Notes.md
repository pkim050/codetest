# Create TODO list design
There are many different ways of how a TODO list looks. The best checklist I have seen recently is what JIRA has. Jira has their own todo list in a story or ticket and it is really simple and clean. It lets the user create todo items, edit items, delete items, and be able to 'finish' them by clicking on the checkbox which crosses out the item. I utilized it a lot with my previous company and it helps the team be on the same page as me throughout the sprint.

![Design Example](https://gyazo.com/34e95fd8786cb6ffba88e8dbbf2f5b1d)

I won't exactly replicate it how it is shown in the screenshot (such as the status of 'Open', 'In Progress', 'Done' and certain icons that are shown) but it will be something similar to it.

## Think of ways to create the TODO List application
1. Creating an API for back-end using Rails 7 and Postgres as database. Create a React application for front-end utilizing the API application. Bootstrap for styling purposes. 2 total applications. I have done this in the past, here is the API url: https://github.com/pkim050/nba-list-api. Here is the react app url: https://github.com/pkim050/nba-list. And here is the demo of the application: https://www.youtube.com/watch?v=K8eDpUrGatA&feature=youtu.be. It is kind of similar to Matt's Wrestling Cards.

2. Create 1 application that involves both React and Rails 7, including Postgres as database and Bootstrap for styling purposes. 1 total application.

Option 1 seems more prominent as it showcase utilizing API even though most developers should be able to know how to use API (mainly using Postman). Since I have done option 1 before, I will go ahead and do option 2 where both the react and rails portion will be on the same application.

I am going to create branches in accordance to how it was with my previous job at First American. Looking back at the screenshot, the sprint under the project is named Roaming Hunger: Sneaky Cats, I will name my branches according to the project name -> RHSC-1_branch_name. The number will represent the ticket number that is created in the sprint. After the first underscore, it will be a relevant name.

## Tech Stacks:
1. Rails 7
2. Esbuild (rather than Webpacker, etc)
3. Bootstrap
4. Postgres

More to come from different branches.

## RHSC-1_todo_model_back_end_work
1. Installed gems RSpec gems.
2. Accidentally installed bootstrap already (was going to do it on another branch)
3. Created Todo model, ensuring theres validation for field title during creation and update.
4. Created Todo controller via api/v1 to ensure that is returning in JSON format on CRUD actions and utilizing it as an API.
5. Inputted some seeds to pre-populate the tasks towards our todo list that Roaming Hunger has given us.
6. Implemented some RSpec testing for model and controller.
7. Installed Rubocop to ensure there are no bugs/errors, for better codebase.

## To boot up the server
1. bundle install
2. rails db:create
3. rails db:migrate
4. rails db:seed (optional)
5. bin/dev
