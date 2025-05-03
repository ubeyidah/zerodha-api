
# Zerodha API

This is a backend API built with **Node.js**, **Express**, and **MongoDB** for managing user authentication, holdings, positions, and orders in a stock trading platform.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [License](#license)

---

## 🚀 Features

- 🔐 User authentication (signup, login, logout, profile)
- 📈 CRUD operations for holdings, positions, and orders
- 🔑 JWT-based route protection
- ✅ Request body validation with Joi
- 💾 MongoDB integration using Mongoose
- ⚙️ Centralized error handling middleware

---

## 🛠️ Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **Joi** – Request validation
- **jsonwebtoken** – JWT auth
- **dotenv** – Environment variable config
- **cookie-parser** – Cookie handling

---

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/ubeyidah/zerodha-api
cd zerodha-api
pnpm install
````

2. **Create a `.env` file** in the root directory and configure the variables (see [Environment Variables](#environment-variables)).

3. **Start the development server**

```bash
pnpm run dev
```

By default, the API runs at [http://localhost:3000](http://localhost:3000)

---

## 🌐 Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=dev
```

---

## 📁 Folder Structure

```
zerodha-api/
├── config/
│   └── db.js
├── controllers/
│   ├── authControllers.js
│   ├── holdingControllers.js
│   ├── orderControllers.js
│   └── positionControllers.js
├── middlewares/
│   └── protectMiddleware.js
├── models/
│   ├── holdingModel.js
│   ├── orderModel.js
│   ├── positionModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   ├── holdingRoutes.js
│   ├── orderRoutes.js
│   └── positionRoutes.js
├── utils/
│   └── genAndSetToken.js
├── validations/
│   ├── authValidation.js
│   └── orderValidation.js
├── .gitignore
├── index.js
├── package.json
└── pnpm-lock.yaml
```

---

## 📦 API Endpoints

### 🔐 Authentication (`/api/v2/auth`)

| Method | Endpoint | Description      | Protected |
| ------ | -------- | ---------------- | --------- |
| POST   | /signup  | Register user    | ❌ No      |
| POST   | /login   | Login user       | ❌ No      |
| POST   | /logout  | Logout user      | ✅ Yes     |
| GET    | /profile | Get user profile | ✅ Yes     |

### 💼 Holdings (`/api/v2/holdings`)

| Method | Endpoint | Description  | Protected |
| ------ | -------- | ------------ | --------- |
| GET    | /        | Get holdings | ✅ Yes     |

### 📊 Positions (`/api/v2/positions`)

| Method | Endpoint | Description       | Protected |
| ------ | -------- | ----------------- | --------- |
| GET    | /        | Get all positions | ✅ Yes     |

### 📃 Orders (`/api/v2/orders`)

| Method | Endpoint | Description      | Protected |
| ------ | -------- | ---------------- | --------- |
| GET    | /        | Get user orders  | ✅ Yes     |
| POST   | /buy     | Place buy order  | ✅ Yes     |
| POST   | /sell    | Place sell order | ✅ Yes     |

---

## ✅ Validation

### 🔐 Authentication Validation (`authValidation.js`)

**Signup:**

* `username`: string, 3–30 chars, required
* `email`: valid email, required
* `password`: string, 6–100 chars, required

**Login:**

* `email`: valid email, required
* `password`: string, 6–100 chars, required

### 🧾 Order Validation (`orderValidation.js`)

**Order:**

* `name`: string, 1–100 chars, required
* `qty`: integer, min 1, required
* `price`: positive float (2 decimals), required
* `mode`: `"buy"` or `"sell"`, required

---

## ❌ Error Handling

A global error-handling middleware is defined in `index.js`:

```js
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.name,
  });

  console.error(err.stack);
});
```

This ensures consistent and secure error responses across the API.

---

## 📄 License

This project is licensed under the **ISC License**.

---

> Built with ❤️ using Node.js, Express, and MongoDB

