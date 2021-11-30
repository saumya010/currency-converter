/*
 * APIs -
 * Exchange rate - Fixer.io
 * Countries - https://restcountries.com/v2/currency/{currency}
*/
import axios from 'axios';

const URL = 'http://data.fixer.io/api/latest';
const API_KEY = process.env.REACT_APP_CURRENCY_API_KEY

export const getSymbols = async () => {
	const {data: {rates}} = await axios.get(`${URL}?access_key=${API_KEY}`)
	console.log(Object.keys(rates))
}

export const getExchangeRate = async (fromCurr, toCurr) => {
	// async await method
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
	console.log(`${amount} ${fromCurr} is worth ${convertAmt} ${toCurr}. It can be used in: ${countries}`)
	return `${amount} ${fromCurr} is worth ${convertAmt} ${toCurr}. It can be used in: ${countries}`
}
