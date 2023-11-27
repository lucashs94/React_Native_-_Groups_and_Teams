import AsyncStorage from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION } from "@storage/storageConfig"
import { groupGetAll } from "./groupGetAll"
import { AppError } from "@utils/AppError"


export async function groupCreate(GroupName: string){

  try {
    const storedGroups = await groupGetAll()

    const groupAlreadyExists = storedGroups.includes(GroupName)

    if(groupAlreadyExists){
      throw new AppError('Já existe um grupo cadastrado com esse nome!')
    }
    
    const newStoredGroups = JSON.stringify([...storedGroups, GroupName])
    await AsyncStorage.setItem(GROUP_COLLECTION, newStoredGroups)

  } catch (error) {
    throw error
  }

}