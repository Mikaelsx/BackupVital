import { StatusBar } from "react-native"
import { ButtonNormal } from "../../components/Button/Button"
import { Container } from "../../components/Container/StyleContainer"
import { DescriptionPassword } from "../../components/Descriptions/Descriptions"
import { Input } from "../../components/Input/Input"
import { Logo, Seta } from "../../components/Images/StyleImages"
import { Title } from "../../components/Title/StyleTitle"
import { useState } from "react"

import api from '../../services/Services'

export const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')

    async function EnviarEmail() {
        await api.post(`/RecuperarSenha?email=${email}`)
        .then(() => {
            navigation.replace("CheckEmail", { "emailRecuperacao" : email })
        }).catch(error => {
            console.log(error)
        })
    }
    
    return (

        <Container>

            {/* <Seta source={require('../../assets/Seta.png')} /> */}

            <Logo source={require('../../assets/VitalHub_Logo1.png')} />

            <Title>Recuperar senha</Title>

            <DescriptionPassword description={"Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha"} />

            <Input
                placeholder={"Usuário ou E-mail"}
                placeholderTextColor={'#49B3BA'}
                // Acho que está certo
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />

            <ButtonNormal text={"Continuar"} onPress={() => EnviarEmail()} />


        </Container>

    )

}