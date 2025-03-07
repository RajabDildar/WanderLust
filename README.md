# ✈️ WanderLust - Travel, Explore, Review

WanderLust is a **full-stack web application** inspired by Airbnb, designed to help users browse and review travel destinations. Users can **create listings**, upload images, write descriptions, and leave reviews for various travel locations. The platform supports **filters, a search bar (by country), interactive maps, and responsive design**.

Built using **MongoDB, Express.js, Node.js**, and **EJS** for templating, WanderLust features **user authentication, session management, and flash messaging** for a seamless user experience.

---

## ✨ Features

### 🏕️ Listings

- View all available travel listings on the home page.
- Add new listings (only authenticated users can create listings).
- Upload images for each listing (image upload feature included).
- Add price, location, and description for each listing.
- Edit and delete **your own listings**.
- Listings are displayed with an interactive map (maps feature).

### 🔍 Search & Filters

- Search listings by **country** using a search bar.
- Filter listings based on **price, rating, and other criteria**.
- Responsive design ensures the site works smoothly across devices.

### 💬 Reviews

- Users can leave reviews on listings.
- Edit and delete your own reviews.

### 📍 Maps Integration

- Each listing displays its **location on a map** using a maps API (like Mapbox or Leaflet).

### 🔐 Authentication

- Sign up for a new account.
- Log in and log out.
- Only logged-in users can create, edit, or delete listings and reviews.

### 🚨 Flash Messages

- Success and error messages after key actions (like login, logout, review submission, etc.).

### 🛡️ Authorization

- Users can only modify/delete **their own listings**.
- Users can only edit/delete **their own reviews**.

### 📱 Fully Responsive

- Mobile-friendly design using **Bootstrap**, ensuring compatibility across all devices.

---

## 🛠️ Technologies Used

| Technology          | Purpose                                                      |
| ------------------- | ------------------------------------------------------------ |
| **Node.js**         | Backend runtime environment                                  |
| **Express.js**      | Web framework for handling routes and requests               |
| **MongoDB**         | NoSQL database to store listings, reviews, and users         |
| **Mongoose**        | MongoDB ODM for schema definitions and database interactions |
| **EJS**             | Template engine for rendering dynamic content                |
| **Passport.js**     | Authentication library for user login and session handling   |
| **Express-session** | Session management                                           |
| **Connect-flash**   | Flash messages for success/error notifications               |
| **Bootstrap**       | Frontend styling and responsive design                       |
| **HTML/CSS/JS**     | Core frontend technologies                                   |
| **Opencage**        | Maps integration for location display                        |
| **Multer**          | Image upload handling                                        |
| **Cloudinary**      | Image storage solution (if used)                             |

---

## 📂 Folder Structure

```
WanderLust/
├── models/            # Mongoose schemas (User, Listing, Review)
├── public/            # Static assets (CSS, images)
├── routes/            # Express route files (listings, reviews, users)
├── controllers/       # Backend logic (listings, users, reviews, etc.)
├── utils/             # Utility functions (error handling, session config, etc.)
├── views/             # EJS templates (listings, users, errors, etc.)
├── app.js             # Main server file
├── package.json       # Project dependencies
├── package-lock.json  # versions of all installed npm packages
├── cloudConfig.js     # manages configuration for cloud services
├── middlewares.js     # custom middleware functions
├── schema.js          # Joi validation schemas
├── README.md          # provides an overview
└── .env               # Environment variables (MongoDB connection string, etc.)
```

---

## 📜 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_API_KEY=your_mapbox_token
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RajabDildar/WanderLust.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Add your MongoDB connection string, Cloudinary credentials, opencage token, and session secret in `.env` file.

### 4. Run the application

```bash
node app.js
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Packages Used

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `ejs` - Template engine
- `ejs-mate` - Template embedding
- `passport` - Authentication library
- `passport-local` - Local strategy for Passport
- `passport-local-mongoose` - Simplified integration of Passport with Mongoose
- `express-session` - Session management
- `connect-flash` - Flash messages
- `dotenv` - Environment variables
- `multer` - File upload handling
- `cloudinary` - Cloud-based image storage
- `opencage-api-client` - Maps integration
- `multer-storage-cloudinary` - images upload using multer and cloudinary
- `method-override` - To enable HTTP PUT & DELETE
- `joi` - Basic security enhancements
- `connect-mongoose` - Mongoose Session Store

---

## 📧 Contact

For any questions or suggestions, feel free to reach out:

- **Your Name:** Rajab Dildar
- **GitHub:** https://github.com/RajabDildar
- **Email:** rajabdildar4678@gmail.com
