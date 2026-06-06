# College Discovery Platform

## Overview
The College Discovery Platform is a full-stack web application designed to help students discover, filter, and compare educational institutes. Whether you are preparing for various competitive exams, this platform allows you to find colleges that fit your specific criteria, view detailed insights (such as fees, placement statistics, and user ratings), and make informed decisions about your future education.

## Features
- Dashboard showing website stats and trending colleges
- Extensive College Database: Browse hundreds of higher education institutions.
- Advanced Search and Filters: Easily find colleges by:
  - Fees and Rating: Filter by rating and fees range taken by college yearly.
  - State and Location: Search and use dropdowns for quick geographic filtering.
- Side-by-Side Comparison: 
  - Select multiple colleges and compare them side-by-side.
  - Compare crucial metrics like Placement Rates, Highest Packages, Fees, and Ratings.
- Detailed College Profiles: View comprehensive details including top recruiters, average packages, and cutoff ranks.
- Predictor: On basis of previous cutoff ranks, suggestion of college in different exams
- Login/Register: Effortlessly register on website to use more features such as view your saved colleges, saved college comparisons and participate in discussions
- College Review and Save: Give rating and detailed review of a college to be seen by others
- Discussion and Q&A: Discuss topics and answer others' questions
- Responsive Design: A mobile-friendly user interface built with Tailwind CSS.

## Tech Stack

### Frontend
- Framework: Next.js (App Router)
- UI Library: React
- Styling: Tailwind CSS
- State Management: Zustand (used for managing the comparison list via `useCompareStore`)

### Backend
- Runtime/Framework: Node.js 
- ORM: Prisma
- Database: PostgreSQL or MySQL (Configured via Prisma)
- Data Mocking: @faker-js/faker (For generating realistic seed data)

## Architecture
The application follows a modern Client-Server architecture:
1. Client (Frontend): Built with the Next.js App Router. It manages user interactions, client-side state (via Zustand), and renders server/client components for optimal performance and SEO.
2. API Layer: Handles incoming requests from the frontend, queries the database, and processes filtering and search logic.
3. Database Layer: Managed by the Prisma ORM, keeping track of relational entities like College, Placement, and Cutoff.

## Project Setup and Installation
Follow these detailed instructions to set up the project on your local machine.

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or pnpm
- A running instance of PostgreSQL/MySQL (depending on your Prisma setup)

### 1. Repository Setup
First, clone the repository to your local machine and navigate into the project directory.
```bash
git clone https://github.com/Pjdey28/college-discovery-platform.git
cd college-discovery-platform
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and set up your database.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add your database connection string:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/discovery_db"
```

Run migrations and seed the database with realistic mock data (Colleges, JEE/NEET/GATE cutoffs, Placements):
```bash
npx prisma db push
npx prisma db seed
```

Start the backend server (if applicable):
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory for your API URL:
```env
NEXT_PUBLIC_API_URL="http://localhost:8000/api"
```

Start the Next.js development server:
```bash
npm run dev
```

The application should now be running at http://localhost:3000.

## Environment Variables

To run this project, you will need to add the following environment variables to your respective `.env` files.

### Backend (`backend/.env`)
- `DATABASE_URL` - The connection string for your PostgreSQL or MySQL database.
- `PORT` - The port on which the backend server will run (default: 8000).

### Frontend (`frontend/.env.local`)
- `NEXT_PUBLIC_API_URL` - The base URL of your backend API (default: `http://localhost:8000/api`).

## Database Schema
The application utilizes a relational database structure managed by Prisma ORM.

### 1. User Model
Stores registered user information for authentication and profile management.
- `id` (String, CUID): Unique identifier.
- `name` (String): Full name of the user.
- `email` (String): Unique email address.
- `password` (String): Hashed authentication password.
- `createdAt` (DateTime): Timestamp of user registration.

### 2. College Model
Stores the primary details of an educational institution.
- `id` (String, CUID): Unique identifier.
- `name` (String): Name of the institute.
- `location` (String): City or specific location.
- `state` (String): State where the college is located.
- `fees` (Int): Annual tuition fees.
- `rating` (Float): User or aggregate rating out of 5.0.
- `description` (String): Detailed text about the college.
- `image` (String, Optional): Image URL for the college.
- `createdAt` (DateTime): Timestamp of creation.

### 3. Course Model
Represents specific courses offered by colleges.
- `id` (String, CUID): Unique identifier.
- `name` (String): Name of the course.
- `duration` (String): Duration of the course (e.g., "4 Years").
- `fees` (Int): Total or annual fees for the specific course.
- `collegeId` (String): Foreign key referencing the `College` table.

### 4. Placement Model
Maintains placement statistics and recruiter data.
- `id` (String, CUID): Unique identifier.
- `highestPackage` (Float): Maximum salary package offered in LPA.
- `averagePackage` (Float): Average salary package offered in LPA.
- `placementRate` (Float): Percentage of students placed.
- `recruiters` (String[]): Array of top recruiting companies.
- `collegeId` (String): Foreign key referencing the `College` table.

### 5. Review Model
Stores user-generated reviews and ratings for colleges.
- `id` (String, CUID): Unique identifier.
- `rating` (Float): Rating given by the user.
- `comment` (String): Detailed review text.
- `userId` (String): Foreign key referencing the `User` table.
- `collegeId` (String): Foreign key referencing the `College` table.
- `createdAt` (DateTime): Timestamp of the review.

### 6. Cutoff Model
Records the opening and closing ranks for various competitive exams.
- `id` (String, CUID): Unique identifier.
- `exam` (String): Name of the entrance exam.
- `rank` (Int): The cutoff rank required for admission.
- `collegeId` (String): Foreign key referencing the `College` table.

### 7. SavedCollege Model
Tracks the colleges that a user has bookmarked or saved.
- `id` (String, CUID): Unique identifier.
- `userId` (String): Foreign key referencing the `User` table.
- `collegeId` (String): Foreign key referencing the `College` table.

### 8. Discussion Model
Represents forum topics or questions created by users.
- `id` (String, CUID): Unique identifier.
- `title` (String): Title of the discussion.
- `content` (String): Main body text of the discussion.
- `userId` (String): Foreign key referencing the `User` table.
- `createdAt` (DateTime): Timestamp of the post.

### 9. Answer Model
Stores replies to a specific discussion.
- `id` (String, CUID): Unique identifier.
- `content` (String): Text content of the answer.
- `discussionId` (String): Foreign key referencing the `Discussion` table.
- `createdAt` (DateTime): Timestamp of the reply.

## API Reference

### 1. Authentication (`/api/auth`)
- `POST /api/auth/register`
  - Description: Registers a new user and returns a JWT token.
- `POST /api/auth/login`
  - Description: Authenticates a user and returns a JWT token.
- `GET /api/auth/me`
  - Description: Retrieves the profile of the currently authenticated user (requires token).

### 2. Colleges (`/api/colleges`)
- `GET /api/colleges`
  - Description: Retrieves a list of colleges.
  - Query Parameters: `search`, `state`, `minFees`, `maxFees`, `rating`.
- `GET /api/colleges/trending`
  - Description: Fetches the top trending colleges ordered by rating.
- `GET /api/colleges/:id`
  - Description: Fetches detailed information for a specific college, including courses, reviews, cutoffs, and placements.

### 3. Compare (`/api/compare`)
- `POST /api/compare`
  - Description: Retrieves detailed data for multiple colleges to allow side-by-side comparison.
  - Body: `{ ids: string[] }`

### 4. Predictor (`/api/predictor`)
- `POST /api/predictor`
  - Description: Predicts eligible colleges based on the student's exam and rank.
  - Body: `{ exam: string, rank: number }`

### 5. Saved Colleges (`/api/saved`)
- `POST /api/saved`
  - Description: Saves a college to the user's bookmarks (requires token).
  - Body: `{ collegeId: string }`
- `GET /api/saved`
  - Description: Retrieves all colleges saved by the authenticated user (requires token).

### 6. Discussions (`/api/discussions`)
- `GET /api/discussions`
  - Description: Retrieves all forum discussions along with their answers.
- `POST /api/discussions`
  - Description: Creates a new discussion topic (requires token).
  - Body: `{ title: string, content: string }`
- `POST /api/discussions/:id/answer`
  - Description: Adds a reply/answer to a specific discussion (requires token).
  - Body: `{ content: string }`

### 7. Reviews (`/api/reviews`)
- `GET /api/reviews/:id`
  - Description: Retrieves all user reviews for a specific college.
- `POST /api/reviews`
  - Description: Adds a rating and review for a college (requires token).
  - Body: `{ rating: number, comment: string, collegeId: string }`

## Folder Structure

### Frontend (`/frontend`)
- `/src/app`: Contains Next.js App Router pages (`/colleges`, `/compare`, etc.) and layouts.
- `/src/components`: Reusable React components (Navbar, CollegeCard, Filters, ComparisonTable).
- `/src/store`: Zustand state management stores (e.g., `compareStore.ts` for comparison logic).
- `/src/types`: TypeScript interfaces and type definitions.

### Backend (`/backend`)
- `/prisma`: Contains the `schema.prisma` file and database seeding scripts (`seed.ts`).
- `/src/routes`: API route definitions handling incoming HTTP requests.
- `/src/controllers`: Business logic for querying the database and formatting responses.
- `/src/config`: Database connection and server configuration files.

## Future Roadmap
- Interactive Maps: Integrate map services to visualize college locations geographically.
- Real-time Forums: Build chat or forum features for prospective students to interact.
- Admin Dashboard: Provide a Content Management System (CMS) interface for administrators to manually manage and update college data.
