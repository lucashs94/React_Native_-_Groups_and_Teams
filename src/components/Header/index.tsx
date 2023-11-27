import { useNavigation } from "@react-navigation/native";
import { BackButton, BackIcon, Container, Logo } from "./syles";

import logoImg from '@assets/wolves.png'

type BackProps = {
  showBackButton?: boolean
}

export default function Header({ showBackButton = false }: BackProps){

  const { navigate } = useNavigation()

  function handleGoBack(){
    navigate('groups')
  }

  return(
    <Container>

      {
        showBackButton &&
        <BackButton
          onPress={handleGoBack}
        >
          <BackIcon />
        </BackButton>
      }

      <Logo 
        source={logoImg}
      />

    </Container>
  )
}