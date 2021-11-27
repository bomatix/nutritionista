import { ParamListBase, useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import ContextMenu from 'react-native-context-menu-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Padding } from '../utils/Consts'

/**
 * This is a reusable component that can be used for
 * headers on every screen.
 * @returns 
 */
const Header = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <SafeAreaView style={styles.headerContainer}>
            <Button onPress = {()=>{navigation.navigate('AddFood')}} title = 'Add food'/>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: Padding.SMALL
    },
})
