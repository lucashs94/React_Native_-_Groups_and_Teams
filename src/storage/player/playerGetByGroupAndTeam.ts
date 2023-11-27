import { playerGetByGroup } from "./playerGetByGroup"



export async function playerGetByGroupAndTeam(group: string, team: string){


  try {
    
    const stored = await playerGetByGroup(group)

    const players = stored.filter( player => player.team === team )

    return players

  } catch (error) {
    throw error
  }
}