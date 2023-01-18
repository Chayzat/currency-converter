const input = document.getElementById('input')
const result = document.getElementById('result')
const select = document.getElementById('select')

const rates = {}

getRates()

async function getRates() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    const data = await response.json()
    const result = await data
    Object.assign(rates, result.Valute)
    const keys = Object.keys(rates)
    const values = Object.values(rates)
    renderKeys(keys, values)
    renderValues(values)
}

//load data
const renderKeys = (arr, val) => {
    const listRate = document.getElementById('list')
    return arr.map((item, index) => {
        let itemRate = document.createElement('li')
        itemRate.className = 'swiper-slide rate__item'
        let v = (val[index].Value).toFixed(2)
        itemRate.textContent = `${item} - ${v}`
        return listRate.appendChild(itemRate)
    })
}

const renderValues = (arr) => {
    const selectRate = document.getElementById('select')
    return arr.map((item) => {
        let option = document.createElement('option')
        option.textContent = `${item.CharCode}`
        return selectRate.appendChild(option)
    })
}

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
    result.value = (parseFloat(input.value) * rates[select.value].Value).toFixed(2)
}

const convertValueRevert = () => {
    input.value = (parseFloat(result.value) / rates[select.value].Value).toFixed(2)
}

input.oninput = convertValue
select.oninput = convertValue
result.oninput = convertValueRevert