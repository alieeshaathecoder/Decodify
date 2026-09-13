# Decodify 🚀

> AI-Powered Code Editor with Intelligent Code Explanations, Dry Run Visualization, and Flowchart Generation
---

## 📖 Overview

Decodify is an AI-powered code editor designed to help developers and students understand code more effectively. Unlike traditional code editors that only execute code and display output, Decodify explains code step-by-step using AI and automatically generates visual flowcharts to represent program logic.

The platform combines code execution, AI-powered analysis, dry-run visualization, and flowchart generation into a single learning-focused environment, making programming more interactive and easier to understand.

---

## ✨ Features

### 💻 Monaco Code Editor

* Professional coding experience powered by Monaco Editor.
* Syntax highlighting and smart editing features.
* Fast and responsive coding environment.

### ⚡ Code Execution

* Execute code directly within the application.
* Instant output generation.
* Smooth coding workflow.

### 🤖 AI-Powered Code Explanation

* Generates detailed explanations for submitted code.
* Breaks down complex logic into understandable steps.
* Helps beginners understand programming concepts faster.

### 🔄 Automatic Flowchart Generation

* Converts code logic into visual flowcharts.
* Powered by Mermaid.js.
* Makes algorithms easier to understand and debug.

### 🧪 Dry Run Visualization

* Visualizes code execution step-by-step.
* Helps users understand variable changes and loop execution.
* Useful for debugging and learning program flow.

### 🎓 Learning-Oriented Platform

* Designed for students and self-learners.
* Simplifies programming concepts.
* Encourages visual and interactive learning.

---

## 🧪 Current Development Status

Decodify is actively being developed and improved.

### Current Implementation Status

* ✅ Code execution is functional.
* ✅ AI-powered code explanation is functional.
* ✅ Monaco Editor integration is functional.
* ✅ Mermaid flowchart generation is functional.
* ✅ Basic dry-run visualization is functional.
* ⚠️ Dry Run currently supports basic **for-loop execution only**.

### Planned Improvements

Future updates will extend Dry Run support to:

* While loops
* Nested loops
* Conditional statements (if-else)
* Functions and recursion
* Arrays and data structures
* Complex algorithms

This limitation is intentionally documented to maintain transparency regarding the project's current capabilities while highlighting ongoing development efforts.

---

## 🛠️ Technology Stack

### Frontend

* HTML
* CSS
* JavaScript
* Monaco Editor

### Backend

* Node.js
* Express.js
* JavaScript

### Database

* MongoDB

### AI Integration

* Grok API

### Visualization

* Mermaid.js

---

## 📂 Project Structure

```text
Decodify/
│
├── backend/
│   ├── connection/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── package.json
│
└── README.md
```

---

## 🚀 How It Works

1. Write code inside the Monaco Editor.
2. Execute the code.
3. View the generated output.
4. Generate AI-powered explanations using Grok API.
5. Visualize code logic using Mermaid flowcharts.
6. Use the Dry Run feature to understand execution flow.
7. Learn programming concepts through interactive visualization.

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/alieeshaathecoder/decodify.git
cd decodify
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGODB_URI=your_mongodb_connection_string
GROK_API_KEY=your_grok_api_key
PORT=5000
```

### Run the Backend

```bash
cd backend
npm start
```

### Run the Frontend

Open `frontend/index.html` in your browser or use a local development server.

---

## 🔮 Future Enhancements

* 🔄 Advanced Dry Run support for while loops, nested loops, and conditional statements
* 🤖 AI-powered debugging suggestions
* 🌐 Multi-language code support
* 📊 Code complexity analysis
* 🖼️ Export Mermaid flowcharts as images and PDFs
* 🤝 Real-time collaboration features
* 🎯 Personalized learning recommendations
* 📈 Execution visualization for algorithms and data structures

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

Your support helps the project reach more developers, students, and learners.

---

### Decodify — Decode Code, Understand Logic, Learn Better.
