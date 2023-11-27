import React from "react";
import { Container, SubTitle, Title } from "./styles";


type Props = {
  title: string
  subtitle: string
}

export default function Highlight(props: Props){
  return(
    <Container>

      <Title>
        {props.title}
      </Title>

      <SubTitle>
        {props.subtitle}
      </SubTitle>

    </Container>
  )
}