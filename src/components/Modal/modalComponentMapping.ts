import { ConnectedComponent } from 'react-redux';
import CreatePlaylistModal from '../../features/playlist/CreatePlaylistModal';

const components:Record<string, ConnectedComponent<any, any> > = {
	'createPlaylist': CreatePlaylistModal
};

export function getComponentByID(componentID: string) {
	const component = components[componentID];
	if(component) {
		return component;
	} else {
		console.error(`"${componentID}" can't be mapped to a modal component. Make sure the component is addes to the mapping`);
		return undefined;
	}
}