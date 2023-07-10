import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCameraPermissions, PermissionStatus, launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker'
import { EMPTY_STRING } from '../consts/GeneralConsts';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setImageBlob } from '../store/general';

type Props = {
	isShowTakeImage?: boolean;
}

const ImagePicker = ({ isShowTakeImage = true }: Props) => {
	const [pickedImage, setPickedImage] = useState<string>(EMPTY_STRING);
	const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

	const dispatch = useDispatch()

	const verifyPermission = async () => {
		if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted
		}
		if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
			return false
		}
		return true
	}

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermission();

		if (!hasPermission) {
			return
		}
		const { assets } = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5
		})
		const imageUri = assets?.[0]?.uri;
		imageUri && handleConvertImageToBlob(imageUri)
	}

	const pickImageHandler = async () => {
		const result = await launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5
		});

		if (!result.canceled) {
			const imageUri = result.assets?.[0]?.uri
			imageUri && handleConvertImageToBlob(imageUri)
		} else {
			Alert.alert('You did not select any image.');
		}
	};

	const handleConvertImageToBlob = async (imageUri: string) => {
		const response = await fetch(imageUri)
		const blob = await response.blob()
		dispatch(setImageBlob({ imageBlob: blob }))
		setPickedImage(imageUri)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={pickImageHandler}>
				<Ionicons name={"image"} style={styles.galleryButton} size={40} />
				<View style={styles.imageContainer}>
					{pickedImage ? (
						<Image source={{ uri: pickedImage }} style={styles.image} />
					) : (
						<Text style={styles.choosePhotoText}>העלה תמונה </Text>
					)}
				</View>
			</TouchableOpacity>

			{isShowTakeImage && <TouchableOpacity onPress={takeImageHandler}>
				<Ionicons name={"camera"} style={styles.cameraButton} size={40} />
				<Text style={styles.takePhotoText}>צלם עכשיו </Text>
			</TouchableOpacity>}
		</View>
	)
}

export default ImagePicker

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageContainer: {
		margin: 10,
		width: "40%",
		aspectRatio: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		overflow: "hidden",
		marginBottom: 20,
		alignContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	cameraButton: {
		position: "absolute",
		right: -30,
		color: "#FF8DC7",
	},
	galleryButton: {
		position: "absolute",
		flexDirection: "row",
		margin: 65,
		color: "#FF8DC7",
	},
	choosePhotoText: {
		fontSize: 14,
		margin: 30,
		color: "#ccc",
	},
	takePhotoText: {
		fontSize: 14,
		color: "#ccc",
		margin: 15
	}
});