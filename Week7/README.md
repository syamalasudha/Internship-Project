# React E-Commerce Frontend (Production-Quality)

A highly responsive, production-quality, and visually polished E-Commerce Frontend application built with React, React Router v6, Context API, and modern custom CSS. It connects to the live `FakeStoreAPI` to retrieve product collections and simulates authentication, stock management, and secure order checkouts entirely within local browser storage.



## 🚀 Key Features

### 🛒 Product Catalog & Discovery
* **Live API Feed**: Fetches real-time products, categorization lists, and details directly from `https://fakestoreapi.com`.
* **Instant Text Search**: Dynamically filters catalog items by title, description, or category matching.
* **Category Filtering**: Restricts catalog displays instantly via custom drop-down controls.
* **Price & Rating Sorters**: Rearranges matched results on-the-fly (e.g. low-to-high, high-to-low, and highest rated).
* **Loading & Error Tolerances**: Shows skeleton loading spinners and graceful retry boundaries on API fetch exceptions.

### 🔍 Product Details Page
* Displays high-resolution photography, price markers, categorizations, and detailed descriptions.
* **Manual Quantity Counter**: Multi-item additions using responsive count stepper controllers.
* **Simulated Stock Tracker**: Generates realistic unit availability counters using deterministic item indicators.

### 🛍️ Persistent Shopping Cart
* Adds, updates quantity, and removes individual products dynamically.
* Tracks live running tallies for **Subtotals**, **8% Estimated Taxes**, and **Flat Delivery Fees** (Free above $100.00).
* Saves cart contents automatically inside browser `localStorage` across page reloads.

### 🔒 Local User Authentication
* Registers new accounts, encrypts passwords into browser records, and automatically logs users in.
* Validates credentials against storage and keeps users logged in via persistent session cookies/tokens.
* Displays customized user greeting blocks directly in the navigation bar.

### 💳 Secure Checkout & Verification
* **Customer Info Forms**: Captures name, email, phone number, and physical shipping address.
* **Credit Card Simulators**: Validates name on card, CVVs, expirations, and standard 16-digit billing credit cards.
* **Form Validation**: Asserts structure validity (such as phone length or email pattern compliance) with inline warning feedback.
* **Successful Checkout Transitions**: Empties active shopping bags, registers orders under dynamic transaction references (`ORD-XXXXXX`), and displays beautiful order receipts.



## 📂 Strict Folder Structure

src/
├── App.tsx                     # Navigation Router, Authenticator screens, Protected Routes
├── main.tsx                    # React Entrypoint Mount
├── index.css                   # Global imports linking stylesheet assets
│
├── components/
│   ├── Navbar/
│   │   └── Navbar.tsx          # Responsive navigation links & cart count badges
│   ├── ProductList/
│   │   └── ProductList.tsx    # Filter bar, search query fields, and card grids
│   ├── ProductCard/
│   │   └── ProductCard.tsx    # Individual card layouts with rating rows
│   ├── Cart/
│   │   └── Cart.tsx            # Full shopping bag lists & pricing panels
│   └── Checkout/
│       └── Checkout.tsx        # Shipping & Billing forms with pattern validations
│
├── pages/
│   ├── Home.tsx                # Catalog index view wrapper
│   ├── ProductDetail.tsx       # Dynamic product spec & add steppers
│   ├── CartPage.tsx            # Main bag wrapper
│   └── CheckoutPage.tsx        # Secure payments viewport
│
├── contexts/
│   ├── AuthContext.tsx         # User login registries & session states
│   └── CartContext.tsx         # Shopping bag item array steppers & total formulas
│
├── hooks/
│   └── useProducts.ts          # API query queues, category filters, text matchers
│
├── services/
│   └── api.ts                  # REST Client definitions for FakeStoreAPI
│
└── styles/
    └── global.css              # Custom variables, glassmorphic grids, transitions

## 🛠️ Installation & Setup

1. **Install Dependencies**:
 bash
   npm install


2. **Launch Development Server**:
   bash
   npm run dev


3. **Production Compilation**:
  bash
   npm run build

