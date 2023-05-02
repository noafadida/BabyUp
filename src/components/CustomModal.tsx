import React from 'react';
import { StyleSheet, Modal, TouchableOpacity } from 'react-native'

type Props = {
	visible: boolean;
	onClose: () => void;
	children: any;
	animationType?: "none" | "slide" | "fade";
	transparent?: boolean;
}

export default function CustomModal({ visible, onClose, animationType, transparent, children }: Props) {
	const { overlay } = styles;

	return (
		<Modal animationType={animationType} transparent={transparent} visible={visible} onRequestClose={onClose}>
			<TouchableOpacity style={overlay} onPress={onClose}>
				{children}
			</TouchableOpacity>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)',
		justifyContent: 'center',
		alignItems: 'center'
	}
});