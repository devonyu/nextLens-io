import React from 'react';
import styled from 'styled-components';
import FlickrImages from './FlickrImages';
import { categoriesAPI } from '../components/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';

const Recocard = inputProps => {
  const CardContainer = styled.div`
    margin: 10px;
    @media (max-width: 450px) {
      margin-left: -90px;
      transform: scale(0.7);
    }
  `;

  const CardDetails = styled.div`
    width: 300px;
    height: 550px;
    padding: 20px;
    margin: 30px;
    margin-right: 90px;
    background-color: white;
    border-radius: 2em;
    border: 1px solid #eee;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
  `;

  const CardContainerBack = styled.div`
    background-color: #2185d0;
    height: 400px;
    width: 200px;
    border-radius: 2em;
    margin-left: 250px;
    margin-top: 100px;
    position: absolute;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
  `;

  const DescriptionTitle = styled.div`
    color: black;
    font-size: 16px;
    font-weight: bolder;
    padding-bottom: 5px;
  `;

  const Image = styled.img`
      width: 160px;
      transform: rotate(100deg);
      object-fit: contain;
      filter: drop-shadow(14px -5px 0.85rem black);
      margin-left: 195px;
      margin-top: -150px;
      background-color: transparent;
      z-index: 5;
    }
  `;
  const ImageNoRotate = styled.img`
    // transform: scale(1.2);
    width: 160px;
    object-fit: contain;
    filter: drop-shadow(14px -5px 0.85rem black);
    margin-left: 195px;
    margin-top: -150px;
    background-color: transparent;
    }
  `;

  const Brand = styled.div`
    font-size: 2em;
    text-align: left;
    margin-bottom: 10px;
  `;
  const Model = styled.div`
    font-size: 1.2em;
    text-align: left;
    margin-bottom: 10px;
  `;

  const Description = styled.div`
    font-size: 14px;
    width: 175px;
    text-align: left;
    margin-bottom: 10px;
  `;

  const Price = styled.div`
    color: green;
    display: flex;
  `;

  const Button = styled.button`
    margin: 5px;
    min-width: 100px;
    cursor: pointer;
    color: black;
    border-radius: 5px;
    border: none;
    height: 45px;
    &:hover {
      transform: translate(0, -5px);
      transition: all 0.2s ease-in-out;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    }
  `;
  const Amazon = styled.span`
    color: black;
    background: #ff9900;
    font-size: 18px;
  `;

  const { lens } = inputProps;
  console.log(lens);
  const { amazon, category, ebay, flickr, image, name, rotate } = lens;
  const getBrand = () => name.split(' ')[0];
  const getModel = () =>
    name
      .split(' ')
      .slice(1)
      .join(' ');
  const exampleDescrtipion = `The optical construction utilizes eleven lenses, including aspherical and AA elements, an ED (extra-low dispersion) element, as well as Carl Zeiss T* anti-reflective lens coatings.`;
  const recommendationReason = (
    <span>
      This lens matches your likes in <b>{categoriesAPI[category]} photography</b>
    </span>
  );
  const exampleStartingPrice = Math.floor(Math.random() * 500) + 500;
  const calulateExamplePrice = () =>
    `$${exampleStartingPrice} - $${exampleStartingPrice + Math.floor(Math.random() * 100) + 20}`;
  const examplePrice = calulateExamplePrice();
  const Ebay = [
    { color: '#e72f30', letter: 'e' },
    { color: '#0060d5', letter: 'b' },
    { color: '#f6b001', letter: 'a' },
    { color: '#85b900', letter: 'y' }
  ];
  return (
    <CardContainer>
      <CardContainerBack />
      <CardDetails>
        <Brand>
          <DescriptionTitle>Brand</DescriptionTitle>
          {getBrand()}
        </Brand>
        <Model>
          <DescriptionTitle>Model</DescriptionTitle>
          {getModel()}
        </Model>

        <Description>
          <DescriptionTitle>Description</DescriptionTitle>
          {exampleDescrtipion}
        </Description>
        {getBrand() === 'DJI' || rotate === 0 ? (
          <ImageNoRotate
            src={
              image || 'https://res.cloudinary.com/nextlens/image/upload/v1544524799/misc/lens1.jpg'
            }
            alt="Camera Lens"
          />
        ) : (
          <Image
            src={
              image || 'https://res.cloudinary.com/nextlens/image/upload/v1544524799/misc/lens1.jpg'
            }
            alt="Camera Lens"
          />
        )}

        <Description>
          <DescriptionTitle>Reccomendation</DescriptionTitle>
          {recommendationReason}
        </Description>
        <Price>
          <DescriptionTitle>Price</DescriptionTitle>
          <span style={{ marginLeft: '10px' }}>{examplePrice}</span>
        </Price>
        <div>
          <a href={amazon}>
            <Button style={{ background: '#ff9900' }}>
              <FontAwesomeIcon icon={faAmazon} /> <Amazon>Amazon</Amazon>
            </Button>
          </a>
          <a href={ebay}>
            <Button style={{ background: 'rgba(0,0,0,.05' }}>
              {Ebay.map(letter => (
                <span style={{ color: letter.color, fontSize: '20px' }}>{letter.letter}</span>
              ))}
            </Button>
          </a>
        </div>
        <div>
          <FlickrImages flickr={flickr} lensname={name} lensInfo={lens} />
        </div>
      </CardDetails>
    </CardContainer>
  );
};

export default Recocard;
