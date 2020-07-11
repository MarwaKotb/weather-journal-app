/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
//const apiKey = 'ad689794caf3e69c1c6d71e58b7d40e8';
const apiKey = 'e32f3d45fe2152245173dcc595b90892';

// Create a new date instance dynamically with JS

const fillURL = ',us&units=metric&APPID=';

let zip = document.getElementById('zip');
let feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

let newDate = dd + '/' + mm + '/' + yyyy;
//Async function
const getWeather = async (baseURL, zip, apiKey) =>{
    try {
        const request = await fetch(baseURL+zip+fillURL+apiKey)
        const weatherdata = await request.json();
        const {
            main: {temp},
        } = weatherdata;
        return Math.round(temp);
        console.log(weatherdata);
    } catch (error){
        throw error
    }
}
// POST using try fetch
const postData = async ( url, data)=>{
    try {
      await fetch(url, {
      method: 'POST', 
      headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    })
      }catch(error) {
      throw error
      }
  }

// Button Event Listener
generate.addEventListener('click', () =>{
    getWeather(baseURL,zip.value, apiKey)
    .then(temp =>{
        return {date: newDate, temp, content:feelings.value}
    })
    .then(data =>{
        postData('/api/projectData', data);
        return data;
    })
    .then(({temp, date, content})=>{
        update(temp,date,content)
    })
    .catch(error =>{
        console.log(error);
    });       
});

//Update UI

const update = async(temperature, newDate, feelings)=>{
    date.innerHTML = newDate;
    temp.innerHTML = `${temperature}°C`;
    content.innerHTML = feelings;
}

