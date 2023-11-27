import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Keyboard, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

import Input from "@components/Input";
import Filter from "@components/Filter";
import Header from "@components/Header";
import Button from "@components/Button";
import ListEmpty from "@components/ListEmpty";
import Highlight from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import PlayerCard from "@components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import Loading from "@components/Loading";


type ParamsProps = {
  group: string
}


export default function Players(){

  const { navigate } = useNavigation()

  const newPlayerInputRef = useRef<TextInput>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('time a')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const { params } = useRoute()
  const { group } = params as ParamsProps


  async function handleAddPlayer(){
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Novo Player','Informe o nome do player para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)
      
      setNewPlayerName('')
      newPlayerInputRef.current?.blur()
      Keyboard.dismiss()
      fetchPlayersByTeam()
      
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Novo Player', error.message)
      }else{
        console.log(error);
        
        Alert.alert('Novo Player', 'Não foi possivel adicionar novo player.')
      }
    }
  }


  async function fetchPlayersByTeam(){
    
    try {
      setIsLoading(true)
      const playerByTeam = await playerGetByGroupAndTeam(group, team)
      
      setPlayers(playerByTeam)

    } catch (error) {
      console.log(error)
      Alert.alert('Novo player', 'Não foi possivel carregar todos os players.')

    }finally{
      setIsLoading(false)
    }

  }


  async function handlePlayerRemove(playername: string) {

    try {
      await playerRemoveByGroup(playername, group)
      fetchPlayersByTeam()
      
    } catch (error) {
      console.log(error);
      Alert.alert('Remover player', 'Não foi possivel remover esse player.')
    }
    
  }


  async function groupRemove() {

    try {
      await groupRemoveByName(group)
      navigate('groups')

    } catch (error) {
      console.log(error);
      Alert.alert('Remover Grupo', 'Não foi possivel remover o grupo')
    }
    
  }

  async function handleGroupRemove() {
    
    Alert.alert( 
      'Remove Group',
      'Deseja remover o grupo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() },
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])


  return(
    <Container>
      
      <Header showBackButton/>

      <Highlight 
        title={group} 
        subtitle="Inclua todos os players e separe as turmas"
      />

      <Form>
        <Input
          inputRef={newPlayerInputRef}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          placeholder="Nome do player"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        
        <ButtonIcon 
          icon='add'
          onPress={handleAddPlayer}
        />
      </Form>


      <HeaderList>
        <FlatList
          data={['time a', 'time b']}
          keyExtractor={ item => item }
          renderItem={ ({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={ () => setTeam(item) }
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {
        isLoading ? <Loading /> : 
      
        <FlatList 
          data={players}
          keyExtractor={item => item.name }
          renderItem={ ({ item }) => (
            <PlayerCard 
              name={item.name}
              onRemove={ () => handlePlayerRemove(item.name) }
            />
          )}
          ListEmptyComponent={ () => (
            <ListEmpty 
              message='Não há pessoas neste time!'
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 80 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      }

      <Button 
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}