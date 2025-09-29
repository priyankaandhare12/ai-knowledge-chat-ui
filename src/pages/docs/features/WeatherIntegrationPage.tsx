import React from 'react';

export const WeatherIntegrationPage: React.FC = () => {
  const steps = [
    {
      title: 'OpenWeatherMap API Setup',
      description: (
        <>
          Created an OpenWeatherMap account and obtained API key with access to current weather,
          5-day forecasts, and geocoding services.
        </>
      ),
    },
    {
      title: 'LangChain Tool Implementation',
      description: (
        <>
          Implemented a custom LangChain tool that integrates with the OpenWeatherMap API to provide
          real-time weather data through natural language queries.
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Tool Configuration:</h4>
            <ul className="text-sm space-y-1">
              <li>
                • Name: <code className="bg-gray-200 px-1 rounded">weatherLookup</code>
              </li>
              <li>• Description: Get current weather information for any city</li>
              <li>• Schema: City name validation and geocoding</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      title: 'Backend Integration',
      description: (
        <>
          The backend processes weather queries through a dedicated weather service that handles API
          calls, data formatting, and error management with comprehensive caching and error
          handling.
        </>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Weather API Integration</h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Comprehensive guide to the OpenWeatherMap API integration for real-time weather data and
          forecasting through natural language queries.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            🌤️ Weather Integration Overview
          </h2>
          <p className="text-gray-700">
            The chatbot integrates with OpenWeatherMap API to provide real-time weather information,
            forecasts, and climate data for any location worldwide through natural language queries
            and LangChain tool integration.
          </p>
        </div>
      </div>

      {/* Implementation Steps */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Implementation Steps</h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{step.title}</h3>
                  <div className="text-gray-600">{step.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">⚙️ Technical Implementation</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-green-700">🛠️ Backend Architecture</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h4 className="font-medium mb-3">Weather Tool (LangChain)</h4>
                <div className="text-sm font-mono bg-gray-100 p-3 rounded mb-3">
                  <code>{`// Weather Tool Definition
export const weatherTool = tool(weatherFunction, {
  name: 'weatherLookup',
  description: 'Get current weather information for any city',
  schema: z.object({
    city: z.string().min(1).describe('City name to get weather for')
  })
});`}</code>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Validates city names before API calls</li>
                  <li>• Formats weather data consistently</li>
                  <li>• Handles API errors gracefully</li>
                  <li>• Integrated with LangChain workflow</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h4 className="font-medium mb-3">API Service Layer</h4>
                <div className="text-sm font-mono bg-gray-100 p-3 rounded mb-3">
                  <code>{`// Weather API Client
const getCurrentWeather = async (city) => {
  const response = await weatherApi.get('/weather', {
    params: { q: city }
  });
  return formatWeatherData(response.data);
};`}</code>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• OpenWeatherMap API integration</li>
                  <li>• Automatic data formatting</li>
                  <li>• Comprehensive error handling</li>
                  <li>• Request/response logging</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-purple-700">🔗 Workflow Integration</h3>
            <div className="bg-purple-50 p-4 rounded border border-purple-200">
              <h4 className="font-medium mb-3">Weather Node Processing</h4>
              <div className="text-sm font-mono bg-gray-100 p-3 rounded mb-3">
                <code>{`// Weather workflow node
export const weatherNode = async (state) => {
  const llmInstance = initializeLLM();
  const response = await llmInstance.invoke([
    new SystemMessage(getPrompt(Prompts.UNIVERSAL_KNOWLEDGE)),
    ...state.messages
  ]);
  return { messages: response, nodeType: 'weather' };
};`}</code>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Integrated with main chat workflow</li>
                <li>• Uses GPT-4 with weather tool binding</li>
                <li>• Processes natural language queries</li>
                <li>• Returns structured weather responses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Query Examples */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">💬 Usage Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800">
              🗣️ Natural Language Queries
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-yellow-100 text-sm">
                "What's the weather in New York?"
              </div>
              <div className="bg-white p-3 rounded border border-yellow-100 text-sm">
                "Will it rain in London today?"
              </div>
              <div className="bg-white p-3 rounded border border-yellow-100 text-sm">
                "Temperature in Tokyo right now"
              </div>
              <div className="bg-white p-3 rounded border border-yellow-100 text-sm">
                "Is it sunny in San Francisco?"
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold mb-3 text-green-800">📊 Response Data</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Current temperature & feels like</li>
              <li>• Weather conditions & description</li>
              <li>• Humidity & atmospheric pressure</li>
              <li>• Wind speed & direction</li>
              <li>• Visibility & location details</li>
              <li>• Timestamp & data freshness</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Configuration</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-800 mb-3">Environment Variables</h4>
            <div className="bg-white p-4 rounded border text-sm font-mono space-y-1">
              <div className="text-gray-800">WEATHER_API_KEY=your_openweather_api_key</div>
              <div className="text-gray-600"># Get from: https://openweathermap.org/api</div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
            <h4 className="font-semibold text-green-800 mb-3">API Endpoints Used</h4>
            <ul className="text-sm text-green-700 space-y-2">
              <li>
                • <strong>Current Weather:</strong> https://api.openweathermap.org/data/2.5/weather
              </li>
              <li>
                • <strong>Geocoding:</strong> https://api.openweathermap.org/geo/1.0/direct
              </li>
              <li>
                • <strong>Units:</strong> Metric (Celsius)
              </li>
              <li>
                • <strong>Rate Limit:</strong> 1000 calls/day (free tier)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">✨ Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">🎯</span>
              <div>
                <strong>Smart City Recognition:</strong> Automatically validates and geocodes city
                names for accurate weather data retrieval
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">⚡</span>
              <div>
                <strong>Real-time Data:</strong> Provides current weather conditions with timestamps
                for data freshness
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">🛡️</span>
              <div>
                <strong>Error Handling:</strong> Graceful handling of invalid cities, API failures,
                and rate limits
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">🔄</span>
              <div>
                <strong>Response Caching:</strong> Intelligent caching to reduce API calls and
                improve performance
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-indigo-500 text-lg">🌍</span>
              <div>
                <strong>Global Coverage:</strong> Supports weather queries for cities worldwide with
                proper localization
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-pink-500 text-lg">📊</span>
              <div>
                <strong>Structured Data:</strong> Returns formatted, consistent weather data perfect
                for AI processing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherIntegrationPage;
