window.addEventListener('load', () => {
  console.log("hello")
  let lon;
  let lat;
  let tempDescription = document.querySelector('.temperature-description');
  let tempDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let location = document.querySelector('.location');
  const degreeSection = document.querySelector('.degree-section')
  const degreeType = document.querySelector('.degree-section span');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=895897d86a390077e2b8145322a1970e`
      fetch(url).then(r => r.json()).then(data => {
        const {temp} = data.main;
        const tempInCelcius = (temp - 273.15).toFixed(2);
        const fahrenheit = (tempInCelcius * 9/5 + 32).toFixed(2);
        tempDescription.textContent = data.weather[0].description;
        locationTimezone.textContent = data.sys.country;
        setIcon(data.weather[0].icon);
        tempDegree.textContent =  fahrenheit;
        degreeSection.addEventListener('click', () => {
          if ( degreeType.textContent === 'F') {
            degreeType.textContent = "C"
          } else {
            degreeType.textContent = "F"
          }
          if ( degreeType.textContent === 'F') {
            tempDegree.textContent = fahrenheit;
          } else {
            tempDegree.textContent = tempInCelcius;
          }
        })
      })
    })
    const setIcon = (icon) => {
      let weatherIcon = document.createElement('img');
      weatherIcon.src =  `http://openweathermap.org/img/wn/${icon}@2x.png`
      location.appendChild(weatherIcon)
    }
  }


});
