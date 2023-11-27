import AsyncStorage from "@react-native-async-storage/async-storage"
import { groupGetAll } from "./groupGetAll"
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig"




export async function groupRemoveByName(groupName: string){

  try {
    
    const storedGroups = await groupGetAll()
    const filteredGroups = storedGroups.filter( group => group !== groupName)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(filteredGroups))
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)

  } catch (error) {
    throw error
  }

}