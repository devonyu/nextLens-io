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
  const [activeItem, toggleItem] = useState('low');
  const { lenses } = inputProps;
  // console.log('rerender reco');
  return (
    <div>
      <Menu attached="top" tabular>
        <Menu.Item name="low" active={activeItem === 'low'} onClick={() => toggleItem('low')} />
        <Menu.Item name="high" active={activeItem === 'high'} onClick={() => toggleItem('high')} />
      </Menu>
      <Segment attached="bottom">
        {activeItem === 'low' ? (
          <RecommendationContainer>
            {lenses.slice(0, 3).map((lens, idx) => (
              <Recocard lens={lens} key={String(idx)} />
            ))}
          </RecommendationContainer>
        ) : (
          <RecommendationContainer>
            {lenses.slice(3).map((lens, idx) => (
              <Recocard lens={lens} key={String(idx)} />
            ))}
          </RecommendationContainer>
        )}
      </Segment>
    </div>
  );
};

export default Reco;
