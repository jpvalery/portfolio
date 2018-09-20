import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const enter = css`
  opacity: 0;
`

const enterActive = css`
  opacity: 1;
  transition: opacity 500ms ease-in;
`

const exit = css`
  opacity: 1;
`

const exitActive = css`
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 500ms ease-out;
`

class TransitionHandler extends React.Component {
  shouldComponentUpdate() {
    return this.props.location.pathname === window.location.pathname
  }

  render() {
    return this.props.children
  }
}

const Transition = ({ children, location }) => (
  <TransitionGroup>
    <CSSTransition
      classNames={{ enter, enterActive, exit, exitActive }}
      timeout={{ enter: 500, exit: 500 }}
      key={location.pathname}
    >
      <TransitionHandler location={location}>{children}</TransitionHandler>
    </CSSTransition>
  </TransitionGroup>
)

Transition.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
}

export default Transition
