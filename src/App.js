import React, {useState, useEffect} from 'react';

import CountryPicker from './Components/CountryPicker'
import Card from './Components/Card'
import { getExchangeRate, getCountries, convertCurrency } from './api'

import './App.css'

class App extends React.Component {
	state = {
		currFrom: '',
		currTo: '',
		amount: '',
		rate: 0
	}

	fetchRate = async () => {
		const { currFrom, currTo, amount } = this.state
		const data = await convertCurrency(currFrom, currTo, amount)
		this.setState({rate: data})
	}

	handleFromCountryChange = (countryFrom) => {
		this.setState({currFrom: countryFrom})
	}
	handleToCountryChange = (countryTo) => {
		this.setState({currTo: countryTo})
	}
	handleInputChange = (e) => {
		this.setState({amount: e.target.value})
	}

	componentDidUpdate() {
		const { currFrom, currTo } = this.state;
		if( currFrom !== '' && currTo !== '' ) {
			this.fetchRate()
		}
	}

	render() {
		const { currFrom, currTo, rate, amount } = this.state
		return(
			<div className="appContainer">
				<input
					className="amountInput"
					type="number"
					placeholder="Amount to convert"
					value={amount}
					onChange={this.handleInputChange}
				/>
				<CountryPicker handleFromCountryChange={this.handleFromCountryChange} handleToCountryChange={this.handleToCountryChange} />
				<Card rate={rate} />
			</div>
		)
	}
}


export default App
