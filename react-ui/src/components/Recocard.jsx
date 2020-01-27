import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FlickrImages from './FlickrImages';
import { categoriesAPI } from '../components/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';

const Recocard = inputProps => {
  const CardContainer = styled.div`
    margin: 10px;
    position: relative;
    padding-bottom: 50px;
    height: 550px;
    box-sizing: content-box;
    @media (max-width: 450px) {
      margin: -120px;
      margin-left: -100px;
      transform: scale(0.6);
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

  const CardContainerBack = styled.span`
    background-color: #2185d0;
    height: 500px;
    width: 200px;
    border-radius: 2em;
    top: -780px;
    left: 290px;
    position: relative;
    display: block;
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
      max-width: 200px;
      height: 200px;
      transform: rotate(100deg);
      object-fit: contain;
      filter: drop-shadow(14px -5px 0.85rem black);
      top: -435px;
      left: 265px;
      background-color: transparent;
      z-index: 5;
      position: relative
    }
  `;
  const ImageNoRotate = styled.img`
    max-width: 200px;
    height: 200px;
    object-fit: contain;
    filter: drop-shadow(14px -5px 0.85rem black);
    top: -435px;
    left: 265px;
    background-color: transparent;
    position: relative
    z-index: 5;
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
    flex-direction: column;
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
  const [values, setValues] = useState({ lowest: 'N/A', highest: 'N/A', avgerage: 'N/A' });
  const { lens } = inputProps;
  const { amazon, category, ebay, ebayLink, flickr, image, name, rotate } = lens;
  const getBrand = () => name.split(' ')[0];
  const getModel = () =>
    name
      .split(' ')
      .slice(1)
      .join(' ');
  const exampleDescrtipion = `The optical construction utilizes eleven lenses, including aspherical and AA elements, an ED (extra-low dispersion) element.`;
  const recommendationReason = (
    <span>
      This lens matches your likes in <b>{categoriesAPI[category]} photography</b>
    </span>
  );
  const EbayLetters = [
    { color: '#e72f30', letter: 'e' },
    { color: '#0060d5', letter: 'b' },
    { color: '#f6b001', letter: 'a' },
    { color: '#85b900', letter: 'y' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(`/ebaydata`, { ebayLink: ebayLink });
      setValues(result.data);
    };
    fetchData();
    // eslint-disable-next-line
  }, [lens]);

  return (
    <CardContainer>
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

        <Description>
          <DescriptionTitle>Reccomendation</DescriptionTitle>
          {recommendationReason}
        </Description>
        <Price>
          <DescriptionTitle>Price Analysis</DescriptionTitle>
          <div style={{ height: '35px' }}>
            <ul style={{ columns: '3', listStyle: 'none', marginLeft: '-35px', marginTop: '0' }}>
              {Object.keys(values).map(key => {
                if (key !== 'item_name' && key !== 'item_count') {
                  return (
                    <li key={key}>
                      {key}
                      <br />${values[key]}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
        </Price>
        <div>
          <a href={amazon} target="_blank" rel="noopener noreferrer">
            <Button style={{ background: '#ff9900' }}>
              <FontAwesomeIcon icon={faAmazon} /> <Amazon>Amazon</Amazon>
            </Button>
          </a>
          <a href={ebay} target="_blank" rel="noopener noreferrer">
            <Button style={{ background: 'rgba(0,0,0,.05' }}>
              {EbayLetters.map(letter => (
                <span style={{ color: letter.color, fontSize: '20px' }} key={letter.letter}>
                  {letter.letter}
                </span>
              ))}
            </Button>
          </a>
        </div>
        <div>
          <FlickrImages flickr={flickr} lensname={name} lensInfo={lens} />
        </div>
      </CardDetails>
      {rotate === 0 ? (
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
      <CardContainerBack />
    </CardContainer>
  );
};

export default Recocard;
