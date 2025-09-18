# 🍽️ What to Eat Today
**AI Food Recommendation Web App**

## 🌐 Demo
👉 [Visit the Website](https://what-to-eat-ai.vercel.app/)

## 📖 Introduction
What to Eat Today is a fun and practical AI-powered food recommendation app.  
Users can simply select their dining preferences or occasions, and the AI will generate personalized recipes with ingredients, steps, and reasons.  
Alternatively, it can suggest nearby restaurants using Google Maps API.  
Whether you’re cooking at home or dining out, you’ll never run out of ideas!

## ✨ Features
🤖 **AI Recipe Generation**: Powered by OpenAI API, providing ingredients, steps, and recommendation reasons

🍜 **Restaurant Finder**: Integrated with Google Maps API to quickly locate nearby restaurants

🎨 **Responsive Design**: Mobile-friendly and desktop-friendly with clean UI

⚡ **Easy Deployment**: Automatically built and updated via Vercel

## 🛠 Tech Stack
- Frontend Framework: **React + Next.js 13 (App Router)**
- Styling: Tailwind CSS
- AI Model: OpenAI API
- Map Service: Google Maps API
- Deployment: Vercel

## 🚀 Installation & Setup
### Install dependencies
`npm install`

### Run development server
`npm run dev`

### Build for production
`npm run build`

### Start production server
`npm start`

## 📌 Environment Variables
Create a `.env.local` file in the root directory and add the following keys:

```
# Server-side only, do NOT expose to frontend
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key

# Frontend & server-side usage (must start with NEXT_PUBLIC_)
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
```