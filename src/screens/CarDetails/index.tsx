import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';


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
	About,
	Accessories,
} from './styles';

export function CarDetails() {
	return (
		<Container>
			<Header>
				<BackButton onPress={() =>{}}/>
			</Header>

			<CarImages>
				<ImageSlider 
					imagesUrl={['https://production.autoforce.com/uploads/version/profile_image/3188/model_main_comprar-tiptronic_87272c1ff1.png']}
				/>
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>Lamborghini</Brand>
						<Name>Huracan</Name>
					</Description>

					<Rent>
						<Period>Ao Dia</Period>
						<Price>R$ 580</Price>
					</Rent>
				</Details>

				<Accessories>
					<Accessory name="380Km/h" icon={speedSvg}/>
					<Accessory name="3.2s" icon={accelerationSvg}/>
					<Accessory name="800 HP" icon={forceSvg}/>
					<Accessory name="Gasoline" icon={gasolineSvg}/>
					<Accessory name="Auto" icon={exchangeSvg}/>
					<Accessory name="2 pessoas" icon={peopleSvg}/>
				</Accessories>

				<About>
					Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
				</About>
			</Content>
		</Container>
	);
}