<br />
<div align="center">
  <a href="">
    <img src="https://img.icons8.com/?size=100&id=13724&format=png&color=000000" alt="Logo" width="150px">
  </a>

  <h3 align="center">Recipenation Web App - Mobile Version</h3>

  <p align="center">
    <a href="https://github.com/ilhamyusuf27/chatque/issues">Report Bug</a>
    ·
    <a href="https://github.com/ilhamyusuf27/chatque/issues">Request Feature</a>
  </p>
</div>

Chatque is a simple, frontend-only chat application built with **Vue.js** and **TypeScript**. It allows users to select a chat room, view messages, and send new ones in a clean, modern interface. This project was developed as a technical assessment for a frontend engineer position.

---

## Features

- **Room List**: View all available chat rooms with their last message and timestamp.
- **Dynamic Chat View**: Select any room to instantly view its message history.
- **Message Input**: Send messages easily with an auto-resizing text area.
- **Modern Chat Layout**: A bottom-anchored, reverse-scrolling message list ensures the latest messages are always in view.
- **URL Routing**: Access specific chat rooms directly via their URL (e.g., `/chat/room-123`).
- **Persistent Messages**: Chat history is saved to the browser's local storage, so messages are not lost on page reload.

---

## Tech Stack

- **Framework**: Vue.js 3
- **State Management**: Vuex
- **Routing**: Vue Router
- **Language**: TypeScript
- **Package Manager**: pnpm
- **UI/Styling**: CSS with custom properties (variables)

---

## Project Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/ilhamyusuf27/chatque.git
    ```

2.  **Navigate to the project directory:**

    ```sh
    cd chatque
    ```

3.  **Install dependencies using pnpm:**

    ```sh
    pnpm install
    ```

4.  **Run the development server:**

    ```sh
    pnpm dev
    ```

    The application will be available at `http://localhost:5173` or another specified port.
