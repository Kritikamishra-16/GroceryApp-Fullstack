# GroceryApp

This is a web application for an online grocery store. It consists of a frontend Angular application (GroceryAppUI) and a backend ASP.NET API (GroceryAppAPI). The application allows users to browse and order groceries online.
This is a web application that allows users to view and purchase products. It provides different views based on user roles (anonymous users, logged-in users, and admins). The application allows users to sign up, log in, browse products by category, search for products, add products to the cart, place orders, and view their order history.

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

## Features
### Anonymous User View
- View Login and Signup buttons in the application header.
- View the list of products.
- Browse products by category and search by product name or description.
- Support pagination and sorting for the list of products.
- Clicking on a product should redirect to the product details page.

<br>
  <img width="960" alt="Screenshot 2023-07-19 125019" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/1393e2e4-3d60-428f-b8a1-dc83d1190920">

<br>
  <img width="960" alt="Screenshot 2023-07-19 125055" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/5755a5cb-456d-4d8e-a457-eb03c769634a">
<br>

### Signup and Login
- Implement a signup and login mechanism for users.
<br>
<img width="960" alt="Screenshot 2023-07-19 125132" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/71be4e6f-18ff-40aa-b0a4-1147eafa5172">

<br>

<img width="960" alt="Screenshot 2023-07-19 125150" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/be608ec9-3cb5-4bde-8cb2-ab4906add5b6">

<br>
  

### Logged-in User View
- View Full Name, View Cart, My Orders, and Sign-out button in the application header. Login and Signup buttons will be hidden.
- Have the same functionality as the anonymous user view.
- Show "No Items in Cart" message on the cart page if the user's cart is empty.
- Allow logged-in users to add products to their cart, view their cart, and remove products from their cart.
- Show "Add to Cart" button and Quantity dropdown on the product detail page. Users should choose the quantity and click "Add" to add the product to the cart.
- Show "Out of Stock" instead of "Add to Cart" button if the product's available quantity is zero.
- The cart page will have a Place Order button. Upon clicking on the Place Order button, generate a unique order id and notify it to the user. The cart should be refreshed. Handling address and payment is not required. Subsequently, update the quantity of the product(s) ordered.
- View their orders using the My Orders Page.

<br>

<img width="960" alt="Screenshot 2023-07-19 125527" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/5a461fe7-6e20-49a1-86cc-0303008099c7">

<br>

<img width="960" alt="Screenshot 2023-07-19 125617" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/89314975-de30-48d4-9537-f585ac0fdce3">

<br>

<img width="960" alt="Screenshot 2023-07-19 125814" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/eef6ff1c-9b0d-4102-b22d-7fc0cb08c92d">

<br>

<img width="960" alt="Screenshot 2023-07-19 125825" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/b7b34e54-0c57-4d13-84bf-d30409525ac3">

<br>

<img width="960" alt="Screenshot 2023-07-19 125844" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/4286708e-cd2e-4304-b657-b322074c00a4">

<br>

<img width="960" alt="Screenshot 2023-07-19 125951" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/c2e5ad3d-63a8-4ef4-bf9b-47a31925e79c">

<br>

<img width="960" alt="Screenshot 2023-07-19 130049" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/d1333624-966a-46a6-8487-2eef15aebc48">

<br>
<img width="960" alt="Screenshot 2023-07-19 130119" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/c9fa0bd1-4229-43c2-908c-39e85c8c0cbe">

 <br> 

### Dashboard for Admin Users
- Login with admin credentials will redirect to the admin view.
- Application should have support for multiple admins (identified based on "isAdmin" flag in the database).
- After successful login, the admin lands on the admin-product-listing page with edit and delete buttons where they can edit/delete products.
- Admin can add new products using the Add Product button in the application header.
- Add new product should ask for the necessary inputs from the admin.

<br>
<img width="960" alt="Screenshot 2023-07-19 130218" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/d1fced8d-c104-43e7-ba86-aec18c53748e">

<br>
<img width="960" alt="Screenshot 2023-07-19 130235" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/4dfc6c49-362d-4cd5-82f8-2c09e7f41276">

<br>
<img width="960" alt="Screenshot 2023-07-19 130311" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/5fb1cd53-aa51-4aa1-879a-3fc7d1ca9cca">

<br>

<img width="960" alt="Screenshot 2023-07-19 130332" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/1e00206e-8c79-4d52-98c9-fb13112efeb0">

<br>
<img width="960" alt="Screenshot 2023-07-19 130405" src="https://github.com/Kritikamishra-16/GroceryApp-Fullstack/assets/67709501/f6085bcb-a80a-4380-9ade-c928a2268299">

<br>
## Contributing

Contributions to this project are welcome. Feel free to fork the repository and submit pull requests with your improvements or bug fixes.

