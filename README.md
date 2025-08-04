# 👐Volunteering Platform- HelpMates

A platform connecting volunteers with meaningful opportunities to contribute to social causes.

### Tech Stack

-Frontend

- Typescript
- Next JS
- Material UI
- Redux

-Backend

- Express JS
- Node JS
- Postgres
- Prisma

## Features

### 🧑‍💼 User Management

- ✅ **User Registration & Authentication** – Users can sign up and log in securely.
- 🔐 **Role-Based Access** – Supports `User` and `Admin` roles with different permissions.
- 📞 **User Profile** – Each user has a profile with name, email, and contact number.
- 🚀 **Active Status** – Users can be marked as active/inactive.
- 📌 **Application History** – Users can track their applied opportunities and statuses.

### 🎯 Volunteer Opportunities

- 📢 **Detailed Listings** – Each opportunity includes:
  - 📍 **Location**
  - 🏢 **Organization**
  - 🎓 **Skills Required**
  - ⏳ **Duration**
  - 🏆 **Benefits**
  - 📅 **Start & End Dates**
- 🔄 **Status Management** – Opportunities can be `OPEN` or `CLOSED`.
- 🖼️ **Images** – Each opportunity supports multiple images.

### 🔍 Search, Filter & Sort

- 🔎 **Search by**:
  - 📍 **Location**
  - 🏢 **Organization**
  - 🏷️ **Title**
- 🎚️ **Filter by**:
  - 📍 **Location**
  - 🎓 **Skills Required**
  - 📅 **Start Date**
- 📊 **Sort by**:
  - ⏳ **Duration**
  - 📅 **Start/End Dates**

### 📄 Volunteer Applications

- 📝 **Apply for Opportunities** – Users can submit applications.
- 🏅 **Provide Experience** – Users must share their previous volunteering experience.
- 🔄 **Application Status**:
  - 🟡 `PENDING`
  - ✅ `APPROVED`
  - ❌ `REJECTED`

### 🎛️ Admin Features

- 🛠️ **Manage Users** – View user details and update status/roles.
- 📢 **Manage Opportunities** – Add, update, or close volunteer opportunities.
- 🔄 **Review Applications** – Approve or reject volunteer applications.

## To run the file locally perform the following steps

### Clone the repository using the command

    -
    - cd my-repo
    - npm install

### Create a .env file and add the following url to use the backend

    - NEXT_PUBLIC_BACKEND_URL=https://assignment-8-cyan.vercel.app/api

### Use the following command to start the application

    - npm run build
    - npm run start or npm run dev

### Live Link

- https://help-mates-frontend-1fiy.vercel.app

###### To Test as Admin or Volunteer,you can use the below login credentials

- Admin: 
  Email:jane@gmail.com   
  Passowrd: jane1234

- Volunteer:
  Email: robert@gmail.com
  Password: robert123
