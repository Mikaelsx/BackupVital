import { StatusBar } from "react-native";
import {
  BoxDataHome,
  BoxHome,
  ButtonHomeContainer,
  Container,
  FlatContainer,
  MoveIconBell,
} from "../../components/Container/StyleContainer";
import { Header } from "../../components/Header/StyledHeader";
import { ImagemHome } from "../../components/Images/StyleImages";
import { NameTitle, WelcomeTitle } from "../../components/Title/Title";
import { Ionicons } from "@expo/vector-icons";
import Calendar from "../../components/Calendar/Calendar";

import { FilterButton } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { Card } from "../../components/Cards/Cards";
import { CancellationModal } from "../../components/CancellationModal/CancellationModal";

import { FontAwesome6 } from "@expo/vector-icons";
import { Stethoscope } from "../../components/Stethoscope/StyleSthetoscope";
import { ModalStethoscope } from "../../components/Stethoscope/ModalStethoscope";
import { PatientAppointmentModal } from "../../components/PatientAppointmentModal/PatientAppointmentModal";
import { userDecodeToken } from "../../utils/Auth";

export const PatientConsultation = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '',
  });

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      console.log("funcinou!");
      setUser(token);
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);

  //STATE PARA O ESTADO DOS CARDS FLATLIST, BOTOES FILTRO
  const [selected, setSelected] = useState({
    agendadas: true,
    realizadas: false,
    canceladas: false,
  });

  const image = require("../../assets/CardDoctorImage.png");

  

  const dataItens = [
    {
      id: 1,
      hour: "14:00",
      image: image,
      name: "Dr Claudio",
      age: "22 anos",
      routine: "Urgência",
      status: "a",
    },
    {
      id: 1,
      hour: "14:00",
      image: image,
      name: "Dr josé",
      age: "23 anos",
      routine: "Urgência",
      status: "r",
    },
  ];

  //FILTRO PARA CARD

  const Check = (data) => {
    if (data.status === "a" && selected.agendadas) {
      return true;
    }
    if (data.status === "r" && selected.realizadas) {
      return true;
    }
    if (data.status === "c" && selected.canceladas) {
      return true;
    }
    return false;
  };

  const data = dataItens.filter(Check);

  // STATES PARA OS MODAIS

  const [showModalCancel, setShowModalCancel] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);
  const [showModalStethoscope, setShowModalStethoscope] = useState(false);

  const [showModal, setShowModal] = useState(false);

  // RETURN

  return (
    <Container>
      <Header>
        <StatusBar translucent backgroundColor="transparent" />

        <BoxHome>
          <ImagemHome source={require("../../assets/PatientHomeImage.png")} />

          <BoxDataHome>
            <WelcomeTitle textTitle={"Bem vindo"} />

            <NameTitle textTitle={user.name} />
          </BoxDataHome>
        </BoxHome>

        <MoveIconBell>
          <Ionicons name="notifications" size={25} color="white" />
        </MoveIconBell>
      </Header>

      <Calendar />

      <ButtonHomeContainer>
        <FilterButton
          onPress={() => {
            setSelected({ agendadas: true });
          }}
          selected={selected.agendadas}
          text={"Agendadas"}
        />

        <FilterButton
          onPress={() => {
            setSelected({ realizadas: true });
          }}
          selected={selected.realizadas}
          text={"Realizadas"}
        />

        <FilterButton
          onPress={() => {
            setSelected({ canceladas: true });
          }}
          selected={selected.canceladas}
          text={"Canceladas"}
        />
      </ButtonHomeContainer>

      <FlatContainer
        data={data}
        renderItem={({ item }) => (
          <Card
            navigation={navigation}
            hour={item.hour}
            name={item.id}
            age={item.age}
            routine={item.routine}
            url={image}
            status={item.status}
            onPressCancel={() => setShowModalCancel(true)}
            onPressAppointment={() => {
              navigation.navigate("ViewPrescription", {prescriptionId : item.id});
            }}
            onPressAppointmentCard={() =>
              setShowModal(item.status === "a" ? true : false)
            }
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <Stethoscope onPress={() => setShowModalStethoscope(true)}>
        <FontAwesome6 name="stethoscope" size={32} color={"white"} />
      </Stethoscope>

      <CancellationModal
        visible={showModalCancel}
        setShowModalCancel={setShowModalCancel}
      />

      <ModalStethoscope
        navigation={navigation}
        visible={showModalStethoscope}
        setShowModalStethoscope={setShowModalStethoscope}
      />

      <PatientAppointmentModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
      />

      {/* <Main />  */}
    </Container>
  );
};
