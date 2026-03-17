# 🎬 Movie Explorer App

A modern movie browsing web app built with **React + TypeScript + TMDB API**.
Users can search, filter, and explore movies.

---

## 🚀 Features

### 🔍 Search & Discovery

* Real-time movie search (with fallback to English)
* Discover movies by:

  * Genre 🎭
  * Popularity 🔥
  * Rating ⭐
  * Release date 📅

### 🎞 Movie Detail Page

* Full movie information:

  * Title
  * Overview
  * Rating
  * Runtime
  * Genres
* Cast list (horizontal scroll)
* Trailer (YouTube popup)

### 🎥 Trailer Feature

* Watch official trailers
* Auto-play in modal popup

### 🔄 Infinite Scroll

* Smooth infinite loading
* No pagination needed
* Powered by TanStack Query

### 🎯 Similar Movies

* “More Like This” section
* Horizontal slider (Netflix style)

### 🖱 Hover Preview (Netflix Style)

* Hover on movie card:

  * Show title
  * Show rating
  * Show year

### 📱 Responsive Design

* Fully responsive (desktop + mobile)
* Mobile navigation menu
* Smooth UX interactions

---

## 🛠 Tech Stack

* ⚛️ React (Vite)
* 🔷 TypeScript
* 🎨 Tailwind CSS
* 🔄 TanStack Query
* 🧠 Zustand (optional state)
* 🎬 TMDB API
* 🌐 React Router

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/zulian026/MovieExplorer.git
cd MovieExplorer
```

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

---

## 🔑 Environment Variables

Create `.env` file:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

Get your API key from:
👉 https://www.themoviedb.org/settings/api

---

## 📂 Project Structure

```
src/
 ├ components/
 │   ├ Header.tsx
 │   ├ HeroSlider.tsx
 │   ├ MovieCard.tsx
 │   ├ MovieRow.tsx
 │   ├ FilterBar.tsx
 │   ├ LanguageSwitcher.tsx
 │   └ RegionSwitcher.tsx
 │
 ├ pages/
 │   ├ Home.tsx
 │   └ MovieDetail.tsx
 │
 ├ services/
 │   └ tmdb.ts
 │
 ├ hooks/
 │   └ useScrollSpy.ts
 │
 ├ types/
 │   └ movie.ts
 │
 └ lib/
     └ i18n.ts
```

---

## 🧠 Key Concepts

### 🔁 Smart Language System

* Uses `language` param from TMDB
* Fallback to English if data is missing

### 🔄 Infinite Query

* Uses `useInfiniteQuery`
* Automatically loads next page on scroll

### 🎯 Conditional Rendering

Priority system:

```
Search > Filter > Default
```

---

## 📸 Screenshots (optional)

Add screenshots here 👇

* Home Page
* Movie Detail
* Trailer Modal
* Mobile View

---

## 🔮 Future Improvements

* 🔥 Hover trailer autoplay
* ❤️ Add to favorites
* 🔐 Authentication
* 🔎 Search autocomplete
* 🎤 Voice search
* 📊 Movie analytics dashboard

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Credits

* API by The Movie Database
* Inspired by Netflix UI

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
