import React from 'react'
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native'
import { BORDER_RADIUS, COLOR_BACKGROUND_PRIMARY, LARGE_PADDING, MEDIUM_PADDING, SMALL_PADDING, TEXT_FONT_SIZE } from '../../utils/Consts'
import { GSTYLE_SCREEN_CONTAINER } from '../../utils/GlobalStyles'

const AllFoodComponents = () => {
    return (
        <View style = {GSTYLE_SCREEN_CONTAINER}>
            <TextInput 
                style = {styles.searchBar}
                placeholder = 'Search...'/>
            {/* <FlatList/> */}
        </View>
    )
}   

const styles = StyleSheet.create({
    searchBar: {
        fontSize: TEXT_FONT_SIZE,
        paddingHorizontal: SMALL_PADDING,
        paddingVertical: MEDIUM_PADDING,
        backgroundColor: COLOR_BACKGROUND_PRIMARY,
        borderRadius: BORDER_RADIUS
    }
})

export default AllFoodComponents
