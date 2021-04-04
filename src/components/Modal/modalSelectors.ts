import { RootState } from '../../app/store';

export const getIsModalOpen = () => (state: RootState) => state.modal.isModalOpen;

export const getModalHeading = () => (state: RootState) => state.modal.modalHeading;

export const getModalContentID = () => (state: RootState) => state.modal.modalContentID;

export const getModalProps = () => (state: RootState) => state.modal.modalProps;
