# GroceryApp

This is a web application for an online grocery store. It consists of a frontend Angular application (GroceryAppUI) and a backend ASP.NET API (GroceryAppAPI). The application allows users to browse and order groceries online.

## Prerequisites

Before running the project, ensure that you have the following software installed:

- Visual Studio Code
- Visual Studio (for the API)
- Node.js and npm
- SQL Server Management Studio (SSMS)

## Setup Instructions

Follow these steps to run the project:

### Step 1: Frontend Setup (GroceryAppUI)

1. Open the `GroceryAppUI` folder in Visual Studio Code.
2. Open the terminal and install the `ng-angular-popup` package by running the following command:
```bash 
npm install ng-angular-popup
```
3. Install the `ngb-rating` module by running the following command:
```bash 
ng add @ng-bootstrap/ng-bootstrap
```

### Step 2: Backend Setup (GroceryAppAPI)

1. Open the Solution File (`GroceryAppAPI.sln`) in Visual Studio.
2. Install the following NuGet Packages in Visual Studio:
- Microsoft.AspNetCore.Authentication.JwtBearer (Version similar to your .NET version)
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
3. Add the Migration and Update the Database using your local SQL Server.
4. Install the `ngx-pagination` module by running the following command in the terminal:
```bash
npm install ngx-pagination --force
```

### Step 3: Connect with Database in SSMS

Ensure that you have a SQL Server instance set up and running. Connect to the database using SQL Server Management Studio (SSMS) and make sure the database is accessible.

### Step 4: Run the Project

1. Open a terminal in the `GroceryAppUI` folder and run the following command to start the frontend application:
```bash
ng serve
```
2. In Visual Studio, build and run the backend API project (`GroceryAppAPI`) using the appropriate launch settings.

## Usage

Once the project is running, open your web browser and navigate to `http://localhost:4200` to access the GroceryAppUI frontend. You can now browse and order groceries online.

## Contributing

Contributions to this project are welcome. Feel free to fork the repository and submit pull requests with your improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

