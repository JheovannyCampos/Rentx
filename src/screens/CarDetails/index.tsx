import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
                <About>
                    Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>
        </Container>
    );
}