import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const enter = css`
  opacity: 0;
`

const enterActive = css`
  opacity: 1;
  transition: opacity 5000ms ease-in;
`

const exit = css`
  position: absolute;
  left: 50%;

  top: 278px;
  transform: translateX(-50%);
  opacity: 1;
`

const exitActive = css`
  position: absolute;
  left: 50%;
  top: 278px;
  transform: translateX(-50%);
  opacity: 0.01;
  transition: opacity 250ms ease-out;
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
      timeout={{ enter: 2000, exit: 2000 }}
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
