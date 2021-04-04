import React from 'react';

import './Button.scss';

interface Props {
    text: string;
    style?: BUTTON_STYLES;
    onClick: () => void;
}

export enum BUTTON_STYLES {
    PRIMARY = 'primary'
}

function Button({ text, style, onClick }: Props) {
	return(
		<button 
			className={`spot-button--${style || BUTTON_STYLES.PRIMARY}`} 
			onClick={onClick}
		>
			{text}
		</button>
	);
}

export default Button;