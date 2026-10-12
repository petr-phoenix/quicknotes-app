 Quick Note App

Quick Note App is a responsive web application designed for categorized note-taking directly in your browser. Built with semantic HTML5,  CSS flexbox styling, and JavaScript, it allows users to easily organize, search, and manage their daily notes grouped into Personal, Work, and Study categories without requiring a backend database.

## Features

* **Cretaes notes categorized into Personal, Work,  or **Study**, each styled with distinct left border accent colors and visual tags.

* **it automatically saves notes to the browser's `localStorage` using `JSON.stringify` and restores them using `JSON.parse` upon reloading the page.

* **Allows Instant search filtering as you type, with feedback "No notes match your search" feedback when no results match.

* **Restricts empty note submissions ("Please type a note first.") and enforces a 200-character limit ("Notes must be 200 characters or fewer.").

* **Tracks and displays total notes using correct singular/plural phrasing ("You have no notes yet.", "You have 1 note.", "You have N notes.").

* **Adaptive Flexbox design that automatically stacks form controls vertically on mobile screens (600px or narrower).

* **Safely constructs elements with `document.createElement` and `textContent` to prevent Cross-Site Scripting (XSS) risks.

## How to Run Locally

1. **Clone this repository or download the source files to your local computer.

2. **Make sure `index.html`, `style.css`, and `script.js` are saved in the same root directory folder.

3. **Open in Browser:**

   * Double-click `index.html` to open it directly in any modern web browser (Google Chrome, Mozilla Firefox).

   * Alternatively, open the folder in an code editor like VS Code and launch the app using an extension such as *Live Server*.

## What I Learned

1. **Safely rendering dynamic user content requires avoiding `innerHTML` when handling raw input. Utilizing `document.createElement()` and assigning values with `.textContent` ensures that user inputs are rendered strictly as text nodes, preventing security vulnerabilities like script injection.

2. **Storing application state inside an array of JS objects and keeping it synchronized with `localStorage` through `JSON.stringify` and `JSON.parse` provides a smooth, client-side data lifecycle across page reloads.

3. **Using CSS Flexbox for form elements combined with a `@media (max-width: 600px)` media query allows for smooth transitions between horizontal desktop controls and stacked, full-width mobile interfaces.
