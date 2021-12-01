import React from 'react';

const Card = ({rate}) => {
	if(rate === 0) return ''
	return(
		<div className="currencyCard">{rate}</div>
	)
}

export default Card;
