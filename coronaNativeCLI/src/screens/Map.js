import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import MapStyle from '../MapStyle'

const Map = () => {
  const [state, setState] = useState([{
    latitude: 21.0228161,
    longitude: 105.8018581,
    radius: 2000
  },
    {
      latitude: 21.02217468,
      longitude: 105.417854,
      radius: 2000
    }])


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.0228161,
          longitude: 105.8018581,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={MapStyle}
      >
       {state.map(state=>{
  <Circle
  center={{
    latitude: {state.latitude} 
    longitude: {state.longitude}

  }}
  radius={state.radius }
  strokeWidth={1}
  fillColor={'rgba(255,0,0,0.2)'}

/>
})}

          
       


        <Marker
          draggable
          coordinate={{
            latitude: state.latitude,
            longitude: state.longitude
          }}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Test Marker'}
          description={'This is a description of the marker'}
        />




      </MapView>
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
});
