
---

# 🧱 Project Structure

This document outlines the purpose of the main folders in this project and provides examples of what each folder might contain.

---

## `src/`

### 🧩 `src/components/`

This folder contains **reusable UI components** that can be used across different parts of the application. These are mostly **presentational** and focus on layout or styling rather than business logic.

**Examples:**

* `Button.jsx` — a customizable button component used throughout the app.
* `Navbar.jsx` — top navigation bar for all pages.
* `Card.jsx` — reusable container for displaying user or bill information.
* `Modal.jsx` — reusable modal component for pop-ups or confirmations.
* `InputField.jsx` — styled input component with validation messages.

---

### 🧭 `src/pages/`

This folder holds **top-level page components**, each corresponding to a specific route or screen in the app.

**Examples:**

* `HomePage.jsx` — landing page introducing Splitaire.
* `DashboardPage.jsx` — main screen after login, showing all bills and groups.* `SplitBillPage.jsx` — page for creating or viewing a bill split.
* `LoginPage.jsx` — authentication screen for users to log in.
* `SignupPage.jsx` — user registration page.

---

### 🪝 `src/hooks/`

This folder contains **custom React hooks**. Custom hooks let you encapsulate logic and reuse it across components.

**Examples:**

* `useFetch.js` — handles API requests with loading and error states.
* `useAuth.js` — manages user authentication and session handling.
* `useWindowSize.js` — tracks the user’s screen size for responsive design.
* `useDebounce.js` — delays an input value for better performance in search fields.

---

### ⚙️ `src/services/`

This folder handles all **API interactions** and data-fetching logic.
It helps you separate the UI from backend communication.

**Examples:**

* `api.js` — base Axios setup or fetch wrapper for all HTTP requests.
* `authService.js` — handles login, signup, and token refresh requests.
* `billService.js` — manages API calls for creating, fetching, and splitting bills.
* `groupService.js` — handles API interactions for group management.

---

### 🧮 `src/utils/`

This folder holds **utility functions** — small, pure functions used throughout the app.

**Examples:**

* `formatCurrency.js` — converts numbers into currency format.
* `calculateShare.js` — splits bill amounts evenly or by percentage.
* `validateEmail.js` — checks if an email input is valid.
* `storage.js` — helpers for reading/writing to `localStorage` or `sessionStorage`.

---

### 🌍 `src/contexts/`

This folder manages **global state** using React’s Context API — ideal for app-wide data like authentication, user preferences, or theme.

**Examples:**

* `AuthContext.jsx` — stores user login state and token info.
* `ThemeContext.jsx` — handles dark/light mode and color themes.
* `BillContext.jsx` — stores current bill data accessible across pages.

---
