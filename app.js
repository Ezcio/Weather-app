let weather = {
    apiKey : '48d28167a80f4eddd1c5874e60e8ed11',
    fetchWeather : function(city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data)=> {

            
            this.displayWeather(data)
            forecast.fetchWeather(city);
        
        })
        .catch((error) => alert('The city was wrong.\nTry Again.'));
    },
    displayWeather : function(data){
        
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        const {country} = data.sys;


        this.insertInformation(name, icon, description, temp, humidity,speed)
    },

    insertInformation : function(name, icon, description, temp, humidity,speed,country) {
        document.querySelector('.city').innerText = `Weather in ${name}` ;
        document.querySelector('.temp').innerText = `${temp} °C`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind speed: ${speed}km`;
        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`
    }

}

let forecast = {
    fetchWeather : function (city){
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${weather.apiKey}&cnt=5`)
        .then((respone)=>respone.json())
        .then((data) => {
            this.insertInformation(data)
        })
    },

    insertInformation :  function (data){
        
        for (let i=0 ; i<5 ; i++){
            let {temp} = data.list[i].main;
            let {icon} = data.list[i].weather[0];
            let {dt} = data.list[i];
            
            let time = this.convertionUnixTime(dt);

            this.appendInformation(temp,icon,time,i);

           
        }
    },
    convertionUnixTime : function(dt){
        let date = new Date(dt *1000);
        let hours = date.getHours();
        let minutes = date.getMinutes() + '0';
        let formattedTime = hours + ':' + minutes;

        return formattedTime;
        
    },
    appendInformation : function(tempDate,icon,time,i){
        const dates = document.querySelectorAll('.date-forecast');
        dates[i].innerText = time;
        
        const icons = document.querySelectorAll('.icon-in-forecast')
        icons[i].src = `https://openweathermap.org/img/wn/${icon}@2x.png`

        const temp = document.querySelectorAll('.temp-forecast')
        temp[i].innerText = `${tempDate} °C`
        
    }

}

const search = document.querySelector('.search');
const city = document.querySelector('input').value;
const button = document.querySelector('button');


search.addEventListener('keypress', (e)=>{

    

    if (e.key =='Enter')
    {
        const city = document.querySelector('input').value;
        weather.fetchWeather(city);
    }
})

button.addEventListener('click', ()=>{

    if (document.querySelector('input').value)
    {
        const city = document.querySelector('input').value;
        weather.fetchWeather(city);
    }
    else {
        alert("Nie podano nazwy miasta")
    }
})


