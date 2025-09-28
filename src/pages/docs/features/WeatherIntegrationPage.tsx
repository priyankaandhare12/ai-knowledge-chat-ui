import React from 'react';

export const WeatherIntegrationPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Weather API Integration</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive guide to the OpenWeatherMap API integration for real-time weather data and
            forecasting.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              🌤️ Weather Integration Overview
            </h2>
            <p className="text-gray-700">
              The chatbot integrates with OpenWeatherMap API to provide real-time weather
              information, forecasts, and climate data for any location worldwide through natural
              language queries.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 API Configuration</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">⚙️ OpenWeatherMap Setup</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium mb-2">API Endpoints Used</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>Current Weather:</strong> /weather
                    </li>
                    <li>
                      • <strong>5-Day Forecast:</strong> /forecast
                    </li>
                    <li>
                      • <strong>Geocoding:</strong> /geo/1.0/direct
                    </li>
                    <li>
                      • <strong>Reverse Geocoding:</strong> /geo/1.0/reverse
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-2">Configuration</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>Units:</strong> Metric (Celsius)
                    </li>
                    <li>
                      • <strong>Language:</strong> English (en)
                    </li>
                    <li>
                      • <strong>Rate Limit:</strong> 1000 calls/day
                    </li>
                    <li>
                      • <strong>Cache TTL:</strong> 10 minutes
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">💬 Query Examples</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">
                🗣️ Natural Language Queries
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="bg-white p-2 rounded border border-yellow-100">
                  "What's the weather in New York?"
                </div>
                <div className="bg-white p-2 rounded border border-yellow-100">
                  "Will it rain in London tomorrow?"
                </div>
                <div className="bg-white p-2 rounded border border-yellow-100">
                  "Temperature in Tokyo right now"
                </div>
                <div className="bg-white p-2 rounded border border-yellow-100">
                  "5-day forecast for San Francisco"
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">📊 Response Information</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Current temperature & feels like</li>
                <li>• Humidity & atmospheric pressure</li>
                <li>• Wind speed & direction</li>
                <li>• Weather conditions & description</li>
                <li>• Visibility & UV index</li>
                <li>• Sunrise & sunset times</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔄 Implementation Details</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                🧠 LangChain Tool Integration
              </h3>
              <div className="bg-purple-50 p-4 rounded border border-purple-200 mb-4">
                <h4 className="font-medium mb-2">Weather Tool Definition</h4>
                <div className="bg-white p-3 rounded border text-sm font-mono">
                  <pre className="text-gray-800 whitespace-pre-wrap">
                    {`const weatherTool = {
  name: "get_weather",
  description: "Get current weather information for a city",
  parameters: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "The city name to get weather for"
      },
      country: {
        type: "string", 
        description: "Optional country code (e.g., US, UK)"
      }
    },
    required: ["city"]
  }
};`}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <h5 className="font-medium text-sm text-blue-700 mb-2">Function Parameters</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>
                      • <strong>city:</strong> City name (required)
                    </li>
                    <li>
                      • <strong>country:</strong> ISO country code
                    </li>
                    <li>
                      • <strong>units:</strong> Temperature units
                    </li>
                    <li>
                      • <strong>lang:</strong> Response language
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h5 className="font-medium text-sm text-green-700 mb-2">Response Format</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Structured JSON data</li>
                    <li>• Human-readable descriptions</li>
                    <li>• Formatted temperatures</li>
                    <li>• Error handling messages</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-orange-700">🌍 Geocoding Service</h3>
              <p className="text-gray-700 mb-4">
                Automatic city name to coordinates conversion for accurate weather data retrieval.
              </p>
              <div className="bg-orange-50 p-4 rounded border border-orange-200">
                <h4 className="font-medium mb-2">Processing Steps</h4>
                <ol className="space-y-1 text-sm text-gray-700">
                  <li>1. Parse city name from user query</li>
                  <li>2. Call geocoding API for coordinates</li>
                  <li>3. Handle multiple location matches</li>
                  <li>4. Fetch weather data using coordinates</li>
                  <li>5. Format response for AI processing</li>
                </ol>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📱 Frontend Integration</h2>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-indigo-800">
              🎨 Weather Display Components
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border border-indigo-100">
                <h4 className="font-medium mb-3">Weather Card Component</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    • <strong>Current Conditions:</strong> Temperature, humidity, pressure
                  </li>
                  <li>
                    • <strong>Weather Icons:</strong> Dynamic icons based on conditions
                  </li>
                  <li>
                    • <strong>Additional Info:</strong> Wind, visibility, UV index
                  </li>
                  <li>
                    • <strong>Responsive Design:</strong> Mobile and desktop optimized
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border border-indigo-100">
                <h4 className="font-medium mb-3">Forecast Display</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    • <strong>5-Day Forecast:</strong> Daily temperature ranges
                  </li>
                  <li>
                    • <strong>Hourly Data:</strong> 3-hour interval predictions
                  </li>
                  <li>
                    • <strong>Chart Integration:</strong> Temperature and precipitation graphs
                  </li>
                  <li>
                    • <strong>Interactive Elements:</strong> Hover details and animations
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            ⚡ Performance Optimizations
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">🔄</span>
              <div>
                <strong>Response Caching:</strong> 10-minute cache for weather data to reduce API
                calls and improve response times
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">🎯</span>
              <div>
                <strong>Smart Geocoding:</strong> Cache city coordinates to avoid repeated geocoding
                requests
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">⚙️</span>
              <div>
                <strong>Batch Requests:</strong> Combine current weather and forecast calls when
                possible
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">🚫</span>
              <div>
                <strong>Error Handling:</strong> Graceful fallbacks for API failures and rate
                limiting
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔐 Security & Rate Limiting</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-3 text-red-800">🔑 API Key Protection</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Server-side Only:</strong> API keys never exposed to frontend
                </li>
                <li>
                  • <strong>Environment Variables:</strong> Secure storage in .env files
                </li>
                <li>
                  • <strong>Key Rotation:</strong> Regular API key updates
                </li>
                <li>
                  • <strong>Access Monitoring:</strong> Track API usage and anomalies
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">⏱️ Rate Limiting</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>API Limits:</strong> 1000 requests per day
                </li>
                <li>
                  • <strong>User Throttling:</strong> Max 10 weather queries per minute
                </li>
                <li>
                  • <strong>Cache Strategy:</strong> Serve cached data when limits exceeded
                </li>
                <li>
                  • <strong>Error Messages:</strong> Clear feedback on rate limit status
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🧪 Testing & Validation</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4">🔍 Test Coverage</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-green-700">Unit Tests</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• API response parsing</li>
                  <li>• Error handling logic</li>
                  <li>• Data transformation</li>
                  <li>• Cache mechanisms</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-blue-700">Integration Tests</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• API endpoint connectivity</li>
                  <li>• LangChain tool integration</li>
                  <li>• Frontend-backend flow</li>
                  <li>• Error propagation</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-purple-700">E2E Tests</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Complete user queries</li>
                  <li>• Weather display accuracy</li>
                  <li>• Error state handling</li>
                  <li>• Performance benchmarks</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Environment Setup</h2>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">Required Environment Variables</h4>
              <div className="text-sm font-mono text-blue-700 space-y-1">
                <div>OPENWEATHER_API_KEY=your_api_key_here</div>
                <div>OPENWEATHER_BASE_URL=http://api.openweathermap.org/data/2.5</div>
                <div>OPENWEATHER_GEO_URL=http://api.openweathermap.org/geo/1.0</div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-2">Getting Started</h4>
              <ol className="text-sm text-green-700 space-y-1">
                <li>1. Sign up for OpenWeatherMap account</li>
                <li>2. Generate API key from dashboard</li>
                <li>3. Add key to environment variables</li>
                <li>4. Test with sample weather query</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherIntegrationPage;
