import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'
import { useState } from 'react';
import CustomModal from '../CustomModal';

type Props = {
	item: any;
}

const SuperFoodItem = ({ item }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const ItemModal = () => (
		<View style={styles.modal}>
			<Text style={styles.modalTitleText}>{item.title}</Text>
			<Text style={styles.modalDataText}>{item.itemData} </Text>
		</View>
	)
	return (
		<>
			<View style={styles.item}>
				<Pressable
					android_ripple={{ color: "#ccc" }}
					style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
					onPress={() => setIsModalOpen(true)}
				>
					<View style={styles.innerContainer}>
						<Text style={styles.title}>{item.title}</Text>
					</View>
				</Pressable>
			</View >
			{isModalOpen && (
				<CustomModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} transparent animationType='fade'>
					<ItemModal />
				</CustomModal>
			)}
		</>
	)
}
export default SuperFoodItem

const styles = StyleSheet.create({
	item: {
		marginVertical: 12,
		marginHorizontal: 15,
		overflow: Platform.OS === 'android' ? "hidden" : 'visible',
		borderRadius: 20,

	},
	innerContainer: {
		overflow: 'hidden',
		borderRadius: 8,
		width: 100
	},
	image: {
		width: "100%",
		height: 200
	},
	title: {
		fontSize: 16,
		letterSpacing: 0.3,
		textAlign: "center",
		padding: 8,
		backgroundColor: "#D3DEDC",
		borderRadius: 20,
		color: "white",
	},
	buttonPressed: {
		opacity: 0.9,
	},
	modal: {
		backgroundColor: '#F7C8E0',
		padding: 20,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		width: "80%"
	},
	modalTitleText: {
		textAlign: 'center',
		fontSize: 18,
		color: "white",
		fontWeight: "500"
	},
	modalDataText: {
		textAlign: 'center',
		color: "white",
		marginHorizontal: 7,
		marginTop: 10,
		fontSize: 18,
	}
})