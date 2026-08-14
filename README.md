# ResumeFlow

Full-stack resume builder starter using Node.js, Express, MySQL, HTML, CSS and JavaScript.

## Setup
1. Install Node.js 18+ and MySQL 8+.
2. Run `mysql -u root -p < database/resumeflow.sql`.
3. Copy `.env.example` to `.env` and enter your MySQL password.
4. Run `npm install`.
5. Run `npm start`.
6. Open http://localhost:3000

## API
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/resumes
POST /api/resumes
GET /api/resumes/:id
PUT /api/resumes/:id
DELETE /api/resumes/:id
