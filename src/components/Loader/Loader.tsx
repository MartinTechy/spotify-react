import React from 'react';

import './Loader.scss';

import { IoRefresh } from 'react-icons/io5';

function Loader()  {
	return (<div className='spot-loader'>
		<IoRefresh className='spot-loader__icon' />
	</div>);
}

export default Loader;