import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Modal.scss';
import { getComponentByID } from './modalComponentMapping';
import { getIsModalOpen, getModalContentID, getModalHeading, getModalProps } from './modalSelectors';
import { closeModal } from './modalSlice';

function Modal() {
	const dispatch = useDispatch();
	const isModalOpen = useSelector(getIsModalOpen());
	const modalHeading = useSelector(getModalHeading());
	const modalContentID = useSelector(getModalContentID());
	const modalProps = useSelector(getModalProps());

	const Component = modalContentID ? getComponentByID(modalContentID): undefined;

	return (<>
		{isModalOpen && <>
			<div className='spot-modal'>
				{modalHeading && <div className='spot-modal__header'>{modalHeading}</div>}
				<div className='spot-modal__body'>
					{Component && <Component {...modalProps}/>}
				</div>
			</div>
			<div className='spot-modal-overlay' onClick={() => dispatch(closeModal())}/>
		</>}
	</>);
}

export default Modal;