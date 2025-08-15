Superheroes App

A simple web application to manage a superhero database.
You can create, edit, delete, and view superheroes with their images, superpowers, and catch phrases.

Built with:

Backend: NestJS, Prisma, PostgreSQL

Frontend: React, React Router, React Query

File Upload: Local/Cloud storage via uploadFile API

Testing: Jest (unit tests for backend logic)

Features

List superheroes with pagination (5 items per page)

View superhero details with all images and info

Create new superheroes with image upload

Edit existing superheroes and manage images

Delete superheroes

Prerequisites

Node.js v20+

PostgreSQL database

npm

Backend Setup

Go to backend folder:

cd backend

Install dependencies:

npm install

Configure .env file:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/superheroes_db?schema=public"

Run Prisma migrations:

npx prisma migrate dev --name init

Start backend server:

npm run start:dev

Run backend tests:

npm run test

Frontend Setup

Go to frontend folder:

cd frontend

Install dependencies:

npm install

Start React development server:

npm start

API Endpoints

GET /superheroes – list superheroes (supports page query)

GET /superheroes/:id – get superhero details

POST /superheroes – create superhero

PUT /superheroes/:id – update superhero

DELETE /superheroes/:id – delete superhero

POST /upload – upload image

Tech Stack
Layer Technology
Backend NestJS, Prisma, PostgreSQL
Frontend React, React Query, React Router
Testing Jest
Scripts

Backend

npm run start:dev # start dev server
npm run test # run tests

Frontend

npm start # start frontend
