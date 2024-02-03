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
8. In order to see if the API is working, I used db:seed file and went to the browser and checked the endpoints of /api/v1/todos, /api/v1/todos/1.

## To boot up the server
1. bundle install
2. rails db:create
3. rails db:migrate
4. rails db:seed (optional)
5. bin/dev

## Notes
Whoops, I accidentally opened a PR in the codetest repository instead of my own repository, went ahead and closed it out.

## RHSC-1_todo_front_end
# First commit
1. Installed React, React Dom, and React Router Dom packages.
2. Started up components.
3. Installed more packages such as fontawesome for to utilize their free icons, uuid, and immutability-helper for post calls on API.
4. Able to show React elements/componenets in the home page.
5. Todo Title is rendered.
6. There is a divider between the list of todos and the title.
7. All existing todos are showing up along with checkbox, edit icon, and delete icon.
8. All aligned in the middle, giving out a clean and simple border of each todos.
9. Created a function Todos to output all existing todos.
10. Checkboxes do nothing for now.

# Second commit
1. Added create action form for Todo.
2. User has both options to either press enter or click the submit button after entering a todo.
3. Does not hit the database yet, trying to figure that out.
4. I forced one of the todo to be true on status done via console. Looks like it check marks it along with strikethrough.

# Third commit
1. Database is now affected when creating todos.
2. Trash icon works where it would delete the todo including the database when user clicks on it.

