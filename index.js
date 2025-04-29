require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;

app.get('/', (req, res) => {
  res.send('Weather Bot Webhook is running.');
});

app.get('/chat', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weather Bot</title>
        <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
      </head>
      <body>
        <h1>WeatherBot Chat</h1>
        <df-messenger
          intent="WELCOME"
          chat-title="Weatherbot"
          agent-id="890374e7-34d3-43ad-b0f1-c75ab07ff57a"
          language-code="en"
        ></df-messenger>
      </body>
    </html>
  `);
});

app.post('/webhook', async (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const city = req.body.queryResult.parameters['geo-city'];
  console.log('Intent:', intent);
  console.log('City:', city);




  if (!city) {
    return res.json({ fulfillmentText: "Please specify a city name." });
  }

  try {
    if (intent === 'CurrentWeatherIntent') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      const { temp } = response.data.main;
      const description = response.data.weather[0].description;

      return res.json({
        fulfillmentText: `The current temperature in ${city} is ${temp.toFixed(1)}°C with ${description}.`,
      });

    } else if (intent === 'ForecastWeatherIntent') {
      
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      console.log(`Fetching 5-day forecast for ${city}: ${forecastUrl}`);

      const response = await axios.get(forecastUrl);
      const forecastList = response.data.list;

      
      const dailyForecasts = {};
      forecastList.forEach(entry => {
        const [date, time] = entry.dt_txt.split(' ');
        if (!dailyForecasts[date] && time === '12:00:00') {
          dailyForecasts[date] = {
            temp: entry.main.temp,
            description: entry.weather[0].description
          };
        }
      });

      let forecastText = `5-day forecast for ${city}:\n`;
      Object.entries(dailyForecasts).slice(0, 5).forEach(([date, data]) => {
        forecastText += `• ${date}: ${data.temp.toFixed(1)}°C, ${data.description}\n`;
      });

      return res.json({ fulfillmentText: forecastText });
    }
  } catch (error) {
    console.error('Error fetching weather:', error.response?.data || error.message);
    return res.json({
      fulfillmentText: `Sorry, I couldn't fetch weather for ${city}. Please try again later.`,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
