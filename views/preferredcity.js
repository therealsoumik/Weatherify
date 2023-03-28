const hbs= require('hbs');
const form = document.getElementById('signup-form');
const cityInput = document.querySelector('input').value;
console.log(cityInput)

const getVal = () => {
  const cityInput = document.getElementById('city').value;
  console.log(cityInput)
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const city = cityInput.value;
  // Store the preferred city in local storage
  localStorage.setItem('preferredCity', city);

  // Call a function to manage the user's state
  manageUserState();
});
function manageUserState() {
  const preferredCity = localStorage.getItem('preferredCity');

  // Make a request to an API to get the current weather for the preferred city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${preferredCity}&appid=d5af0035d83872ade1facd01f9a55707`)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0];
      console.log(weather)
      if (weather.main === 'Rain') {
        // Send a notification to the user that it's currently raining in their preferred city
        sendNotification('It\'s currently raining in your preferred city!');
      }
      else{
        sendNotification('Its not raining');
      }
    });
}
  function sendNotification(message) {
    if (Notification.permission === 'granted') {
      // If permission is already granted, create a notification
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      // If permission hasn't been requested yet, request it
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // If permission is granted, create a notification
          new Notification(message);
        }
      });
    }
  }