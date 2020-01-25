import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Segment } from 'semantic-ui-react';
import Recocard from './Recocard';

const RecommendationContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Reco = inputProps => {
  const [activeItem, toggleItem] = useState('low');
  const { lenses } = inputProps;
  return (
    <div style={{ marginTop: '35px', width: '100%' }}>
      <Menu attached="top" tabular>
        <Menu.Item active name="price" style={{ color: 'black', fontSize: '20px' }} />
        <Menu.Item
          name="low"
          active={activeItem === 'low'}
          onClick={() => toggleItem('low')}
          style={{ color: '#2185d0', fontSize: '18px' }}
        />
        <Menu.Item
          name="high"
          active={activeItem === 'high'}
          onClick={() => toggleItem('high')}
          style={{ color: '#2185d0', fontSize: '18px' }}
        />
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
