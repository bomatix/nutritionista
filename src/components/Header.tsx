import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SMALL_PADDING } from '../utils/Consts'

/**
 * This is a reusable component that can be used for
 * headers on every screen.
 * @returns 
 */
const Header = () => {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <Button onPress = {()=>{}} title = 'Add'/>
            <Button onPress = {()=>{}} title = 'Add'/>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SMALL_PADDING
    },
})
