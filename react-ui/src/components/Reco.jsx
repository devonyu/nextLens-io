import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Segment } from 'semantic-ui-react';
import Recocard from './Recocard';

const RecommendationContainer = styled.div`
  display: flex;
  width: 100%;
  transform: scale(0.85);
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Reco = inputProps => {
  // const state = { activeItem: inputProps.price };
  const [activeItem, toggleItem] = useState('low');
  // const { lenses } = inputProps;
  // const { activeItem } = state;
  // const handleItemClick = name => (state.activeItem = name);
  return (
    <div>
      <Menu attached="top" tabular>
        <Menu.Item
          name="low"
          active={activeItem === 'low'}
          // onClick={() => handleItemClick('low')}
        />
        <Menu.Item
          name="high"
          active={activeItem === 'high'}
          // onClick={() => handleItemClick('high')}
        />
      </Menu>
      <Segment attached="bottom">
        {activeItem === 'low' ? (
          <RecommendationContainer>
            {/* {lenses.slice(0, 3).map(lens => (
              <Recocard lens={lens} />
            ))} */}
          </RecommendationContainer>
        ) : (
          <RecommendationContainer>
            {/* {lenses.slice(3).map(lens => (
              <Recocard lens={lens} />
            ))} */}
          </RecommendationContainer>
        )}
      </Segment>
    </div>
  );
};

export default Reco;
