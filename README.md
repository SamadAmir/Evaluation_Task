# Evaluation_Task
# 🌤️ WeatherBot — Dialogflow + Node.js + OpenWeatherMap

A chatbot that provides current weather and 5-day forecasts for any city using Google Dialogflow ES, a Node.js Express webhook, and OpenWeatherMap API.

---

## 🔧 Features

- Responds to greetings like "Hi" with a custom welcome message
- Provides **current weather** using `CurrentWeatherIntent`
- Provides **5-day forecast** using `ForecastWeatherIntent`
- Integrates with **OpenWeatherMap API**
- Deployed locally via **ngrok** and connected to Dialogflow

---

## 🧰 Technologies Used

- Node.js + Express
- Google Dialogflow ES
- OpenWeatherMap API
- `ngrok` (for local HTTPS tunneling)
- Body-parser + Axios

---

## 🚀 How to Run This Project

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/weatherbot-dialogflow.git
cd weatherbot-dialogflow

```
### 2. Install Dependencies
```bash
npm install
```
### 3. Get OpenWeatherMap API Key
- Go to: https://openweathermap.org/api
- Sign up and get your API key
### 4. Create .env file
Inside the project root, create a file called .env:
```bash
API_KEY=your_openweather_api_key
```
### 5. Start the Node.js Webhook Server
````bash
node index.js
````
You should see
```bash
Server running on port 3000
```
### 6. Install ngrok
```bash
npm install -g ngrok
ngrok http 3000
https://1b60-111-88-99-79.ngrok-free.app -> http://localhost:3000
```
### 7. Create Agent on Dialogflow ES
- Go to Dialogflow Console
- Create a new agent

### 8. Enable Webhook Fulfillment
- Enable Webhook

- Paste the ngrok HTTPS URL as:
```bash
https://<your-ngrok-id>.ngrok-free.app/webhook
```
### 9. Create Intents
WELCOME Intent
- Default Welcome Intent
- Response (or webhook): "Hello, this is WeatherBot. How may I help you?"
- Enable webhook fulfillment.
  
ForecastWeatherIntent
- Training Phrases:
  - What's the forecast for Karachi?
  - Show me weather for Lahore next week.
- Parameters:
   - Entity: @geo-city,date-period
   - Parameter Name: geo-city,@date-period
- Enable webhook fulfillment.

 CurrentWeatherIntent 
- Training Phrases:
  - What's the weather in Islamabad?
  - Tell me temperature in Berlin.
- Parameters:
   - Entity: @geo-city,date-period
   - Parameter Name: geo-city,@date-period
- Enable webhook fulfillment.

















