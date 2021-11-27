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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { Button, Text } from 'react-native';
import Header from './src/components/Header';
import Home from './src/Home';
import { FoodComponent } from './src/models/FoodComponent';
import AddFood from './src/screens/FoodComponents/AddFood';
import AddMeal from './src/screens/FoodComponents/AddMeal';
import AllFoodComponents from './src/screens/FoodComponents/AllFoodComponents';

const Tab = createBottomTabNavigator()

const FoodComponentsStack = createNativeStackNavigator()

const FoodComponentsNavigator = () => {
  return (
    <FoodComponentsStack.Navigator>
      <FoodComponentsStack.Screen 
        name = 'AllFoodComponents' 
        component = {AllFoodComponents}
        options = {{
          header: () => <Header/>
        }}/>
      <FoodComponentsStack.Screen 
        name = 'AddFood' 
        component = {AddFood} 
        />
      <FoodComponentsStack.Screen
        name = 'AddMeal'
        component = {AddMeal} />
    </FoodComponentsStack.Navigator>
  )
}

const App = () => {

  const loadDataCallback = useCallback(async () => {
    try {
      await FoodComponent.createTable();
      console.log('created table')
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name = 'Home' 
            component = {Home}/>
          <Tab.Screen 
            name = 'FoodComponentStack' 
            component = {FoodComponentsNavigator} 
            options = {{
              headerShown: false,
              title: 'Food'
            }}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;
function alert(arg0: string): void {
  console.log('ok')
}

