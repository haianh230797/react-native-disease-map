import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';

const Registration = (props) => {
	const { navigation } = props
	const [state, setState] = useState({
		email: '',
		password: '',
		name: '',
		address: '',
		success: '',
		error: '',
		success: ''
	})

	registration = () => {
		fetch('https://corona-app.hughdo.dev/api/user/signup/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'username': state.username,
				'password': state.password,
				'email': state.email,
				'name': state.name,
				'address': state.address
			})
		})
			.then(res => res.json()
				.then(data => {
					if (data.success === true) {
						navigation.navigate('Login')
					}
					setState({ error: data.error })
				}
				))
	}
	return (
		<View
			style={styles.view}
		>
			<Text style={styles.warning}
			>{state.error}</Text>
			<TextInput
				style={styles.textInput}
				value={state.username}
				onChangeText={(username) => { setState({ ...state, username: username }) }}
				placeholder={'username'}
			/>
			<TextInput
				style={styles.textInput}
				value={state.password}
				onChangeText={(password) => { setState({ ...state, password: password }) }}
				placeholder={'password'}
				secureTextEntry={true}
			/>
			<TextInput
				style={styles.textInput}
				value={state.email}
				onChangeText={(email) => { setState({ ...state, email: email }) }}
				placeholder={'email'}
			/>

			<TextInput
				style={styles.textInput}
				value={state.name}
				onChangeText={(name) => { setState({ ...state, name: name }) }}
				placeholder={'name'}
			/>

			<TextInput
				style={styles.textInput}
				value={state.address}
				onChangeText={(address) => { setState({ ...state, address: address }) }}
				placeholder={'address'}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={registration}
			><Text
				style={styles.text}
			>Registration</Text>
			</TouchableOpacity>
		</View>
	)
}


export default Registration;
const styles = StyleSheet.create({
	warning: {
		color: 'red'
	},
	text: {
		fontFamily: 'Cochin',
		textAlign: 'center',
		marginTop: 10,
		color: 'white'
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
	view: {
		padding: 20,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	textInput: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'rgba(110, 104, 110, 0.25)',
		width: 250,
		padding: 10,
		margin: 3,
		backgroundColor: 'rgba(110, 104, 110, 0.25)'
	},
})
