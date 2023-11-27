import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Button from "@components/Button";
import Input from "@components/Input";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";


export default function NewGroup(){

  const [group, setGroup] = useState('')

  const { navigate } = useNavigation()

  async function handleNew(){
    if(group.trim().length === 0) return

    try {
      await groupCreate(group)
      navigate('players', { group })

    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Novo Grupo', error.message)
      }else{
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
        console.log(error)
      }
    }
  }


  return(
    <Container>

      <Header showBackButton />

      <Content>

        <Icon />

        <Highlight title="Nova Turma" subtitle="Crie a sua turma e inscreva a pessoas"/>

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          autoCapitalize="words"
        />

        <Button 
          onPress={ handleNew }
          title="Criar"
          style={{ marginTop: 20,}}
        />

      </Content>
      
    </Container>
  )
}