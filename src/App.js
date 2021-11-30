import React, {useEffect} from 'react';

import { getSymbols, getExchangeRate, convertCurrency } from './api'

const App = () => {
	useEffect(() => {
		getCurr()
	}, [])
	const getCurr = async () => {
		//const curr = await convertCurrency('USD', 'CAD', 1000)
		//const curr = await getExchangeRate('USD', 'CAD')
		const curr = getSymbols();
		//console.log(curr)
	}
	return(
		<div>
			{
			}
		</div>
	)
}

export default App
