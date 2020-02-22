import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const User = (props) => {
    const [state, setState] = useState("")
    const { navigation } = props
    useEffect(() => {
        AsyncStorage.getItem('token')				//get item from storage
            .then(token => {
                fetch("https://corona-app.hughdo.dev/api/user/me/", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + (token),
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json()
                        .then(data => {
                            setState(data.data)
                        })
                    )
            })
    }, [])

    return (
        <View
            style={styles.view}
        >
            <Image
                style={styles.user}
                source={require('../../assets/user.png')}
            >
            </Image>
            <Text
                style={styles.textContent}
            >{state.name}</Text>
            <Text
                style={styles.textContent}
            >{state.address}</Text>
            <Text
                style={styles.textContent}
            >{state.email}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    AsyncStorage.removeItem('token')
                        .then(
                            navigation.navigate('Login')
                        )
                }}
            ><Text
                style={styles.text}
            >Log out </Text>
            </TouchableOpacity>
        </View>
    )
}

export default User
const styles = StyleSheet.create({
    view: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    button: {
        height: 40,
        width: 160,
        borderRadius: 10,
        backgroundColor: 'rgba(17, 119, 197, 0.57)',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 240,
    },
    user: {
        height: 300,
        width: 300
    },
    text: {
        fontFamily: 'Cochin',
        textAlign: 'center',
        marginTop: 10,
        color: 'white'
    },
    textContent: {
        fontSize: 30
    }
})