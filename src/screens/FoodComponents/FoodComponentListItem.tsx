import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { FoodComponent } from '../../models/FoodComponent'
import { Color, Container, Margin, Padding } from '../../utils/Consts'

interface FoodComponentListItemProps {
    component: FoodComponent;
    selected: boolean;
    setSelected: (id: number) => void;
}

const FoodComponentListItem = ({component, selected}: FoodComponentListItemProps) => {
    return (
        <View style = { styles.container }>
            <Text style = { styles.text }>{component.name}</Text>
        </View>
    )
}

FoodComponentListItem.defaultProps = {
    selected: false,
    setSelected: null
}

export default FoodComponentListItem

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Padding.MEDIUM,
        paddingVertical: Padding.MEDIUM,
        marginBottom: Margin.MEDIUM,
        borderRadius: Container.BORDER_RADIUS,
        backgroundColor: Color.CONTAINER_SECONDARY,
    },
    text: {
        color: Color.TEXT_CONTAINER_SECONDARY
    }
})
