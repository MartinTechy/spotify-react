import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalReducerState {
    isModalOpen: boolean;
    modalHeading: string;
    modalContentID?: string;
    modalProps?: Object;
}

export interface OpenModalPayload {
    modalHeading: string;
    modalContentID: string;
    modalProps?: Object
}

const initialState: ModalReducerState = {
	isModalOpen: false,
	modalHeading: '',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<OpenModalPayload>) {
			const { modalHeading, modalContentID, modalProps } = action.payload;
			state.isModalOpen = true;
			state.modalHeading = modalHeading;
			state.modalContentID = modalContentID;
			state.modalProps = modalProps;
		},
		closeModal(state) {
			state.isModalOpen = false;
			state.modalHeading = '';
			state.modalProps = undefined;
			state.modalContentID = undefined;
		}
	}
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;