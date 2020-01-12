import React from 'react';
import styled from 'styled-components';
import { Image, Header, Table, Rating } from 'semantic-ui-react';
import exampleReviews from '../example_data_react/exampleReviews';

const FlexContainer = styled.div`
  height: calc(100vh - 75px);
  width: 100vw;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
`;

const condense = json => {
  const result = [];
  Object.keys(json).forEach(key => {
    json[key].forEach(lens => {
      result.push(lens);
    });
  });
  return result;
};

const Reviews = () => (
  <FlexContainer>
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Lens Image</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Mount</Table.HeaderCell>
          <Table.HeaderCell>Rating</Table.HeaderCell>
          <Table.HeaderCell>Comments</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {condense(exampleReviews).map((lens, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              <Header as="h2" textAlign="center">
                <Image src={lens.lensImage} />
              </Header>
            </Table.Cell>
            <Table.Cell singleLine>{lens.name}</Table.Cell>
            <Table.Cell>{lens.mount}</Table.Cell>
            <Table.Cell textAlign="right">
              <Rating icon="star" defaultRating={lens.rating} maxRating={5} />
              <a href="https://www.dxomark.com/">DXO Mark Score X</a>
            </Table.Cell>
            <Table.Cell>{lens.comments}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </FlexContainer>
);

export default Reviews;
