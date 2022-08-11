// 1570cc31ded27da43ccc8a712c92f0cc   Api Key

// api.openweathermap.org/data/2.5/weather?q={city name}&apiid={your api key}

// Scroll Header 
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
  }
  window.addEventListener('scroll', scrollHeader)

const accordionItems=document.querySelectorAll('.value__accordion-item')
accordionItems.forEach((item)=>{
      const accordionHeader=item.querySelector('.value__accordion-header')
      accordionHeader.addEventListener('click', ()=>{
        const openItem=document.querySelector('.accordion-open')
        toogleItem(item)

        if(openItem && openItem !== item){
          toogleItem(openItem)
        }

  })
})


  const toogleItem=(item)=>{
    const accordionContent=item.querySelector('.value__accordion-content')
    if(item.classList.contains('accordion-open')){
      accordionContent.removeAttribute('style')
      item.classList.remove('accordion-open')
    }else{
      accordionContent.style.height=accordionContent.scrollHeight + `px`
      item.classList.add('accordion-open')
  
    }
    
  }
  
const weatherForecastEl1 = document.getElementById('weather-forecast1');
const weatherForecastEl2 = document.getElementById('weather-forecast2');
const weatherForecastEl3 = document.getElementById('weather-forecast3');
const weatherForecastEl4 = document.getElementById('weather-forecast4');
const weatherForecastEl5 = document.getElementById('weather-forecast5');
const weatherForecastEl6 = document.getElementById('weather-forecast6');
const weatherForecastEl7 = document.getElementById('weather-forecast7');

const currentTempEl = document.getElementById('current-temp');


const dateDay=
        document.getElementById('date-day'),
        dateMonth=document.getElementById('date-month'),
        dateYear=document.getElementById('date-year'),
        dateWeek=document.getElementById('date-week')






const weatherApi = {
    key: '1570cc31ded27da43ccc8a712c92f0cc',
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}


const searchInputbox=document.getElementById('home__search-input');




searchInputbox.addEventListener('keypress', (event) => {
    if(event.keyCode == 13){

    
    console.log(searchInputbox.value)
    getWeatherReport(searchInputbox.value)
    }

    
    
});


getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${weatherApi.key}`)
        .then(current =>{
            return current.json();


        }).then(WeatherData);
        
        
    })
    
}

function WeatherData(current){
    console.log(current)
    let weatherTemp=document.querySelector('.weather__temp');
    weatherTemp.innerHTML=`${Math.round(current.current.temp-273)}`;
    const Imageweather=document.querySelector('.current__weather');
    
    Imageweather.classList.add('current__weather_size');
    const weather__icon = document.querySelector('.weather__update__icon');
    weather__icon.innerHTML=`
    <img src="http://openweathermap.org/img/wn//${current.current.weather[0].icon}@4x.png" alt="weather icon" class="w-icon current__weather_size">`
    

    


    let weatherFeels=document.querySelector('.value-feels');
    weatherFeels.innerHTML=`${Math.round(current.current.feels_like-273)}`;


    let weatherWind=document.querySelector('.value-wind');
    weatherWind.innerHTML=`${Math.round(current.current.wind_speed*3.6)}`


    let weatherVisibilty=document.querySelector('.value-visibilty');
    weatherVisibilty.innerHTML=`${Math.round(current.current.visibility*0.001)}`;

    let weatherPressure=document.querySelector('.value-barometer');
    weatherPressure.innerHTML=`${current.current.pressure}`

    let weatherHumidity=document.querySelector('.value-Humidity');
    weatherHumidity.innerHTML=`${current.current.humidity}`;
    
    let weatherType=document.querySelector('.weather__type');
    weatherType.innerHTML=`${current.current.weather[0].main}`;

    
    let weatherDew=document.querySelector('.value-dew');
    weatherDew.innerHTML=`${Math.round(current.current.dew_point-273)}`

    let weatherrise=document.querySelector('.value-rise');
    weatherrise.innerHTML=`${window.moment(current.current.sunrise*1000).format('hh:mm')}`

    let weatherset=document.querySelector('.value-set');
    weatherset.innerHTML=`${window.moment(current.current.sunset*1000).format('hh:mm')}`


    let weatheruv= document.querySelector('.uv');
    weatheruv.innerHTML =`
                        <div class="round" data-value="${current.daily[0].uvi*0.07692}" data-size="200" data-thickness="6">
                                <strong class="percentage"></strong>
                                <span><i class="fa fa-html5" aria-hidden="true"></i> UV Index</span>
                            </div>
                            `
    Circlleuv('.round');


    let weatherrain= document.querySelector('.rain');
    weatherrain.innerHTML =`
                        <div class="round" data-value="${current.daily[0].pop}" data-size="200" data-thickness="6">
                                <strong  class="percentage"></strong>
                                <span><i class="fa fa-html5" aria-hidden="true"></i> Probability of Precipitation </span>
                            </div>
                            `
    Circlle('.round');


    
    let weatherhumid= document.querySelector('.humid');
    weatherhumid.innerHTML =`
                        <div class="round" data-value="${current.daily[0].humidity*0.01}" data-size="200" data-thickness="6">
                                <strong class="percentage"></strong>
                                <span><i class="fa fa-html5" aria-hidden="true"></i> Humidity </span>
                            </div>
                            `
    Circlle('.round');



    const Weatherlatitude = current.lat;
    
    const Weatherlongitude = current.lon;

    var coordinates = [Weatherlatitude, Weatherlongitude];

    getCity(coordinates);

    let otherDayForcast=""
    current.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}<span class="today">'Today'</span></div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
 
            
            `
    }
        if(idx==1){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl1.innerHTML = otherDayForcast;
        }

        if(idx==2){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl2.innerHTML = otherDayForcast;
        }

        if(idx==3){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl3.innerHTML = otherDayForcast;
        }

        if(idx==4){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl4.innerHTML = otherDayForcast;
        }

        if(idx==5){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl5.innerHTML = otherDayForcast;
        }

        if(idx==6){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl6.innerHTML = otherDayForcast;
        }

        if(idx==7){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl7.innerHTML = otherDayForcast;
        }
    
       
    })
  

  

}





function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
       
        

    }).then(showWeatherReport);
}


function showWeatherReport(weather){

    console.log(weather)
    if(weather.cod==404){
        Swal.fire({
            title: '<strong>Location Not Found</strong>',
            icon: 'warning',
            html:
              'Please Check The Location Name ',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            
          })
    }
    
    
    const weather__icon = document.querySelector('.weather__update__icon');
    weather__icon.innerHTML=`
    <img src="http://openweathermap.org/img/wn//${weather.weather[0].icon}@4x.png" alt="weather icon" class="w-icon current__weather_size">`


    const Weatherlatitude = weather.coord.lat;
    
    const Weatherlongitude = weather.coord.lon;

    

    let weatherCity=document.querySelector('.weather__city');

    weatherCity.innerHTML=`${weather.name}, ${weather.sys.country}`;


    

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${Weatherlatitude}&lon=${Weatherlongitude}&appid=${weatherApi.key}`)
        .then(currentsecond =>{
            return currentsecond.json();


        }).then(WeatherDatasecond);



}


function WeatherDatasecond(currentsecond){
    console.log(currentsecond)
    let weatherPressure=document.querySelector('.value-barometer');
    weatherPressure.innerHTML=`${currentsecond.current.pressure}`

    let weatherHumidity=document.querySelector('.value-Humidity');
    weatherHumidity.innerHTML=`${currentsecond.current.humidity}`;

    let weatherType=document.querySelector('.weather__type');
    weatherType.innerHTML=`${currentsecond.current.weather[0].main}`;

    let weatherTemp=document.querySelector('.weather__temp');
    weatherTemp.innerHTML=`${Math.round(currentsecond.current.temp-273)}`;
    const Imageweather=document.querySelector('.current__weather');
    
    
    let weatherVisibilty=document.querySelector('.value-visibilty');
    weatherVisibilty.innerHTML=`${Math.round(currentsecond.current.visibility*0.001)}`;
    


    let weatherFeels=document.querySelector('.value-feels');
    weatherFeels.innerHTML=`${Math.round(currentsecond.current.feels_like-273)}`;


    let weatherWind=document.querySelector('.value-wind');
    weatherWind.innerHTML=`${Math.round(currentsecond.current.wind_speed*3.6)}`

    let weatherDew=document.querySelector('.value-dew');
    weatherDew.innerHTML=`${Math.round(currentsecond.current.dew_point-273)}`

    let weatherrise=document.querySelector('.value-rise');
    weatherrise.innerHTML=`${window.moment(currentsecond.current.sunrise*1000).format('hh:mm')}`

    let weatherset=document.querySelector('.value-set');
    weatherset.innerHTML=`${window.moment(currentsecond.current.sunset*1000).format('hh:mm')}`







    let weatheruv= document.querySelector('.uv');
    weatheruv.innerHTML =`
                        <div class="round" data-value="${currentsecond.daily[0].uvi*0.07692}" data-size="200" data-thickness="6">
                                <strong  class="percentage"></strong>
                                <span><i class="fa fa-html5" aria-hidden="true"></i> UV Index</span>
                            </div>
                            `
    Circlleuv('.round');


    let weatherrain= document.querySelector('.rain');
    weatherrain.innerHTML =`
                        <div class="round" data-value="${currentsecond.daily[0].pop}" data-size="200" data-thickness="6">
                                <strong  class="percentage"></strong>
                                <span><i class="fa fa-html5" aria-hidden="true"></i> Probability of Precipitation </span>
                            </div>
                            `
    Circlle('.round');


    
    let weatherhumid= document.querySelector('.humid');
    weatherhumid.innerHTML =`
                        <div class="round" data-value="${currentsecond.daily[0].humidity*0.01}" data-size="200" data-thickness="6">
                                <strong class="percentage"></strong>
                                <span><i class="fa fa-html5" aria-hidden="true"></i> Humidity </span>
                            </div>
                            `
    Circlle('.round');



    let otherDayForcast=""
    currentsecond.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}<span class="today">'Today'</span></div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
 
            
            `
    }
        if(idx==1){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl1.innerHTML = otherDayForcast;
        }

        if(idx==2){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class=" forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl2.innerHTML = otherDayForcast;
        }

        if(idx==3){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl3.innerHTML = otherDayForcast;
        }

        if(idx==4){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl4.innerHTML = otherDayForcast;
        }

        if(idx==5){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl5.innerHTML = otherDayForcast;
        }

        if(idx==6){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl6.innerHTML = otherDayForcast;
        }

        if(idx==7){
            otherDayForcast = `
        <div class="popular__data">
            <h2 class="popular__price">
            <div class="day">${window.moment(day.dt*1000).format('DD MMM YYYY dddd')}</div>

            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon forecast-icon">
       
                    
                      
           
                <div class="temp">Day ( Maximum ) : ${Math.round(day.temp.max-273)}&#176;C</div>
                <div class="temp">Night ( Minimum ) : ${Math.round(day.temp.min-273)}&#176;C</div>
                
                </h2>
                        <h3 class="popular__title"> ${day.weather[0].main}</h3>
                        <p class="popular__description">
                                    
                        </p>

            </div>
      
        
        `
        weatherForecastEl7.innerHTML = otherDayForcast;
        }
    
       
    })

}



/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)


const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


//  Get city name
function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
  
    // Paste your LocationIQ token below.
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.d20c7b9e4e583b2ab06c9704add30a37&lat=" +
    lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
  
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            
            var city = response.address.city;


            let weatherCity=document.querySelector('.weather__city');



            weatherCity.innerHTML=`${city}, ${response.address.country}`;
            
            
            return;
        }
    }
    }

// Swiper

// Intialisze in index.html
    

weatherButton= document.getElementById('weather__button')
// weatherButton.addEventListener('onClick', console.log('Hey'))





  function Circlleuv(el){
    $(el).circleProgress({fill: {color: '#092352'}})
      .on('circle-animation-progress', function(event, progress, stepValue){
                      $(this).find('strong').text(String(stepValue.toFixed(2)).substr(2)+' UV');
              });  
  };


  function Circlle(el){
    $(el).circleProgress({fill: {color: '#092352'}})
      .on('circle-animation-progress', function(event, progress, stepValue){
                      $(this).find('strong').text(String(stepValue.toFixed(2)).substr(2)+'%');
              });  
  };





/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}


// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})



function happy(){
    Swal.fire({
        title: '<strong><em>Thanking You</em></strong>',
        icon: 'Success',
        html:
          '<b>Keep Smiling It Suits You</b>', 
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText:
          'Close'        
        
      })
}