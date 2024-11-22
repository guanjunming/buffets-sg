# Buffets SG

![Homepage Screenshot](public/homepage.png)

## Background Info

**Buffets SG** is a platform designed to help users search for buffets in Singapore conveniently. The application provides essential information, such as restaurant opening hours, location, price ranges, cuisines, and user reviews, enabling users to make informed dining choices. The application is built using the MERN (MongoDB, Express.js, React, Node.js) stack.

The link to the backend repository can be found here: [Buffets Server](https://github.com/guanjunming/buffets-server)

## Table of Contents

- [Demo](#demo)
- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [ERD & Planning Materials](#erd--planning-materials)
- [Getting Started](#getting-started)
- [Running The Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Future Enhancements](#future-enhancements)
- [Attributions](#attributions)

## Demo

Try out the app at: [https://buffets-sg.netlify.app](https://buffets-sg.netlify.app)

## Screenshots

### Details Page

![Details Page](public/details-page.png)
Displays detailed information about a selected restaurant, including its name, location, description, price range, opening hours, and user reviews.

### Search Page

![Search Page](public/Search.png)
User can search for restaurants and apply filters based on their preferences, such as location, price, cuisine, and ratings.

### Review Page

![Review Page](public/review-page.png)
User can leave reviews and ratings for the restaurant to help others make their decisons on visiting the restaurant.

### Profile Page

![Profile Page](public/profile-page.png)
Users can update or delete their reviews, view a list of their favourite restaurants and change account settings.

## Features

- **Landing Page**: View top-rated, most reviewed and nearest restaurants, giving users an overview of the best buffet options.
- **Search and Filters**: Locate restaurants quickly using search and refine results by price range, cuisine and various sorting options for a personalized experience.
- **Restaurant Details**: View detailed information about each restaurant, including descriptions, price ranges, locations, opening hours, and user reviews.
- **User Reviews**: Share experiences with ratings and reviews to help the community discover the best places.
- **Profile Management**: Update or delete reviews, view a list of favourite restaurants, and manage account settings.
- **Favourites**: Save restaurants to a personal list for easy future access.
- **Responsive Design**: Enjoy a seamless experience across all devices, from smartphones to desktops.

## Technologies Used

### Frontend

- **React**: Front-end JavaScript library for building user interfaces.
- **Vite**: Development environment and bundler.
- **React Router**: Declarative routing for React applications.
- **TanStack Query**: For efficient data fetching, caching and state management.
- **Axios**: Promise-based HTTP client for API requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend

- **Node.js**: JavaScript runtime environment for server-side development.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB.
- **jsonwebtoken** - Library for creating and verifying JSON Web Tokens (JWTs) for authentication.

## ERD & Planning Materials

![ERD](public/erd.png)
The `Review` model references the `User` and `Restaurant` model. User can favourite a restaurant and it's id is stored in the `favourites` field of the `User` model.

User Stories and Stretch Goals : [Trello board](https://trello.com/b/vJzdzWNm/buffets-sg)

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

1. Ensure [Node.js](https://nodejs.org/en) and [MongoDB](https://www.mongodb.com/try/download/community) are installed.

### To Run Locally

#### Frontend (buffets-sg)

1. Open terminal and clone the repository:

   ```bash
   git clone https://github.com/guanjunming/buffets-sg.git
   ```

2. Navigate to the project directory:

   ```bash
   cd buffets-sg
   ```

3. Install the client dependencies:

   ```bash
   npm i
   ```

4. Create a `.env` file in the project directory and add the following variable:

   ```
   VITE_SERVER_URL=http://localhost:5001
   ```

#### Backend (buffets-server)

1. In another directory, open terminal and clone the repository:

   ```bash
   git clone https://github.com/guanjunming/buffets-server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd buffets-server
   ```

3. Install the server dependencies:

   ```bash
   npm i
   ```

4. Create a `.env` file in the project directory and add the following variables:

   ```
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/buffets
   ACCESS_SECRET=<secret-key>    # Replace with a secret generated from a random key generator
   REFRESH_SECRET=<secret-key>   # Replace with a secret generated from a random key generator
   ```

## Running The Application

### Start the server

Run `npm run dev` within the `buffets-server` directory.

To initialize the `restaurants` collection in the database, send a GET request using [Postman](https://www.postman.com/) to http://localhost:5001/api/restaurants/seed.

### Start the client

Run `npm run dev` within the `buffets-sg` directory.

## Folder Structure

The project structure is organized as follows:

#### Frontend (buffets-sg)

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

#### Backend (buffets-server)

```
buffets-server/
├── controllers/       # Request handling logic for each route
├── db/                # Database connection and setup
├── middleware/        # Custom middleware (authentication)
├── models/            # Mongoose models for MongoDB collections
├── public/images/     # Static assets (images for profile picture)
├── routes/            # API route definitions
├── seeds/             # Data for seeding the database
├── utils/             # Utility modules
├── validators/        # Input validators
├── .env               # Environment variables (not tracked in version control)
├── package.json       # Dependencies and scripts for the server
```

## Future Enhancements

1. **Recently Viewed Restaurants** : Add a section to display a history of recently viewed restaurants.
2. **Photo Upload for Reviews**: Enable users to upload images of the restaurant along with their reviews.
3. **Google Maps Links**: Include direct links to Google Maps for each restaurant's location.
4. **Change Profile Picture**: Enable users to personalize their profile by uploading and updating profile image.
5. **Social Features**: Allow users to view other users' profile to see the reviews they have written.

## Attributions

### Resources

- Buffet restaurants data from [SingSaver](https://www.singsaver.com.sg/blog/28-best-all-you-can-eat-buffets-in-singapore) and [Daniel Food Diary](https://danielfooddiary.com/category/food/food-buffet/).
- Inter font from [Google Fonts](https://fonts.google.com/specimen/Inter).
- Components from [Material UI](https://mui.com/material-ui/all-components/).
- Icons from [React Icons](https://react-icons.github.io/react-icons/).
- Images from [Pixabay](https://pixabay.com/).

### References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Router Documentation](https://reactrouter.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Swiper](https://swiperjs.com/react)
- [Tripadvisor](https://www.tripadvisor.com/)
