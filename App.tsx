/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Button, Text } from 'react-native';
import Header from './src/components/Header';
import Home from './src/Home';
import AllFoodComponents from './src/screens/FoodComponents/AllFoodComponents';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name = 'Home' 
            component = {Home}/>
          <Tab.Screen 
            name = 'Components' 
            component = {AllFoodComponents} 
            options = {{
              header:() => <Header/>
            }}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;
function alert(arg0: string): void {
  console.log('ok')
}

