# NextTime App 

## Contributors:
Leaviel Armstrong, Lisa Ewart, Taly Huang, and Janessa Hanna

## Concept:
The purpose of the NextTime app is to create an interactive to-do list that tracks location-based tasks for users. The app will also notify them when they are near a location that would allow them to accomplish their task. For example, if the user lists “Buy Onions” or “Pick-up clothes from the Dry Cleaners” as tasks that they need to accomplish, the app will store this information and notify them when they are close to a grocery store or a local dry cleaner.


## Technology Overview:
Our back-end would comprise of two databases. The first database will contain a list of the user’s action items. Within this table, the user will be able to define the task and the category of location that would be associated with that task. The user will also be able to define a specific business if they wish, for example “buying organic onions from Whole Foods” or “picking up clothes from Sam’s Dry Cleaners”. The second database will hold basic information about local businesses in the greater Atlanta area. The two tables will be joined by category tags, and a GPS-based API will run a query on a set interval that will periodically check to see if the user’s client is near to any locations that would help them to fulfill their tasks. Once the task is complete, they will be able to check it off in the interface and remove it from the database.


## Proposed Timeline
Monday 1/15 - Wireframes and User Stories completed

Thursday 1/18 - MVP of app completed

Friday 1/19 - User testing and final tweaks will be made

Monday 1/22 - Presentation completed

Tuesday 1/23 - Group will present to class
