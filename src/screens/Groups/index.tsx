import Header from '@components/Header'
import Highlight from '@components/Highlight'

import { Container } from './styles'
import GroupCard from '@components/GroupCard'
import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import ListEmpty from '@components/ListEmpty'
import Button from '@components/Button'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { groupGetAll } from '@storage/group/groupGetAll'
import Loading from '@components/Loading'


export default function Groups(){

  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const { navigate } = useNavigation()

  const isFocused = useIsFocused()


  function handleNewGroup(){
    navigate('new')
  }


  async function fecthGroups(){

    try {
      setIsLoading(true)
      const data = await groupGetAll()
      setGroups(data)

    } catch (error) {
      console.log(error)
      Alert.alert('Turmas', 'Não foi possivel carregar todas as turmas.')
      
    } finally{
      setIsLoading(false)
    }
  }


  function handleOpenGroup(group: string){
    navigate('players', { group })
  }


  useEffect(() => {

    fecthGroups()

  }, [isFocused])


  return(
    <Container>

      <Header />

      <Highlight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      {
        isLoading ? <Loading /> :
      
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <GroupCard 
              title={item} 
              onPress={ () => handleOpenGroup(item) }
            />
          )}
          contentContainerStyle={groups.length === 0 && {flex: 1,}}
          ListEmptyComponent={ () => (
            <ListEmpty 
              message='Vamos cadastrar a primeira turma?!'
            />
          )}
        />
      }

      <Button 
        title='Criar nova turma'
        onPress={ handleNewGroup }
      />
    </Container>
  )
}
