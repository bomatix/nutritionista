import { ParamListBase, useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { Component, useState } from 'react'
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { useRecoilValue } from 'recoil';
import { FoodComponent } from '../../models/FoodComponent';
import { Color, Container, FontSize, Margin, Padding } from '../../utils/Consts'
import { Utils } from '../../utils/Utils';
import FoodComponentListItem from './FoodComponentListItem';
import { mealSelectedFoodComponents, foodComponentsList } from './globalStates';

const AddFood = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [foodComponent, setFoodComponent] = useState<FoodComponent>(FoodComponent.create());
    const allFoodComponents = useRecoilValue<FoodComponent[]>(foodComponentsList);
    const selectedComponents = useRecoilValue<number[]>(mealSelectedFoodComponents);

    /**
     * 
     */
    const addFood = async () => {
        // TODO: handle promises
        // TODO: add checks
        console.log(foodComponent)
        await FoodComponent.insert(foodComponent);
    }

    /**
     * 
     * @param text 
     * @param fieldName 
     */
    const setFoodComponentField = (fieldName: string, text: string) => {
        let tempFoodComponent: FoodComponent = Utils.copyObject(foodComponent);
        switch(fieldName) {
            case 'name': {
                tempFoodComponent.name = text; 
                break;
            }
            case 'kcal': {
                tempFoodComponent.kcal = Utils.parseFloatInput(text); 
                break;
            }
            case 'carbs': {
                tempFoodComponent.carbs = Utils.parseFloatInput(text); 
                break;
            }
            case 'protein': {
                tempFoodComponent.protein = Utils.parseFloatInput(text); 
                break;
            }
            case 'fat': {
                tempFoodComponent.fat = Utils.parseFloatInput(text); 
                break;
            }
        }

        setFoodComponent(tempFoodComponent);
    }

    const setComplexFoodComponent = () => {
        let tempFoodComponent: FoodComponent = Utils.copyObject(foodComponent);
        tempFoodComponent.isComplex = !tempFoodComponent.isComplex;
        setFoodComponent(tempFoodComponent);
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                <Text>Meal</Text>
                <Switch 
                    onValueChange = {setComplexFoodComponent}
                    value = {foodComponent.isComplex}/>
            </View>
            <TextInput 
                style = { styles.foodName }
                selectionColor = { Color.ACCENT_PRIMARY }
                value = { foodComponent.name }
                onChangeText = { setFoodComponentField.bind(this, 'name') }
                placeholder = 'Food name...'/>
            <View style = { styles.rowView }>
                <TextInput 
                    style = {[ styles.columnView, styles.foodName ]}
                    selectionColor = { Color.ACCENT_PRIMARY }
                    value = { foodComponent.kcal?.toString() }
                    onChangeText = { setFoodComponentField.bind(this, 'kcal') }
                    placeholder = 'kcal'/>
                <TextInput 
                    style = {[ styles.columnView, styles.foodName ]}
                    selectionColor = { Color.ACCENT_PRIMARY }
                    value = { foodComponent.carbs?.toString() }
                    onChangeText = { setFoodComponentField.bind(this, 'carbs') }
                    placeholder = 'carbs'/>
            </View>
            <View style = { styles.rowView }>
                <TextInput 
                    style = {[ styles.columnView, styles.foodName ]}
                    selectionColor = { Color.ACCENT_PRIMARY }
                    value = { foodComponent.protein?.toString() }
                    onChangeText = { setFoodComponentField.bind(this, 'protein') }
                    placeholder = 'protein'/>
                <TextInput 
                    style = {[ styles.columnView, styles.foodName ]}
                    selectionColor = { Color.ACCENT_PRIMARY }
                    value = { foodComponent.fat?.toString() }
                    onChangeText = { setFoodComponentField.bind(this, 'fat') }
                    placeholder = 'fat'/>
            </View>
            {foodComponent.isComplex && 
            <View>
                <Text>Ingredients</Text>
                {
                    allFoodComponents
                        .filter(component => selectedComponents.find(item => item == component.id!))
                        .map(component => (<FoodComponentListItem component={component} />))
                }
                <Button title='Add' onPress={()=>{navigation.navigate('SelectIngredients')}}/>
            </View>}
            <Button title = 'Add' onPress={addFood}/>
        </View>
    )
}

export default AddFood

const styles = StyleSheet.create({
    container: {
        padding: Padding.LARGE
    },
    rowView: {
        flexDirection: 'row',
    },
    columnView: {
        flex: 1
    },
    foodName: {
        fontSize: FontSize.TEXT,
        paddingVertical: Padding.MEDIUM,
        paddingHorizontal: Padding.MEDIUM,
        backgroundColor: Color.CONTAINER_SECONDARY,
        borderRadius: Container.BORDER_RADIUS,
        marginVertical: Margin.MEDIUM,
        color: Color.TEXT_CONTAINER_SECONDARY,
    },
    addButton: {

    }
})
