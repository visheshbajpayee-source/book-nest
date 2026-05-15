# 📚 BookNest

A personal book tracker and reading community platform. Track books you're reading, write reviews, create reading lists, follow other readers, and discover new books.

Think of it as a simplified Goodreads — built with a modern full-stack JavaScript stack.

---

## 🎯 Project Overview

BookNest is a full-stack web application where users can:

- Search and discover books via the Open Library API
- Maintain personal bookshelves (Want to Read / Currently Reading / Finished)
- Write reviews and rate books
- Create and share curated reading lists
- Follow other readers and see their activity in a feed
- Track personal reading stats with visual dashboards

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** — component library
- **React Hook Form + Zod** — form handling & validation
- **Axios / Fetch API** — HTTP requests
- **Recharts** — data visualization

### Backend 
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose ODM**
- **JWT** — authentication
- **bcrypt** — password hashing
- **Multer + Cloudinary** — image uploads

### External APIs
- **Open Library API** — book data (free, no auth required)

### Deployment
- **Vercel** — frontend
- **Render / Railway** — backend
- **MongoDB Atlas** — database

---

## ✨ Core Features

### 1. User Authentication
Register, log in, log out, and reset passwords. Profile pages display reading stats, current books, and review history. Avatar uploads stored on Cloudinary.

**Concepts covered:** JWT authentication, protected routes (frontend + backend), password hashing, middleware patterns, Next.js middleware, auth state management.

### 2. Book Search & Discovery
Search books using the Open Library API. Results show cover images, titles, authors, and publication years. Book detail pages display descriptions, average ratings, and community reviews.

**Concepts covered:** Third-party API integration, caching strategies, debouncing, loading states, error handling, Next.js server components.

### 3. Personal Bookshelf
Add books to one of three shelves: **Want to Read**, **Currently Reading**, or **Finished**. Track progress, set start/finish dates, and add private notes.

**Concepts covered:** MongoDB relationships, enum fields, date handling, optimistic UI updates, CRUD operations.

### 4. Reviews & Ratings
Write reviews with 1–5 star ratings. Reviews appear on book pages and reviewer profiles. Edit/delete your own reviews. Like reviews from others.

**Concepts covered:** One-to-many and many-to-many relationships, aggregation pipelines, authorization, pagination, form validation.

### 5. Reading Lists
Create custom lists (e.g., "Best Sci-Fi 2025"). Lists have a title, description, cover image, and ordered books. Lists can be public or private.

**Concepts covered:** Embedded vs referenced documents, array operations, visibility logic, reusable React components.

### 6. Social Features
Follow other users and see their activity in a paginated feed: new reviews, finished books, and new lists.

**Concepts covered:** Follower/following relationships, aggregation pipelines for feeds, infinite scroll, denormalization.

### 7. Reading Stats Dashboard
Personal dashboard with books read this year, total pages, favorite genres, average rating given, reading streak, and monthly activity charts.

**Concepts covered:** MongoDB aggregation framework, data visualization, calculated metrics.

### 8. Search & Filters
Search across users, books, and public lists. Filter by genre, rating range, and publication year.

**Concepts covered:** Text indexes, query optimization, URL search params, parallel data fetching.

---

## 🗄️ Database Schema

Six collections form the data model:

| Collection | Purpose |
|------------|---------|
| **Users** | Email, hashed password, username, bio, avatar URL, following array |
| **Books** | Cached data from Open Library (title, author, cover, description, ISBN, genres) |
| **BookshelfEntries** | Links user to book with shelf status, progress, dates, notes |
| **Reviews** | User reference, book reference, rating, text, likes, timestamps |
| **ReadingLists** | Owner reference, title, description, ordered books array, visibility |
| **Activities** | Logs user actions for the feed (type, user, target reference, timestamp) |

---

## 📁 Project Structure

```
booknest/
├── client/              # Next.js frontend
│   ├── app/
│   │   ├── (auth)/      # Auth route group
│   │   ├── (dashboard)/ # Protected routes
│   │   └── api/
│   ├── components/
│   ├── lib/
│   └── ...
└── server/              # Express backend
    ├── routes/
    ├── controllers/
    ├── models/
    ├── middleware/
    ├── utils/
    └── server.js
```

---

## 📅 One-Week Build Plan

A focused 7-day sprint to ship a working MVP.

### Day 1 — Setup & Authentication
- Initialize Next.js and Express projects
- Connect MongoDB Atlas
- Configure Tailwind + shadcn/ui
- Build registration, login, and logout endpoints
- Implement JWT middleware
- Connect frontend with protected routes
- **Milestone:** Users can sign up, log in, and reach a placeholder dashboard

### Day 2 — Books & Bookshelf
- Integrate Open Library API
- Build the book search page with debounced input
- Create Book and BookshelfEntry models
- Implement "Add to Shelf" functionality
- Build the personal bookshelf page with three tabs
- **Milestone:** Users can search books and manage shelves

### Day 3 — Reviews & Book Detail Pages
- Build the book detail page (cover, metadata, description)
- Implement review CRUD endpoints
- Create the star rating component
- Add average rating aggregation pipeline
- Display reviews with pagination
- **Milestone:** Users can write, edit, and view reviews

### Day 4 — Reading Lists & Profiles
- Build reading list CRUD (create, edit, delete, reorder)
- Implement public/private visibility
- Build the public user profile page
- Show user's reviews, shelves, and lists on profile
- **Milestone:** Platform feels social and shareable

### Day 5 — Following & Activity Feed
- Implement follow/unfollow endpoints
- Build the activity feed with aggregation pipeline
- Add infinite scroll using Intersection Observer
- Create the stats dashboard with Recharts
- **Milestone:** Users can discover content from people they follow

### Day 6 — Search, Filters & Polish
- Add MongoDB text indexes
- Build the global search page (users, books, lists)
- Implement filters (genre, rating, year) via URL params
- Improve loading states and error boundaries
- Add toast notifications
- Polish responsive design
- **Milestone:** App feels production-ready

### Day 7 — Deploy & Document
- Write comprehensive README
- Deploy frontend to Vercel
- Deploy backend to Render or Railway
- Configure environment variables
- Set up MongoDB Atlas production cluster
- Test the full flow end-to-end
- **Milestone:** Live, shareable URL

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/booknest.git
cd booknest

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

**`server/.env`**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000
```

**`client/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running Locally

```bash
# Terminal 1 — start the backend
cd server
npm run dev

# Terminal 2 — start the frontend
cd client
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## 🎁 Optional Stretch Features

Once the core is complete, consider adding:

- **Reading challenge** — annual book goal with progress bar
- **Book recommendations** — based on highly-rated genres
- **Library export** — download data as JSON or CSV
- **Dark mode** — theme toggle with persistence
- **Email notifications** — new followers, list saves (via Nodemailer)
- **Quotes feature** — save favorite quotes from books
- **Reading sessions** — log time spent reading per session

---

## 📚 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`

### Users
- `GET /api/users/:username`
- `PATCH /api/users/me`
- `POST /api/users/:id/follow`
- `DELETE /api/users/:id/follow`

### Books
- `GET /api/books/search?q=`
- `GET /api/books/:id`

### Bookshelf
- `GET /api/shelf`
- `POST /api/shelf`
- `PATCH /api/shelf/:id`
- `DELETE /api/shelf/:id`

### Reviews
- `GET /api/books/:id/reviews`
- `POST /api/reviews`
- `PATCH /api/reviews/:id`
- `DELETE /api/reviews/:id`
- `POST /api/reviews/:id/like`

### Lists
- `GET /api/lists`
- `POST /api/lists`
- `GET /api/lists/:id`
- `PATCH /api/lists/:id`
- `DELETE /api/lists/:id`

### Feed & Stats
- `GET /api/feed`
- `GET /api/stats/:userId`

---

## 📄 License

MIT

---

## 🤝 Contributing

Pull requests welcome. For major changes, please open an issue first to discuss.

---

**Built with ❤️ using Next.js, Express, MongoDB, and the Open Library API**
