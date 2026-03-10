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

## Deployment

The application is deployed to **Azure App Service** with automated CI/CD via GitHub Actions.

### Production Environment

- **App Service**: [viber-hotspot.azurewebsites.net](https://viber-hotspot.azurewebsites.net)
- **Database**: Azure SQL Database (`viber-hotspot.database.windows.net`)
- **CI/CD**: GitHub Actions workflow on push to `main`

### Azure Setup

#### 1. Azure SQL Database

Create an Azure SQL Database:

```bash
# Create resource group
az group create --name viber-hotspot-rg --location eastus

# Create SQL server
az sql server create \
  --name viber-hotspot \
  --resource-group viber-hotspot-rg \
  --location eastus \
  --admin-user <admin-username> \
  --admin-password <secure-password>

# Create database
az sql db create \
  --name viber-hotspot-db \
  --server viber-hotspot \
  --resource-group viber-hotspot-rg \
  --service-objective S0
```

**Configure Firewall Rules:**
- Enable "Allow Azure services and resources to access this server"
- Add your local IP for running migrations: Azure Portal → SQL Server → Networking → Add client IP

#### 2. Azure App Service

Create an App Service:

```bash
# Create App Service plan
az appservice plan create \
  --name viber-hotspot-plan \
  --resource-group viber-hotspot-rg \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --name viber-hotspot \
  --resource-group viber-hotspot-rg \
  --plan viber-hotspot-plan \
  --runtime "DOTNET:9.0"
```

#### 3. Configure App Service Settings

Add these configuration settings in Azure Portal → App Service → Configuration:

**Connection Strings:**
```
Name: DefaultConnection
Value: Server=tcp:viber-hotspot.database.windows.net,1433;Initial Catalog=viber-hotspot-db;User ID=<username>;Password=<password>;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
Type: SQLAzure
```

**Application Settings:**
```
CloudinarySettings__CloudName=<your-cloud-name>
CloudinarySettings__ApiKey=<your-api-key>
CloudinarySettings__ApiSecret=<your-api-secret>
ASPNETCORE_ENVIRONMENT=Production
```

#### 4. Run Initial Migrations

From your local machine:

```bash
# Add your IP to SQL firewall first, then:
dotnet ef database update \
  --connection "Server=tcp:viber-hotspot.database.windows.net,1433;Initial Catalog=viber-hotspot-db;User ID=<admin-username>;Password=<password>;Encrypt=True;TrustServerCertificate=False;Connection Timeout=120;" \
  --project Persistence \
  --startup-project API
```

Or let the app run them automatically on first deployment (configured in `Program.cs`).

### GitHub Actions CI/CD

The deployment workflow (`.github/workflows/main_viber-hotspot.yml`) automatically:

1. **Builds** the React frontend with pnpm
2. **Builds** the .NET API
3. **Publishes** the API with bundled frontend
4. **Deploys** to Azure App Service using OpenID Connect authentication

**Required GitHub Secrets:**
- `AZUREAPPSERVICE_CLIENTID_*` - Azure service principal client ID
- `AZUREAPPSERVICE_TENANTID_*` - Azure tenant ID
- `AZUREAPPSERVICE_SUBSCRIPTIONID_*` - Azure subscription ID

These are automatically generated when you set up deployment from Azure Portal → Deployment Center.

### Manual Deployment

If needed, you can deploy manually:

```bash
# Build frontend
cd client
pnpm install
pnpm run build

# Publish backend (includes frontend from wwwroot)
cd ../API
dotnet publish -c Release -o ./publish

# Deploy to Azure
az webapp deploy \
  --resource-group viber-hotspot-rg \
  --name viber-hotspot \
  --src-path ./publish \
  --type zip
```

### Monitoring

- **Application Insights**: Monitor performance and errors
- **Log Stream**: Azure Portal → App Service → Log stream for real-time logs
- **Metrics**: Track CPU, memory, response times

### Troubleshooting

**Database Connection Issues:**
- Verify firewall rules include Web App's outbound IPs
- Check connection string format in Configuration
- Review Azure SQL networking settings

**Build Failures:**
- Ensure pnpm version matches `pnpm-lock.yaml` (currently v9)
- Check GitHub Actions logs for specific errors
- Verify all secrets are configured correctly

**Migration Issues:**
- Check if `__EFMigrationsHistory` table exists in database
- Manually run migrations if automatic migration fails
- Ensure SQL user has sufficient permissions

## License

MIT - the license king
