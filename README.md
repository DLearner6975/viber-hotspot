# Viber Hotspot

A full-stack social activity platform where users can create, join, and discuss local events. Built with **ASP.NET Core 9** and **React 19**, following Clean Architecture principles.

## Features

- Browse, create, edit, and delete activities
- Attend or host activities
- Real-time comments via SignalR
- User authentication and profile management
- Photo uploads with image cropping (Cloudinary)
- Interactive maps (Leaflet)
- Follow/unfollow other users
- Paginated activity feeds

## Tech Stack

### Backend

| Layer          | Technology                                   |
| -------------- | -------------------------------------------- |
| API            | ASP.NET Core 9, SignalR                      |
| Application    | MediatR (CQRS), AutoMapper, FluentValidation |
| Identity       | ASP.NET Core Identity, Role-based auth       |
| Persistence    | Entity Framework Core 9, SQL Server          |
| Infrastructure | Cloudinary (photo storage)                   |

### Frontend

| Concern   | Technology                    |
| --------- | ----------------------------- |
| Framework | React 19, TypeScript, Vite    |
| UI        | Material UI v7, Framer Motion |
| State     | MobX, TanStack React Query v5 |
| Routing   | React Router v7               |
| Forms     | React Hook Form, Zod          |
| Maps      | React Leaflet                 |
| HTTP      | Axios                         |
| Real-time | @microsoft/signalr            |

## Project Structure

```
viber-hotspot/
├── Domain/          # Core entities (Activity, User, Comment, Photo, …)
├── Application/     # CQRS handlers, DTOs, validators, interfaces
├── Infrastructure/  # Cloudinary service, authorization handlers
├── Persistence/     # EF Core DbContext, migrations, seed data
├── API/             # ASP.NET Core Web API, SignalR hub, controllers
└── client/          # React + TypeScript SPA (Vite)
```

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (for the SQL Server database)
- A [Cloudinary](https://cloudinary.com/) account (for photo uploads)

## Getting Started

### 1. Start the database

```bash
docker-compose up -d
```

This spins up a SQL Server 2022 instance on port `1433`.

### 2. Configure the API

Add your Cloudinary credentials and connection string to `API/appsettings.Development.json`:

```json
{
    "ConnectionStrings": {
        "DefaultConnection": "Server=localhost,1433;Database=Reactivities;User Id=sa;Password=Password@1;TrustServerCertificate=true"
    },
    "CloudinarySettings": {
        "CloudName": "<your-cloud-name>",
        "ApiKey": "<your-api-key>",
        "ApiSecret": "<your-api-secret>"
    }
}
```

### 3. Run the backend

```bash
cd API
dotnet run
```

The API starts at `https://localhost:5001`. On first run, EF Core applies migrations and seeds sample data automatically.

### 4. Run the frontend

```bash
cd client
pnpm install
pnpm dev
```

The frontend starts at `https://localhost:3000`.

## API Endpoints

| Resource           | Base Path                     |
| ------------------ | ----------------------------- |
| Identity           | `/api/login`, `/api/register` |
| Activities         | `/api/activities`             |
| Profiles           | `/api/profiles`               |
| Photos             | `/api/photos`                 |
| Comments (SignalR) | `/comments`                   |

## License

MIT - the license king
