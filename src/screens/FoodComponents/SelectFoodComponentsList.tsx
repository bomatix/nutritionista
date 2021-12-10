import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useRecoilState } from 'recoil';
import { FoodComponent } from '../../models/FoodComponent';
import { Utils } from '../../utils/Utils';
import { foodComponentsList, mealSelectedFoodComponents } from './globalStates';

const SelectFoodComponentsList = () => {

    const [foodComponents, setFoodComponents] = useRecoilState<FoodComponent[]>(foodComponentsList);
    const [selected, setSelected] = useRecoilState<number[]>(mealSelectedFoodComponents);

    const select = (id: number) => {
        let temp = [...selected];
        console.log(JSON.stringify(temp));
        if(!temp.includes(id)) temp.push(id);
        else temp = temp.filter(el => el != id);
        console.log(temp);
        setSelected(temp);
    }

    return (
        <View>
            {foodComponents.map(item => (
                    <Text
                        onPress = {select.bind(this, item.id!)}
                        style = {{paddingVertical: 10, color: selected.includes(item.id!)?'red':'blue'}}>{item.name} {item.kcal}</Text>
                ))}
        </View>
    )
}

export default SelectFoodComponentsList

const styles = StyleSheet.create({})
