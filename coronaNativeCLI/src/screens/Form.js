import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Form = (props) => {
	const { navigation } = props
	const [state, setState] = useState({
		positionName: '',
		description: '',
		latitude: '',
		longitude: '',
		token: ''
	})
	useEffect(() => {
		AsyncStorage.getItem('token')				//get item from storage
			.then(token => {
				setState({
					...state, token,
					longitude: navigation.getParam('longitude'),
					latitude: navigation.getParam('latitude'),
				})
			})
	}, [])

	post = () => {
		fetch("https://corona-app.hughdo.dev/api/locations/new/", {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + (state.token),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'positionName': state.positionName,
				'description': state.description,
				'latitude': state.latitude,
				'longitude': state.longitude,
			})
		})
		navigation.navigate('Map')
	}

	return (
		
		<KeyboardAvoidingView
		style={styles.view}
		behavior={'height'} 
		enabled
			>
			<TextInput
			style={styles.textInput}
				value={state.positionName}
				onChangeText={(positionName) =>
					setState({ ...state, positionName })}
				placeholder={'Name of Position'}
				required
			/>
			<TextInput
				value={state.description}
				onChangeText={(description) =>
					setState({ ...state, description })}
				placeholder={'Nhap noi dung'}
				style={styles.description}
				multiline={true}
				required
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={post}
			>
				<Text
				style={styles.text}
				>POST</Text>
			</TouchableOpacity>
			</KeyboardAvoidingView>
		
	)
}

export default Form
const styles = StyleSheet.create({
	view: {
		padding: 20,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 50
	},
	description: {
		height: 400,
		borderColor: 'gray',
		borderWidth: 2,
		textAlign: "left",
		textAlignVertical: "top",
		margin: 20,
		padding: 20,
		width:300,
		borderRadius:4,
		borderColor: 'rgba(110, 104, 110, 0.25)',
	},
	button: {
		height: 40,
		width: 160,
		borderRadius: 10,
		backgroundColor: 'rgba(17, 119, 197, 0.57)',
		marginLeft: 50,
		marginRight: 50,
		marginTop: 10,
	},

	text: {
		fontFamily: 'Cochin',
		textAlign: 'center',
		marginTop: 10,
		color: 'white'
	},
	textInput: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'rgba(110, 104, 110, 0.25)',
		width: 300,
		padding: 10,
		margin: 3,
		
	},
})