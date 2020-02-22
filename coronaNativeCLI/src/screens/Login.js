import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {
	const { navigation } = props
	const [state, setState] = useState({
		username: '',
		password: '',
		error: '',
	})

	login = () => {
		fetch("https://corona-app.hughdo.dev/api/user/login/", {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'username': state.username,
				'password': state.password
			})
		})
			.then(res => res.json()
				.then(data => {
					if (data.success === true) {
						AsyncStorage.setItem('token', data.data.token);		//set token to storage
						navigation.navigate('Map')
					}
					else {
						setState({ error: data.error })
					}
				})
			)
	}

	return (
		<View
			style={styles.view}
		>
			<Image
				style={styles.logo}
				source={require('../../assets/logo.png')}
			>
			</Image>
			<Text style={styles.warning}>{state.error}</Text>
			<TextInput
				value={state.username}
				onChangeText={(username) => { setState({ ...state, username }) }}
				placeholder={'username'}
				style={styles.textInput}
			/>
			<TextInput
				value={state.password}
				onChangeText={(password) => { setState({ ...state, password }) }}
				placeholder={'password'}
				secureTextEntry={true}
				style={styles.textInput}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={login}
			>
				<Text
					style={styles.text}
				>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					navigation.navigate('Registration')
				}}
			>
				<Text
					style={styles.text}
				>Registration</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Login;
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
		justifyContent: 'center',
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
	logo: {
		height: 100,
		width: 100,
		marginBottom: 150
	}
})