import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { Container, LoadIndicator } from './styles'


export default function Loading(){
  return(
    <Container>
      <LoadIndicator />
    </Container>
  )
}