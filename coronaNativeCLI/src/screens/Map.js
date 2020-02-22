import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';

import MapStyle from '../MapStyle'
import AsyncStorage from '@react-native-community/async-storage';

const INIT_LATITUDE = 21.0228161;
const INIT_LONGITUDE = 105.8018581;
const INIT_LATITUDEDELTA = 0.01;
const INIT_LONGITUDEDELTA = 0.05;
const RED = "rgba(360,100,57,0.4)";
const RADIUS = 20000;

const Map = (props) => {
  const { navigation } = props
  const [state, setState] = useState([])
  let focusListener;

  useEffect(() => {
    AsyncStorage.getItem('token')				//get item from storage
      .then(token => {
        focusListener = navigation.addListener('didFocus', () => {      // reload screen when go back
          fetch("https://corona-app.hughdo.dev/api/locations/all/", {
            method: "get",
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + (token),
            },
          })
            .then(res => res.json())
            .then(data => {
              setState(data.data)
            })
            .catch(err => console.log(err))
        })
      })

    return () => {
      focusListener.remove();       //remove 
    }
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: INIT_LATITUDE,                    // vi tri cua man hinh start
          longitude: INIT_LONGITUDE,
          latitudeDelta: INIT_LATITUDEDELTA,
          longitudeDelta: INIT_LONGITUDEDELTA,
        }}
        customMapStyle={MapStyle}
        onLongPress={(e) => {
          navigation.navigate('Form', {
            latitude: (e.nativeEvent.coordinate.latitude),
            longitude: (e.nativeEvent.coordinate.longitude),
          })
        }}
      >
        {state.map(pos => (
          <React.Fragment
            key={pos.latitude}
          >
            <Circle
              center={{
                latitude: pos.latitude,
                longitude: pos.longitude
              }}
              radius={RADIUS}
              fillColor={RED}
              strokeColor={RED}
            />
            <Marker
              draggable
              coordinate={{
                latitude: pos.latitude,
                longitude: pos.longitude
              }}
              title={pos.positionName}
              description={pos.description}
            />
          </React.Fragment>
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('User')
        }}
      >
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        >
        </Image>
      </TouchableOpacity>
    </View>
  )
}

export default Map
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(232, 244, 253, 1)',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    borderRadius: 50,
    marginBottom: 20
  },
  logo: {
    height: 50,
    width: 50,
    marginLeft: 4,
    marginTop: 4
  }
});
