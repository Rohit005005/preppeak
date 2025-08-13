# 🎯 PrepPeak: Interview Practice Application

**PrepPeak** is a web application designed to help users **practice for interviews**.  
It leverages **speech-to-text technology** to record answers, providing **immediate AI feedback**.  
The application guides users through a series of mock interview questions, offering a **comprehensive practice experience**.

---

## 🛠️ Technology Stack

| Layer         | Technologies |
|---------------|--------------|
| **Frontend**  | React, Next.js, Tailwind CSS, Radix UI, Lucide-React |
| **Backend** | Drizzle ORM, Neon Database, Google's Generative AI |
| **Database**  | Neon Database (serverless) + Drizzle ORM |
| **AI Model**  | Google's Generative AI |
| **Deployment** | Vercel |
| **Speech-to-Text** | react-hook-speech-to-text |

---

## 🔄 Workflow

### **1️⃣ User Interface**
- Built with **React** and styled with **Tailwind CSS**.
- **Radix UI components** ensure accessibility and smooth UX.

### **2️⃣ Question Presentation**
- Displays **mock interview questions** one at a time.
- Navigation via **Previous** / **Next** buttons.
- **Text-to-Speech** allows users to listen to questions.

### **3️⃣ Answer Recording**
- Records via **microphone** using `react-hook-speech-to-text`.
- Webcam provides **visual feedback** during recording.

### **4️⃣ AI Feedback**
- After a minimum length, the answer is sent to **Google Generative AI**.
- AI processes the answer in the context of the question.
- Returns **JSON feedback** with:
  - Rating
  - Suggestions for improvement

### **5️⃣ Data Storage**
- Stores:
  - User’s answer
  - Correct answer
  - AI’s feedback
  - Timestamp  
- Data stored in **Neon Database** via **Drizzle ORM**.

### **6️⃣ Feedback Presentation** *(implied)*
- After completing all questions:
  - Displays **summary** of answers, AI feedback, and correct answers.

---

## 🏗️ Overall Architecture

- **Client (Frontend)** – Next.js app for UI & interaction.
- **Serverless Backend** – Handles:
  - Database interactions
  - AI communication
- **Database** – Stores persistent interview data.
- **AI Model** – Provides **real-time feedback**.
- **Deployment** – Hosted on **Vercel** for performance and scalability.

---

## 💡 Author
**Rohit** – [LinkedIn](https://www.linkedin.com/in/rohit005) | [Portfolio](https://portfolio.rohit005.site) | [Email](mailto:rohitdev005005@gmail.com)
