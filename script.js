const rates = []
const ratesArray = []

const input = document.getElementById('input')
const result = document.getElementById('result')
const select = document.getElementById('select')

async function getRates() {
    const data = await (await fetch('https://www.cbr-xml-daily.ru/daily_json.js')).json()
    const result = await data

    let valute = result.Valute
    rates.push(valute)
    ratesArray.push(Object.values(valute))
}

getRates()
//load data
window.addEventListener('load', () => {
    const listRate = document.getElementById('list')
    const selectRate = document.getElementById('select')
    let list = ratesArray["0"]
    let result = list.map((item) => {
        let itemRate = document.createElement('li')
        itemRate.className = 'swiper-slide rate__item'
        itemRate.textContent = `${item.CharCode} - ${(item.Value).toFixed(2)}`
        //
        let option = document.createElement('option')
        option.textContent = `${item.CharCode}`
        selectRate.appendChild(option)

        return listRate.appendChild(itemRate)
    })
})

//swiper currencies
let swiper = new Swiper('.mySwiper', {
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination"
    },
    slidesPerView: 3,
    mousewhell: true,
    keyboard: true
})

//currnecy converter
const convertValue = () => {
    result.value = (parseFloat(input.value) / rates["0"][select.value].Value).toFixed(2)
}

const convertValueRevert = () => {
    input.value = (parseFloat(result.value) * rates["0"][select.value].Value).toFixed(2)
}

input.oninput = convertValue
select.oninput = convertValue
result.oninput = convertValueRevert