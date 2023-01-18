const rates = []
const ratesArray = []
let newArr = []
const input = document.getElementById('input')
const result = document.getElementById('result')
const select = document.getElementById('select')

let values
let keys

fetch('https://www.cbr-xml-daily.ru/latest.js').then(result => {
    return result.json()
}).then(data => {
    let rate = data.rates
    rates.push(rate)
    ratesArray.push(rates[0])
    values = Object.values(ratesArray[0])
    keys = Object.keys(ratesArray[0])
})

//load data
window.addEventListener('load', () => {
    const listRate = document.getElementById('list')
    const selectRate = document.getElementById('select')
    let result = keys.map((item, index) => {
        let itemRate = document.createElement('li')
        itemRate.className = 'swiper-slide rate__item'
        itemRate.textContent = `${item} - ${(values[index]).toFixed(2)}`
        //
        let option = document.createElement('option')
        option.textContent = `${item}`
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
    result.value = (parseFloat(input.value) * ratesArray[0][select.value]).toFixed(2)
}

const convertValueRevert = () => {
    input.value = (parseFloat(result.value) / ratesArray[0][select.value]).toFixed(2)
}

input.oninput = convertValue
select.oninput = convertValue
result.oninput = convertValueRevert