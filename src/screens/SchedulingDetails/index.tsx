import React, { useEffect, useState } from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { useTheme } from 'styled-components';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { Button } from '../../components/Button';

import {
	Container,
	Header,
	CarImages,
	Content,
	Details,
	Description,
	Brand,
	Name,
	Rent,
	Period,
	Price,
	Accessories,
	Footer,
	RentalPeriod,
	CalendarIcon,
	DateInfo,
	DateTitle,
	DateValue,
	RentalPrice,
	RentalPriceLabel,
	RentalPriceDetails,
	RentalPriceQuota,
	RentalPriceTotal,
} from './styles';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { format } from 'date-fns';

interface Params {
	car: CarDTO;
	dates: string[];
}

interface RentalPeriod{
	start: string;
	end: string;
}

export function SchedulingDetails() {
	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

	const navigation:any = useNavigation();
	const route = useRoute();

	const { car, dates } = route.params as Params;

	const rentalTotal = Number(dates.length * car.rent.price)

    function handleConfirmRental(){
		navigation.navigate("SchedulingComplete");
	}
	const theme = useTheme();

	function handleBack(){
		navigation.goBack();
	}

	useEffect(() => {
		setRentalPeriod({
		  start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
		  end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
		});
	  }, []);

	return (
		<Container>
			<Header>
				<BackButton onPress={handleBack}/>
			</Header>

			<CarImages>
				<ImageSlider 
					imagesUrl={car.photos}
				/>
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>

					<Rent>
						<Period>{car.rent.period}</Period>
						<Price>{car.rent.price}</Price>
					</Rent>
				</Details>

				<Accessories>
					{
					car.accessories.map(accessory => (
						<Accessory 
							key={accessory.type}
							name={accessory.name} 
							icon={getAccessoryIcon(accessory.type)}
						/>
					))
					}
				</Accessories>
				
				<RentalPeriod>
					<CalendarIcon>
						<Feather 
							name="calendar"
							size={RFValue(24)}
							color={theme.colors.shape}
						/>
					</CalendarIcon>
					
					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue>{rentalPeriod.start}</DateValue>
					</DateInfo>

					<Feather 
						name="chevron-right"
						size={RFValue(10)}
						color={theme.colors.shape}
					/>
					
					<DateInfo>
						<DateTitle>ATÉ</DateTitle>
						<DateValue>{rentalPeriod.end}</DateValue>
					</DateInfo>
				</RentalPeriod>

				<RentalPrice>
					<RentalPriceLabel>TOTAL</RentalPriceLabel>
					<RentalPriceDetails>
						<RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
						<RentalPriceTotal>{rentalTotal}</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>
			</Content>

			<Footer>
				<Button 
					title="Alugar agora" 
					color={theme.colors.success}
					onPress={handleConfirmRental} 
				/>
			</Footer>

		</Container>
	);
}