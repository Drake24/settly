
# Settly React (SPA)
The Settly application in React is an SPA implementation of the task given assignment. This app used
the Settly-Api.

## Getting Started with the Settly-Api
There is a `.env-example` file included to see the configurations for the application.

Please update the `REACT_APP_LOCAL_HOST_API_URL` in the `.env` file to point where the Settly-Api
is hosted.

To start with the application run:

`npm install` 
`npm run` 

## Notes
| File/Folder |  Description|
|--|--|
| app/pages| (sub parent folder) contains the pages of the application and partial templates|
| app/pages/auth | contains the authentication pages and logic of the application |
| app/routes|  the routes of the application separated for public and private|
| lib | (parent folder) contains the common files, libraries, models etc.|
| services| (parent folder) contains the service layer, api call, caching|
| store| (parent folder) contains the app state management,store and configurations|
| utils| (parent folder) contains the utility functions|

## Contact
You may wish to contact me at paolo.nunal24@gmail.com

## License
The React framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).