const apiKey = '8f96d88863ec693820e54665e9bbc266';
const city = 'Seoul';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

function updateWeather() {
    const weatherElement = document.querySelector('.navbar-text');
    weatherElement.innerHTML = '날씨 정보를 불러오는 중...';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // 데이터 확인용
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
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherElement.textContent = '날씨 정보를 불러오는데 실패했습니다.';
        });
}

// 페이지 로드 시 날씨 정보 업데이트
updateWeather();

// 일정 시간 간격으로 날씨 정보 업데이트 (예: 10분마다)
setInterval(updateWeather, 600000); // 600000ms = 10분
