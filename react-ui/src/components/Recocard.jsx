import React from 'react';
import styled from 'styled-components';
import FlickrImages from './FlickrImages';

const Recocard = inputProps => {
  const CardContainer = styled.div`
    width: 300px;
    height: 500px;
    padding: 30px;
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
  `;
  const CardContainerBack = styled.div`
    background-color: #2185d0;
    height: 400px;
    width: 300px;
    border-radius: 2em;
    margin-left: 150px;
    margin-bottom: -500px;
    position: absolute;
    z-index: -1;
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
  `;

  const DescriptionTitle = styled.div`
    color: grey;
    font-size: 16px;
    padding-bottom: 0.2em;
  `;
  const Image = styled.img`
  transform: scale(1.5) rotate(100deg);
  object-fit: contain;
  filter: drop-shadow(14px -5px 0.85rem black);
  margin-left: 215px;
  margin-top: -150px;
}
`;

  const Brand = styled.div`
    font-size: 2em;
    text-align: left;
  `;
  const Model = styled.div`
    font-size: 1.2em;
    text-align: left;
    margin-bottom: 10px;
  `;

  const Description = styled.div`
    font-size: 14px;
    width: 200px;
    text-align: left;
    margin-bottom: 10px;
  `;

  const Price = styled.div`
    color: green;
  `;

  // const FlickR = styled.button`
  //   color: white;
  //   background-color: #2185d0;
  //   border-radius: 0.3em;
  //   height: 35px;
  //   font-size: 1em;
  //   min-width: 150px;
  //   cursor: pointer;
  // `;

  const Button = styled.button`
    color: black;
    border-radius: 0.2em;
    height: 30px;
    margin: 5px;
    min-width: 100px;
    cursor: pointer;
  `;

  // const { lens, brand, model, description, recc, price, imageurl } = inputProps;
  const { lens } = inputProps;
  const { amazon, ebay, flickr, image, name } = lens;
  const getBrand = () => name.split(' ')[0];
  const getModel = () =>
    name
      .split(' ')
      .slice(1)
      .join(' ');
  const exampleDescrtipion = `The optical construction utilizes eleven lenses, including aspherical and AA elements, an ED (extra-low dispersion) element, as well as Carl Zeiss T* anti-reflective lens coatings.`;
  const exampleReccomendation = `This lens matches your likes in Street photography likes`;
  const calulateExamplePrice = () =>
    `~$${Math.floor(Math.random() * 500)} - $${Math.floor(Math.random() * 900)}`;
  const examplePrice = calulateExamplePrice();
  console.log(inputProps.lens);
  console.log(getModel());
  return (
    <div className="container">
      <CardContainer>
        <CardContainerBack />
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
        <Image
          width="200px"
          src={
            image || 'https://res.cloudinary.com/nextlens/image/upload/v1544524799/misc/lens1.jpg'
          }
          alt="Camera Lens"
        />
        <Description>
          <DescriptionTitle>Reccomendation</DescriptionTitle>
          {exampleReccomendation}
        </Description>
        <Price>
          <DescriptionTitle>Price</DescriptionTitle>
          {examplePrice}
        </Price>
        <div>
          <Button>
            <a href={amazon}>Amazon</a>
          </Button>
          <Button>
            <a href={ebay}>Ebay</a>
          </Button>
          <Button>Borrowlenses</Button>
        </div>
        <div>
          <FlickrImages flickr={flickr} lensname={name} lensInfo={lens} />
        </div>
      </CardContainer>
    </div>
  );
};

export default Recocard;
