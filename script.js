const wrapper = document.querySelector(".wrapper"),
    inputPart = document.querySelector(".input-part"),
    infoTxt = document.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector(".button"),
    weatherPart = wrapper.querySelector(".weather-part"),
    wIcon = weatherPart.querySelector("img"),
    arrowBack = wrapper.querySelector("header i")

    let api;

    inputField.addEventListener("keyup", e => {
        if (e.key =="enter" && inputField.value != ""){
            requestApi(inputField.value);
        }
    })

    locationBtn.addEventListener("click", () => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(onSucess, onError);
        }else{
            alert("Your browser not support gelocation api")
        }
    });

    function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?=${city}&units=metri&appid=8b0f1ca9070b34480573dc896ad74af`;
    fetchData();
    }

    function onSucess(position) {
        const{latitude, longitude} = position.coords;
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&long=${longitude}&units=metri&appid=8b0f1ca9070b34480573dc896ad74af`;
        fetchData()
    }

    function onError(error) {
        infoTxt = inner.Text = error.message;
        infoTxt.classList.add("error")
    }

    function fetchData() {
        infoTxt.innerText = "Geting weather detalisc..."
        infoTxt.classList.add("pending")
        fetch(api).then(res=> res.json()).then(result => weatherDetalis(result)).catch(()=> {
            infoTxt.innerText = "something went wrong";
            infoTxt.classList.replace("pending", "error");
        });
    }

    function weatherDetalis(info) {
        if (info.cod == "404") {
            infoTxt.classList.replace("pending", "error");
            infoTxt.innerText= `${inputField.value} isn't a valid city name`
        }else {
            const city = info.name;
            const country = info.sys.country;
            const{ description ,id} = info.weather[0];
            const{ temp, feels_like, humidity} = info.main;

            if (id == 800){ 
                wIcon.src= "icons/clear.svg";
            }else if (id >= 200 && id <= 232) {
                wIcon.src= "icons/storm.svg";
            }else if (id >= 600 && id <=781) {
                wIcon.src= "icons/snow.svg";
            }else if (id >= 701 && id <= 781) {
                wIcon.src= "icon/haze.svg";
            }else if (id >= 801 && id <= 804) {
                wIcon.src= "icon/cloud.svg";
            }else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
                wIcon.src= "icons/rain.svg";
            }

            weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
            weatherPart.querySelector(".weather").innerText = description;
            weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
            weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
            weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
            infoTxt.classList.remove("pending", "error");
            infoTxt.innerText = "";
            inputField.value = "";
            wrapper.classList.add("active");
        }
    }

    arrowBack.addEventListener('click', () =>{
        wrapper.classList.remove("active");
    })
