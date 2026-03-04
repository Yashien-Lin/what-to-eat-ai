# 🍽️ What to Eat Today

**AI Food Recommendation Web App**

## 🌐 Demo

👉 [Visit the Website](https://what-to-eat-ai.vercel.app/)

## 📖 Introduction

What to Eat Today is a fun and practical AI-powered food recommendation app.<br>
Users can select their dining preferences or occasions, or simply describe their current mood and feelings in their own words.

The AI analyzes the input and generates personalized recipe recommendations — including ingredients, step-by-step instructions, and the reasoning behind each suggestion.

Alternatively, the app can suggest nearby restaurants using the Google Maps API.

Whether you’re cooking at home or dining out, you’ll never run out of delicious ideas!

## ✨ Features

🤖 **AI Recipe Generation**: Generates personalized recipes with ingredients, step-by-step instructions, and recommendation reasons (powered by OpenAI API)

🧠 **Mood-Based AI Analysis**:  
Users can freely describe their current mood or feelings, and the AI analyzes their emotional state to provide tailored food recommendations

🍜 **Restaurant Finder**: Integrated with Google Places API to quickly find nearby restaurants based on user preferences and location

🎨 **Responsive Design**: Mobile-friendly and desktop-friendly with clean UI

⚡ **Easy Deployment**: Automatically built and updated via Vercel

## 🛠 Tech Stack

- Frontend Framework: **React + Next.js 15**
- Styling: Tailwind CSS
- AI Model: OpenAI API
- Map Service: Google Places API
- Deployment: Vercel

## 🚀 Getting Started

#### 1. Clone this repo

#### 2. Install dependencies: `npm install`

#### 3. Run locally: `npm run dev`

## 📌 Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

### 🔒 Server-side Only

These keys are used exclusively on the server and are never exposed to the client.

```
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key
```
