<p align="center">
    <h1 align="center">GEO-TAG-FRONTEND</h1>
</p>

## Project Title & Description

This project is a frontend web application for the Geo-Tag system, built with React, TypeScript, Vite, and Tailwind CSS. It allows users to register, log in, and interact with geolocated notes on an interactive map. The frontend communicates with a RESTful backend API.

---

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** (Version >= 16 is recommended)
- **npm:** (npm >= 8)
- **A running instance of the [geo-tag-backend](https://github.com/Marcel-zb96/geo-tag-backend))**

---

## Installation & Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Marcel-zb96/geo-tag-frontend.git
    cd geo-tag-frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure Environment:**

    - Copy `.env.example` to `.env` file.
    - Set `VITE_SERVER_BASE_URL` to the backend server URL (e.g., `http://localhost:3000`).

4. **Run the frontend app:**

    ```bash
    npm run dev
    ```
    This will start the Vite development server. The app will be available at `http://localhost:5173` by default.

---

## Architectural Choices

- **Component-Based Architecture:**
    - The app is structured around reusable React components (e.g., forms, map, header, note cards).
    - Pages are composed from these components for maintainability and scalability.

- **React + TypeScript:**
    - TypeScript provides type safety and better developer experience.
    - React is used for building the UI and managing state.

- **Tailwind CSS:**
    - Used for rapid, utility-first styling.

- **React Query:**
    - Handles data fetching, caching, and mutation for API calls.

- **React Router:**
    - Manages client-side routing for pages (login, register, map, etc).

- **Leaflet & React-Leaflet:**
    - Provides interactive map functionality for geolocated notes.

---

## Assumptions

- The backend API is available and running at the URL specified in `.env`.
- The app is intended for modern browsers with ES2022+ and CSS support.

---

## SOLID Principles in This Project

- **Single Responsibility:**
    - Each component (e.g., `NoteCard`, `NewNoteForm`, `GeoMapContainer`) has a focused responsibility.
    - API logic is separated into the `query/` directory.

- **Open/Closed:**
    - Components and API functions are designed to be extended (e.g., new note features) without modifying existing code.

---


## How to Use

- **Register:** Create a new account.
- **Login:** Access your notes and the map.
- **Map:** View, create, update, and delete geolocated notes.
- **Logout:** End your session securely.

---
