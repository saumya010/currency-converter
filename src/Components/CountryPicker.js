import React, { useState, useEffect } from 'react';
import { getCountryNames } from '../api'

const CountryPicker = ({handleFromCountryChange, handleToCountryChange}) => {

	const [countryFrom, setFromCountry] = useState([])
	const [countryTo, setToCountry] = useState([])

	useEffect(() => {
		const fetchCountry = async () => {
			const data = await getCountryNames()
			setFromCountry(data)
			setToCountry(data)
		}
		fetchCountry()
	}, [setFromCountry, setToCountry])

	if(countryFrom.length === 0) return "Loading!"
	return(
		<div className="countryPickers">
			<select onChange={(e) => handleFromCountryChange(e.target.value)}>
				<option value="">Select Origin Country</option>
				{
					Object.entries(countryFrom).map(([k, v], i) => {
						if(v) return <option value={v[0]} key={i}>{v[1]}</option>
						return ''
					})
				}
			</select>
			<select onChange={(e) => handleToCountryChange(e.target.value)}>
				<option value="">Select Destination Country</option>
				{
					Object.entries(countryTo).map(([k, v], i) => {
						if(v) return <option value={v[0]} key={i}>{v[1]}</option>
						return ''
					})
				}
			</select>
		</div>
	)
}

export default CountryPicker
