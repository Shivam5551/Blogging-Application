# Blogging Application

A full-stack blogging application built with **Hono.js** for the backend and **React.js** for the frontend. The backend is deployed on **Cloudflare Workers**, and the frontend is hosted on **Vercel**. It includes features like user authentication, blog creation, editing, and publishing. The project is fully type-safe and uses modern tools for scalability.

## Tech Stack

### Backend:
- **Hono.js** - Fast, lightweight web framework  
- **Cloudflare Workers** - Serverless backend deployment  
- **bcrypt-edge** - Secure password hashing  
- **Prisma ORM** - Database management  
- **PostgreSQL** - Relational database  
- **Accelerate** - Connection pooling for Prisma  
- **Zod** - Schema validation for backend and frontend  
- **TypeScript** - Type safety throughout the application  

### Frontend:
- **React.js** - UI framework  
- **TypeScript** - Better developer experience  
- **Tailwind CSS** - Styling  
- **Fully Responsive** - Works on all devices  
- **Loaders** - Better UX  

## Features

- User authentication (signup & signin)  
- Blog creation, editing, and deletion  
- Publish or unpublish blogs  
- Fetch user blogs from the `/userblogs` route  
- End-to-end validation using Zod  
- API available as a public **npm package**  

## Deployment

- **Backend URL:** [https://backend.shivamtiwarix88.workers.dev](https://backend.shivamtiwarix88.workers.dev)  
- **Frontend URL:** [https://blogging-application-blue.vercel.app/signin](https://blogging-application-blue.vercel.app/signin)  