import React from 'react';
import styled from 'styled-components';
import { Icon, Header, Image, Modal } from 'semantic-ui-react';

const FooterContainer = styled.div`
  background-color: black;
  border: none !important;
  display: flex;
  justify-content: space-between;
  height: 30px;
  position: fixed;
  width: 100vw;
  bottom: 0;
  z-index: 9999;
`;

const FooterSide = styled.div`
  width: 100%;
  background-color: black;
  border: none !important;
  color: white;
  display: flex;
  justify-content: center;
`;

const SocialIcons = styled.a`
  padding-right: 2em;
  color: white;
  cursor: pointer;
  :hover {
    color: red;
  }
`;

const NextLens = styled.span`
  font-size: 0.8em;
  @media (max-width: 320px) {
    font-size: 0.6em;
  }
`;

const Status = styled.span`
  font-size: 1.5em;
  text-transform: uppercase;
`;

const Footer = () => (
  <FooterContainer>
    <FooterSide>
      <SocialIcons href="https://nextlens.io">
        <Icon name="camera retro" />
        <NextLens>2020 Nextlens.io</NextLens>
      </SocialIcons>
    </FooterSide>
    <FooterSide>
      <SocialIcons href="https://github.com/devonyu/nextLens-io">
        <Icon name="github" />
      </SocialIcons>
      <SocialIcons href="https://www.facebook.com/nextlens.io/">
        <Icon name="facebook" />
      </SocialIcons>
      <SocialIcons href="https://www.instagram.com/nextlens.io/">
        <Icon name="instagram" />
      </SocialIcons>
      <Modal
        dimmer="blurring"
        trigger={
          <SocialIcons>
            <Icon name="code" />
          </SocialIcons>
        }
        closeIcon
      >
        <Modal.Header>Developed by Devon Yu</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Image
              id="About"
              wrapped
              size="small"
              src="https://devonyu.com/pf2.png"
              circular
              centered
            />
            <Header>
              I wanted to create an application to help new photographers find their next lens
            </Header>
            <p>Built using React, Node+Express, PostgreSQL, Deployed with Heroku</p>
            <p>
              Are you Hiring? Checkout my{' '}
              <a href="https://devonyu.com" target="_blank" rel="noopener noreferrer">
                portfolio
              </a>
              , Download my{' '}
              <a
                href="https://devonyu.com/devonyuresume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="true"
              >
                Resume!
              </a>
            </p>
            <Status>
              <strong>Coveralls:{'  '}</strong>
              <a href="https://coveralls.io/github/devonyu/nextLens-io?branch=master">
                <img
                  src="https://coveralls.io/repos/github/devonyu/nextLens-io/badge.svg?branch=master"
                  alt="Coveralls Coverage Status"
                />
              </a>
              <strong>
                {'  '} Travis CI: {'  '}
              </strong>
              <a href="https://travis-ci.org/devonyu/nextLens-io">
                <img
                  src="https://travis-ci.org/devonyu/nextLens-io.svg?branch=master"
                  alt="Travis Build Status"
                />
              </a>
            </Status>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </FooterSide>
  </FooterContainer>
);

export default Footer;
