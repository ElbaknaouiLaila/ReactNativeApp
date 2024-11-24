import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LogoutButton } from '../auth/LogoutButton'

const HomeScreen = () => {
  return (
    <View>
       <LogoutButton 
        variant="primary"
        showConfirmation={true}
      />
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})