/*
 * APIs -
 * Exchange rate - Fixer.io
 * Countries - https://restcountries.com/v2/currency/{currency}
*/
import axios from 'axios';

const URL = 'http://data.fixer.io/api/latest';
const API_KEY = process.env.REACT_APP_CURRENCY_API_KEY

export const getCountryNames = async () => {
	const {data} = await axios.get('https://restcountries.com/v2/all')
	return data.map(country => {
		if(country?.currencies) return [country.currencies[0].code, country.name]
		return ''
	})
}

export const getExchangeRate = async (fromCurr, toCurr) => {
	const {data: {rates}} = await axios.get(`${URL}?access_key=${API_KEY}`)
	const euro = 1 / rates[fromCurr]
	const exchanged = euro * rates[toCurr]

	if(isNaN(exchanged)) {
		throw new Error(`Unable to get currency ${fromCurr} & ${toCurr}`)
	}
	return exchanged
}

export const getCountries = async (toCurr) => {
	try {
		const {data} = await axios.get(`https://restcountries.com/v2/currency/${toCurr}`)
		return data.map(country => country.name)
	}
	catch(error) {
		throw new Error(`Unable to get countries that use ${toCurr}`)
	}
}

export const convertCurrency = async (fromCurr, toCurr, amount) => {
	const exchangeRate = await getExchangeRate(fromCurr, toCurr)
	const countries = await getCountries(toCurr)

	const convertAmt = (amount * exchangeRate).toFixed(2)
	return `${amount} ${fromCurr} is worth ${convertAmt} ${toCurr}. It can be used in: ${countries}`
}
