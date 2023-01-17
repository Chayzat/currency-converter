const rates = []
const ratesArray = []

async function getRates() {
    const data = await (await fetch('https://www.cbr-xml-daily.ru/daily_json.js')).json()
    const result = await data

    let valute = result.Valute
    rates.push(valute)
    ratesArray.push(Object.values(valute))
}

getRates()

