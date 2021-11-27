import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native'
import { FoodComponent } from '../../models/FoodComponent'
import { Color, Container, FontSize, Padding } from '../../utils/Consts'
import { GSTYLE_SCREEN_CONTAINER } from '../../utils/GlobalStyles'

const AllFoodComponents = () => {

    const [foodComponents, setFoodComponents] = useState<FoodComponent[]>([]);

    const loadData = useCallback(async () => {
        setFoodComponents(await FoodComponent.getAll());
        console.log(foodComponents);
    }, []);

    useEffect(() => {
        loadData();
    }, [foodComponents]);

    return (
        <View style = {GSTYLE_SCREEN_CONTAINER}>
            <TextInput 
                style = {styles.searchBar}
                placeholder = 'Search...'/>
            {/* <FlatList/> */}
            {foodComponents.map(item => (
                <Text
                    style={{paddingVertical: 10}}>{item.name}</Text>
            ))}
        </View>
    )
}   

const styles = StyleSheet.create({
    searchBar: {
        fontSize: FontSize.TEXT,
        paddingHorizontal: Padding.SMALL,
        paddingVertical: Padding.MEDIUM,
        backgroundColor: Color.BACKGROUND_PRIMARY,
        borderRadius: Container.BORDER_RADIUS
    }
})

export default AllFoodComponents
