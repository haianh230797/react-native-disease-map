import React from 'react';
import { StyleSheet, } from 'react-native';
import { createAppContainer } from 'react-navigation'

import AppNavigator from './AppNavigator'

const AppContainer = createAppContainer(AppNavigator); 


class App extends React.Component {
render(){
     return (
    <AppContainer />
  );
}
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft:16,
    paddingRight:16,
  },
});