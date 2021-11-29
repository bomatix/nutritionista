import React, { useState } from 'react'
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { FoodComponent } from '../../models/FoodComponent';
import { FontSize, Padding } from '../../utils/Consts'

const AddFood = () => {

    const [foodName, setFoodName] = useState('');

    const addFood = async () => {
        // TODO: handle promises
        // TODO: add checks
        const foodComponent = FoodComponent.create(foodName);
        await FoodComponent.insert(foodComponent);
    }

    return (
        <View>
            <Text>Add Food</Text>
            <TextInput 
                style = { styles.foodName }
                value = { foodName }
                onChangeText = { (text) => {setFoodName(text)} }
                placeholder = 'Food name...'/>
            <Switch />
            <Button title = 'Add' onPress={addFood}/>
        </View>
    )
}

export default AddFood

const styles = StyleSheet.create({
    container: {

    },
    foodName: {
        fontSize: FontSize.TEXT,
        paddingHorizontal: Padding.SMALL,
        paddingVertical: Padding.MEDIUM,
    },
    addButton: {

    }
})
