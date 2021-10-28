import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import Animated, {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
} from 'react-native-reanimated';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Button } from '../../components/Button';

import {
	Container,
	Header,
	Details,
	CarImages,
	Description,
	Brand,
	Name,
	Rent,
	Period,
	Price,
	About,
	Accessories,
	Footer,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface Params {
	car: CarDTO;
}

export function CarDetails() {
	const navigation:any = useNavigation();
	const route = useRoute();
    const theme = useTheme();
	const scrollY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler(event => {
		scrollY.value = event.contentOffset.y
	});

	const headerStyleAnimation = useAnimatedStyle(() => {
		return {
			height: interpolate(
				scrollY.value,
				[0, 200],
				[200, 70],
				Extrapolate.CLAMP
			)
		}
	})

	const sliderCarsStyleAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[0, 150],
				[1, 0],
				Extrapolate.CLAMP
			)
		}
	})

	const { car } = route.params as Params;

	function handleConfirmRental() {
		navigation.navigate("Scheduling", { car });
	}

	function handleBack(){
		navigation.goBack();
	}


	return (
		<Container>
			<StatusBar 
				barStyle="dark-content"
				translucent
				backgroundColor="transparent"
			/>
			
			<Animated.View style={[
					sliderCarsStyleAnimation, 
					styles.header,
					{ backgroundColor: theme.colors.background_secondary}
				]}>
				<Header>
					<BackButton onPress={handleBack} style={styles.back}/>
				</Header>

				<Animated.View style={sliderCarsStyleAnimation}>
					<CarImages>
						<ImageSlider 
							imagesUrl={car.photos}
						/>
					</CarImages>
				</Animated.View>
			</Animated.View>

			<Animated.ScrollView	
			contentContainerStyle={{
				paddingHorizontal: 24,
				paddingTop: getStatusBarHeight() + 160,
					}}
					showsVerticalScrollIndicator={false}
					onScroll={scrollHandler}
					scrollEventThrottle={16}
			>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>

					<Rent>
						<Period>{car.rent.period}</Period>
						<Price>R$ {car.rent.price}</Price>
					</Rent>
				</Details>

				<Accessories>
					{
						car.accessories.map(accessory => (
						<Accessory 
							key={accessory.type}
							name={accessory.name}
							icon={getAccessoryIcon(accessory.type)}/>
						))
						
					}
				</Accessories>

				<About>{car.about}{car.about}{car.about}{car.about}{car.about}{car.about}</About>
				
			</Animated.ScrollView>

			<Footer>
				<Button title="Escolher período de aluguel" onPress={handleConfirmRental}/>
			</Footer>

		</Container>
	);
}

const styles = StyleSheet.create({
	header: {
		position: 'absolute',
		overflow: 'hidden',
		zIndex: 1,
	},
	back: {
		overflow: 'hidden',
	}
})