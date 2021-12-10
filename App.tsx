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
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { Button, Text } from 'react-native';
import { RecoilRoot } from 'recoil';
import Header from './src/components/Header';
import Home from './src/Home';
import { FoodComponent } from './src/models/FoodComponent';
import { Quantity } from './src/models/Quantity';
import AddFood from './src/screens/FoodComponents/AddFood';
import AddMeal from './src/screens/FoodComponents/AddMeal';
import AllFoodComponents from './src/screens/FoodComponents/AllFoodComponents';
import SelectFoodComponentsList from './src/screens/FoodComponents/SelectFoodComponentsList';

const Tab = createBottomTabNavigator()

const FoodComponentsStack = createNativeStackNavigator()

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#b2f2da',
  },
};

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
      <FoodComponentsStack.Screen
        name = 'SelectIngredients'
        component = { SelectFoodComponentsList } />
    </FoodComponentsStack.Navigator>
  )
}

const App = () => {

  const initializeDatabase = useCallback(async () => {
    try {
      await FoodComponent.createTable();
      await Quantity.createTable();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  return (
    <RecoilRoot>
      <NavigationContainer theme={navTheme}>
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
    </RecoilRoot>
  );
};

export default App;
function alert(arg0: string): void {
  console.log('ok')
}

