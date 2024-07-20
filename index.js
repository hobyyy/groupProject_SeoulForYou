const weatherApiKey = '8f96d88863ec693820e54665e9bbc266';

function initializeWeather(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=kr`;

    async function updateWeather() {
        const weatherElement = document.querySelector('.navbar-text');
        weatherElement.innerHTML = '날씨 정보를 불러오는 중...';

        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            if (data.cod === 200) {
                const temperature = data.main.temp.toFixed(1); // 소수점 첫째 자리까지
                const weatherDescription = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                weatherElement.innerHTML = `
                    <img src="${iconUrl}" alt="${weatherDescription}" style="width: 30px; margin-right: 10px;">
                    <span>${temperature}°C</span>
                `;
            } else {
                weatherElement.textContent = '날씨 정보를 불러오는데 실패했습니다.';
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherElement.textContent = '날씨 정보를 불러오는데 실패했습니다.';
        }
    }

    updateWeather();
    setInterval(updateWeather, 600000); // 600000ms = 10분
}

// 날씨 정보 초기화
initializeWeather('Seoul');