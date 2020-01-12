import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Header, Icon, Label, Message } from 'semantic-ui-react';

const SuggestionContainer = styled.div`
  height: calc(100vh - 75px);
  max-height: 100vh;
  overflow: auto;
  width: 100vw;
  background-color: #c7c9d3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  padding: 1.5em;
  padding-left: 2.5em;
  left: -20px;
`;

export default class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      replyto: '',
      value: '',
      ready: false
    };
  }

  handleChange = (e, { name, value }) => {
    const { replyto, message } = this.state;
    if (name === value) {
      this.setState({ value });
    } else {
      this.setState({ [name]: value });
    }
    if (replyto.length > 6 && name.length > 4 && message.length > 10 && value.length > 1) {
      // Checks email, name, message content, and if topic clicked
      this.setState({ ready: true });
    } else {
      this.setState({ ready: false });
    }
  };

  handleSubmit = event => {
    const { ready } = this.state;
    if (ready) {
      console.log('Submitting Form!');
    } else {
      // Submit will not work until state is ready
      event.preventDefault();
    }
  };

  render() {
    const { value, ready } = this.state;
    return (
      <SuggestionContainer>
        <Header as="h1">
          <Icon name="pencil" />
          <Header.Content>Feedback and Suggestions</Header.Content>
        </Header>
        <Form
          success={ready}
          warning
          action="https://formspree.io/feedback@nextlens.io"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <Form.Group widths="equal">
            <Form.Input
              label="Name"
              name="name"
              placeholder="Erlich Bachman"
              onChange={this.handleChange}
            />
            <Form.Input
              label="Email"
              name="replyto"
              placeholder="ebachman@aviato.com"
              onChange={this.handleChange}
            />
            {/* THIS IS THE REDIRECT AFTER SENDING <input type="hidden" name="_next" value="https://nextlens.io" /> */}
            <input type="hidden" name="_subject" value={`Suggestions on ${value}`} />
          </Form.Group>
          <Form.Group widths="equal">
            <Label as="a" color="red" tag>
              Topic
            </Label>
            <Form.Radio
              label="Lens Recommendations"
              value="Lens Recommendations"
              name="Lens Recommendations"
              checked={value === 'Lens Recommendations'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="UX-User Experience"
              value="User Experience"
              name="User Experience"
              checked={value === 'User Experience'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="UI-User Interface"
              value="User Interface"
              name="User Interface"
              checked={value === 'User Interface'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Features"
              value="Features"
              name="Features"
              checked={value === 'Features'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="General"
              value="General"
              name="General"
              checked={value === 'General'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Bugs"
              value="Bugs"
              name="Bugs"
              checked={value === 'Bugs'}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.TextArea
            label="Detailed Feedback || Suggestions"
            name="message"
            placeholder="Tell us more on what we can improve on and any suggestions you'd like to add!"
            onChange={this.handleChange}
          />
          <Message
            warning
            content="You will be redirected to another page to confirm that you are not robot"
          />
          <Message success header="Form Completed" content="Ready to Submit! Click below!" />
          <Form.Button>Submit</Form.Button>
        </Form>
      </SuggestionContainer>
    );
  }
}
