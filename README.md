# Buffet Sg

![Homepage Screenshot](public/homepage.png)

## Background Info

_Buffet Sg_ is designed to allows users to search for buffets around Singapore. This application is created to provide convenice and assist users in looking for dinning options, providing them with the information of the restaurant, such as the opening hours and location:

![Details Page](public/details-page.png)

![Search Page](public/Search.png)
They can utilize our search which allows them to filter the restaurants to their preferences such as location, price, cuisines and best rated.

![Review Page](public/review-page.png)
They can also leave reviews and ratings for the restaurant to help others make their decisons on visiting the restaurant.

![Profile Page](public/profile-page.png)
Users can update/delete their reviews and also access their favourites in their profile page.

## Technologies Used

- `React Javascript`
- `Express`
- `Node.js`
- `Vite`
- `HTML`
- `CSS`
- `Visual Studio Code`
- `MongoDB`
- `Tailwindcss`
- `Tanstack`
- `Axios`

## Wireframe & Planning Materials

![ERD](public/erd.png)
The Review Schema references to the User and Restaurant Model. User can favourite the restaurant and it's Id will be saved into favouites in the User model.

User Stories and Stretch Goals : [Trello board](https://trello.com/b/vJzdzWNm/buffets-sg)

## Getting Started

1. Ensure [Node.js](https://nodejs.org/en) and [Mongodb](https://www.mongodb.com/try/download/shell) is installed.

1. Fork this front-end repository (buffet-sg) and our back-end repository [buffet-server](https://github.com/guanjunming/buffets-server/).

1. For each file run `npm i`in the terminal of vscode.

1. Create a new .env file for the respective repositories with the following:

For front-end (buffet-sg):

```
VITE_SERVER_URL=http://localhost:5001
```

For back-end (buffet-server):

```
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/restaurants
ACCESS_SECRET=<replace-with-a-random-key>
REFRESH_SECRET=<replace-with-a-random-key>
```

## Running The Application

In your terminal, run `npm run dev` for both of the repositories. Follow the link to your localhost.

## Folder Structure

The project structure is organized as follows:

#### Frontend

```
buffets-sg/
├── src/
│   ├── api/            # API call logic using axios
│   ├── components/     # React components
│   ├── context/        # React context providers for state management
│   ├── pages/          # Page-level components for different routes
│   ├── utils/          # Utility functions
├── .env                # Environment variables (not tracked in version control)
├── package.json        # Dependencies and scripts for the client
```

#### Backend

```
buffets-server/
├── controllers/       # Request handling logic for each route
├── db/                # Database connection and setup
├── middleware/        # Custom middleware (authentication)
├── models/            # Mongoose models for MongoDB collections
├── public/images/     # Static assets (images for profile image)
├── routes/            # API route definitions
├── seeds/             # Data for seeding the database
├── utils/             # Utility modules
├── validators/        # Input validators
├── .env               # Environment variables (not tracked in version control)
├── package.json       # Dependencies and scripts for the server
```

## Future Enhancements

Goals that we aim to be developed in the future include:

1.  Implementing a 'recently viewed' tab in user profile, to see the list of restaurants from user's most recent visit.

1.  Creating a functionality to allow users to submit their own photos of the restaurant togther with the review form.

## Resources

[Material UI](https://mui.com/material-ui/material-icons/) | [Tailwindcss](https://tailwindcss.com/) | [Swiper](https://swiperjs.com/react) |
[Google Fonts](https://fonts.google.com/selection/embed) | [React Developer Tools](https://react.dev/learn/react-developer-tools) | [React Icons](https://react-icons.github.io/react-icons/) | [Tripadvisor](https://www.tripadvisor.com/) |
[buffet data](https://www.singsaver.com.sg/blog/28-best-all-you-can-eat-buffets-in-singapore)
| [buffet data 2](https://danielfooddiary.com/category/food/food-buffet/) |
