import { NavigationContainer } from '@react-navigation/native'
import { Approutes } from './app.routes'
import { View } from 'react-native'
import { useTheme } from 'styled-components/native'


export function Routes(){

  const { COLORS } = useTheme()

  return(
    <View style={{ flex:1, backgroundColor: COLORS.GRAY_600 }}>
      <NavigationContainer>
        <Approutes />
      </NavigationContainer>
    </View>
  )
}