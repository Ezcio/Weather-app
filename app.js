let weather = {
    apiKey : '48d28167a80f4eddd1c5874e60e8ed11',
    fetchWeather : function(city){
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data)=> {

            console.log(data)
            console.log(this.displayWeather(data))
        
        })
        .catch((error) => alert('The city was wrong.\nTry Again.'));
    },
    displayWeather : function(data){
        
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        const {country} = data.sys;

        console.log(name, icon, description, temp, humidity,speed,country)

        this.insertInformation(name, icon, description, temp, humidity,speed)
    },

    insertInformation : function(name, icon, description, temp, humidity,speed,country) {
        document.querySelector('.city').innerText = `Weather in ${name}` ;
        document.querySelector('.temp').innerText = `${temp} °C`;
        document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind speed: ${speed}km`;
        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`
    }

}

let forecast = {
    fetchWeather : function (){
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Warszawa&units=metric&appid=${weather.apiKey}&cnt=5`)
        .then((respone)=>respone.json())
        .then((data) => {
            console.log(data);
            this.insertInformation(data)
        })
    },

    insertInformation :  function (data){
        // const {lenght} = data.list.lenght();
        for (let i=1 ; i<5 ; i++){

            let {temp_max} = data.list[i].main;
            let {temp_min} = data.list[i].main;
            let {icon} = data.list[i].weather[0];
            let {dt} = data.list[i];
            let tempMinMax = temp_max +"/"+ temp_min;
            let time = this.convertionUnixTime(dt);

            
            console.log("O to mi chodzi",tempMinMax)
            console.log(`to jest temperatura z data min ${temp_min}`);
            console.log(`to jest czas ${time}`);
            console.log(`to jest sa icony ${icon}`)
        }
    },
    convertionUnixTime : function(dt){
        let date = new Date(dt *1000);
        let hours = date.getHours();
        let minutes = date.getMinutes() + '0';
        let formattedTime = hours + ':' + minutes;

        return formattedTime;
        
    },
    appendInformation : function(){
        
    }

}

const search = document.querySelector('.search');
const city = document.querySelector('input').value;
const button = document.querySelector('button');


search.addEventListener('keypress', (e)=>{

    if (e.key =='Enter')
    {
        const city = document.querySelector('input').value;
        console.log(city);
        weather.fetchWeather(city);
    }
})

button.addEventListener('click', ()=>{

    if (document.querySelector('input').value)
    {
        const city = document.querySelector('input').value;
        console.log(city);
        weather.fetchWeather(city);
    }
    else {
        alert("Nie podano nazwy miasta")
    }
})


