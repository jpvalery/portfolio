import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'whatwg-fetch' // Fetch Polyfill
import Recaptcha from 'react-google-recaptcha'
import NetlifyForm from 'react-netlify-form'

const Form = styled.div`
  margin: 0 2rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
    border: 2px solid ${props => props.theme.colors.tertiary};
    outline: none;
    background: ${props => props.theme.colors.base};
    color: ${props => props.theme.colors.secondary};
    border-radius: 2px;
    padding: 1rem;
    &::-webkit-input-placeholder {
      color: gray;
    }
    &::-moz-placeholder {
      color: gray;
    }
    &:-ms-input-placeholder {
      color: gray;
    }
    &:-moz-placeholder {
      color: gray;
    }
    &:required {
      box-shadow: none;
    }
    &:focus {
      outline: none;
    }
    &:-webkit-autofill {
      box-shadow: inset 0 0 0 9999px ${props => props.theme.colors.base};
    }
  }
  &::before {
    content: '';
    background: black;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    transition: 0.2s all;
    opacity: ${props => (props.overlay ? '.8' : '0')};
    visibility: ${props => (props.overlay ? 'visible' : 'hidden')};
  }
`

const Name = styled.input`
  margin: 0 0 2rem 0;
  width: 100%;
  @media (min-width: ${props => props.theme.responsive.small}) {
    width: 48%;
  }
`

const Email = styled.input`
  margin: 0 0 2rem 0;
  width: 100%;
  @media (min-width: ${props => props.theme.responsive.small}) {
    width: 48%;
  }
`

const Message = styled.textarea`
  width: 100%;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  min-height: 250px;
  resize: vertical;
`

const Submit = styled.input`
  background: ${props => props.theme.colors.tertiary} !important;
  color: ${props => props.theme.colors.base} !important;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;
  &:hover {
    border: 2px solid ${props => props.theme.colors.highlight} !important;
    background: ${props => props.theme.colors.highlight} !important;
  }
  @media (min-width: ${props => props.theme.responsive.medium}) {
    width: 48%;
  }
`

const Modal = styled.div`
  background: white;
  padding: 2em;
  border-radius: 2px;
  position: fixed;
  min-width: 75%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 99;
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  transition: 0.2s all;
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    min-width: inherit;
    max-width: 400px;
  }
  p {
    line-height: 1.6;
    margin: 0 0 2em 0;
  }
`

const Button = styled.div`
  background: ${props => props.theme.colors.tertiary} !important;
  font-size: 1em;
  display: inline-block;
  margin: 0 auto;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  padding: 1em;
  border: 2px;
  text-decoration: none;
  transition: 0.2s;
  z-index: 99;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${props => props.theme.colors.highlight} !important;
  }
`

    return (
      <NetlifyForm name="Contact Form">
        {({ loading, error, success }) => (
          <Form>
            {loading && <div>Loading...</div>}
            {error && (
              <div>Your information was not sent. Please try again later.</div>
            )}
            {success && <div>Thank you for contacting us!</div>}
            {!loading &&
              !success && (
                <>
                  <Name
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required
                  />
                  <Email
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                  <Message
                    name="message"
                    type="text"
                    placeholder="Message"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    required
                  />
                  <Submit name="submit" type="submit" value="Send" />
                </>
              )}
          </Form>
        )}
      </NetlifyForm>
    )
  }
}

ContactForm.propTypes = {
  data: PropTypes.object,
}

export default ContactForm
