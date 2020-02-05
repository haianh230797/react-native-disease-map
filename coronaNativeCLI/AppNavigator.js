import { createStackNavigator } from 'react-navigation-stack';

import Map from './src/screens/Map';


const AppNavigator = createStackNavigator({
    Map:{
        screen:Map
    }
})


export default AppNavigator;