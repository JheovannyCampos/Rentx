import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { CarDTO } from '../../dtos/CarDTO';
import { AntDesign } from '@expo/vector-icons'
import api from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointment,
  AppointmentTitle,
  AppointmentQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';

interface CarProps{
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

interface Params {
	car: CarDTO;
	dates: string[];
}

export function MyCars(){
    const [cars, setCars] = useState<CarProps[]>([])
    const [loading, setLoading] = useState(true)

    const theme = useTheme();

    // const route = useRoute();
    //const { car } = route.params as Params;

    const navigation:any = useNavigation();
    function handleBack(){
		navigation.goBack();
	}

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                setCars(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCars();
    },[])


  return (
    <Container>
        <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
				<BackButton 
                    onPress={handleBack}
                    color={theme.colors.shape}
                />

                <Title>
                    Suas reservas{'\n'}
                    estão aqui...{'\n'}
                </Title>
                <SubTitle> Conforto, segurança e praticidade. </SubTitle>
			</Header>
            { loading ? <LoadAnimation /> :
            <Content>
                <Appointment>
                    <AppointmentTitle>Reservas realizadas</AppointmentTitle>
                    <AppointmentQuantity>{cars.length}</AppointmentQuantity>
                </Appointment>

                <FlatList 
                    data={cars}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CarWrapper>
                            <Car 
                                data={item.car}
                            />
                            <CarFooter>
                                <CarFooterTitle>Período</CarFooterTitle>
                                <CarFooterPeriod>
                                    <CarFooterDate>{item.startDate}</CarFooterDate>
                                    <AntDesign 
                                        name="arrowright"
                                        size={20}
                                        color={theme.colors.title}
                                        style={{ marginHorizontal: 10}}
                                    />
                                    <CarFooterDate>{item.endDate}</CarFooterDate>
                                </CarFooterPeriod>
                            </CarFooter>
                        </CarWrapper>
                    )}
                />
            </Content>
            }

    </Container>
  );
}