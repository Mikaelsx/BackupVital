import { View } from "react-native";
import {
  BoxCard,
  BoxCardDoctor,
  BoxDateCancel,
  BoxRateTime,
  BoxTextCard,
  BoxTextClinicCard,
  BoxTextDoctorCard,
} from "../Container/StyleContainer";
import { ConsultDate, ConsultDateGray } from "../DateConsult/StyleDateConsult";
import { CardCancel, SeeRecord } from "../Descriptions/Descriptions";
import {
  AgeTextCard,
  DoctorArea,
  HourText,
  HourTextGray,
  HourTextGrey,
  LocalizationText,
  RateText,
  RoutineTextCard,
  SeeMedicalRecord,
} from "../Descriptions/StyledDescriptions";
import { ImageCard, PointCard } from "../Images/StyleImages";
import { NameCard, NameCardClinic, NameCardSelect } from "../Title/StyleTitle";
import {
  AgeCard,
  BoxRate,
  CardContainer,
  CardContainerClinic,
  CardContentDoctor,
} from "./StyleCards";

import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { endEvent } from "react-native/Libraries/Performance/Systrace";

export const Card = ({
  url,
  name,
  age,
  routine,
  hour,
  status,
  onPressCancel,
  onPressAppointment,
  onPressAppointmentCard,
  navigation,
}) => {
  const Check = () => {
    if (status === "a") {
      return (
        <BoxDateCancel>
          <ConsultDate>
            <FontAwesome6 name="clock" size={15} color="#49B3BA" />

            <HourText>{hour}</HourText>
          </ConsultDate>

          <CardCancel onPressCancel={onPressCancel} text={"Cancelar"} />
        </BoxDateCancel>
      );
    } else if (status === "r") {
      return (
        <BoxDateCancel>
          <ConsultDateGray>
            <FontAwesome6 name="clock" size={15} color="#4E4B59" />

            <HourTextGray>{hour}</HourTextGray>
          </ConsultDateGray>

          <SeeRecord
            onPressAppointment={onPressAppointment}
            text={"Ver Prontuário"}
          />
        </BoxDateCancel>
      );
    } else if (status === "c") {
      return (
        <BoxDateCancel>
          <ConsultDateGray>
            <FontAwesome6 name="clock" size={15} color="#4E4B59" />

            <HourTextGray>{hour}</HourTextGray>
          </ConsultDateGray>
        </BoxDateCancel>
      );
    }
  };

  return (
    <CardContainer onPress={onPressAppointmentCard}>
      <BoxCard>
        <ImageCard source={url} />

        <BoxTextCard>
          <NameCard>{name}</NameCard>

          <AgeCard>
            <AgeTextCard>{age}</AgeTextCard>

            <PointCard source={require("../../assets/PointCard.png")} />

            <RoutineTextCard>{routine}</RoutineTextCard>
          </AgeCard>

          {Check()}
        </BoxTextCard>
      </BoxCard>
    </CardContainer>
  );
};

export const CardSelectDoctor = ({ doctor, selectedCardId, onCardPress }) => {
  return (
    <CardContainerClinic
      isSelected={selectedCardId == doctor.id ? true : false} //se o id do medico bater com o id passado ao clicar no card do medico, retorna true, se n false
      
      onPress={() => {
        onCardPress(doctor.id);
      }}
    >
      <BoxCardDoctor>
        <ImageCard source={require("../../assets/ImageCard.png")} />

        <BoxCard>
          <BoxTextDoctorCard>
            <NameCardSelect>{doctor.idNavigation.nome}</NameCardSelect>

            <DoctorArea>{doctor.especialidade.especialidade1}</DoctorArea>
          </BoxTextDoctorCard>
        </BoxCard>
      </BoxCardDoctor>
    </CardContainerClinic>
  );
};

export const CardSelectClinic = ({ clinic, selectedCardId, onCardPress }) => {
  return (
    <CardContainerClinic
      isSelected={selectedCardId == clinic.id ? true : false}
      onPress={() => {
        onCardPress(clinic.id);
      }}
    >
      <BoxCard>
        <BoxTextClinicCard>
          <NameCardClinic>{clinic.nomeFantasia}</NameCardClinic>

          <LocalizationText>{clinic.endereco.logradouro}</LocalizationText>
        </BoxTextClinicCard>

        <BoxRateTime>

          <ConsultDate>
            <MaterialCommunityIcons
              name="calendar-outline"
              size={15}
              color="#49B3BA"
            />

            <HourText>{"Seg-Sex"}</HourText>
          </ConsultDate>
        </BoxRateTime>
      </BoxCard>
    </CardContainerClinic>
  );
};
