

const url = 'https://api.openweathermap.org/data/2.5/'
const key = '901b16e617e11a1688025a472d4d52ed'
var countries;
const load = () => {
    //Ülkeleri ve şehirlerini getirir. En güncel hali bu gözüküyor başka liste bulamadım.
    axios.get("https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.json")
        .then((response) => {
            var select = document.getElementById("selectCountry");
            countries = response.data;
            for (var key in response.data) {
                var option = document.createElement("option");
                option.value = key;
                option.text = key;
                select.add(option);
            }
        },
         (error) => {
            console.log(error);//Log kısmı
        });
}

const showCity = () => {
    var selectCountry = document.getElementById("selectCountry");//ekle
    var selectCity = document.getElementById("selectCity");


    //Daha önceden seçilen varsa şehirler arasından siler.
    selectCity.innerHTML = "";
    var cities = countries[selectCountry.value];


    //Seçilen ülkenin şehirlerini getirir.
    for (var i = 0; i < cities.length; i++) {
        var option = document.createElement("option");
        option.value = cities[i];
        option.text = cities[i];


        //Ülkelerin şehirlerini dropdown içerisine ekler.
        selectCity.add(option);
    }
    selectCity.style.visibility = "visible";
}

const getResult = (element) => {
    let query = `${url}weather?q=${element.value}&appid=${key}&units=metric&lang=tr`
    axios.get(query)
        .then((response) => {
            displayResult(response);
        }, (error) => {
            console.log(error);//Log kısmı
        });
}
//city,temp desc , minmax bunları güncel data çıktılarını ekrana verir hava durumu
const displayResult = (result) => {

    let city = document.querySelector('.city')
    city.innerText = `${result.data.name},${result.data.sys.country}`

    let temp = document.querySelector('.temp')
    temp.innerText = `${Math.round(result.data.main.temp)}°C`

    let desc = document.querySelector('.desc')
    desc.innerText = result.data.weather[0].description

    let minmax = document.querySelector('.minmax')
    minmax.innerText = `${Math.round(result.data.main.temp_min)} °C/
    ${Math.round(result.data.main.temp_max)}°C`
}
