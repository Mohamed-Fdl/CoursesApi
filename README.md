# API project with JWT Authentication(Courses API)
In this repo I show you how I made a little course API with authentication and authorization system using JWT .
This API provide you  courses and allows you to make CRUD actions according to the REST structure. So you can create,display,update and delete if you are authenticated!
After creating account you receive token when you are logged which allow you to access your todo list 

## Database structure
I use a mongoDB database with the npm package named Mongoose
### Collections
I need to store users ,authors and courses

* usersCollection
    1. name 
    2. email
    3. password
    4. isAdmin
* authorsCollection
    1. name
    2. email
    3. bio
    4. website
* coursesCollection
    1. name
    2. authors (array of authors's ID)
 

## API End Points

| Verb  | Url              | Actions                                           |
|-------|------------------|---------------------------------------------------|
| GET   | /api/courses       |Display all courses   |
| POST   | /api/courses/?authors=authorsID1,authorsID2,authorsID3,...       |Create new courses   |
| GET   | /api/courses/courseID       |Display a specific course   |
| PUT   | /api/todos/courseID       |Update a specific course  |
| DELETE   | /api/todos/courseID      |Delete a specific course   |
| POST   | /api/authors/|Create new author   |
| GET   | /api/authors/authorID       |Display a specific author   |

