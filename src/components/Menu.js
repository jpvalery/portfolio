import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { slide as SideMenu } from 'react-burger-menu'

const Nav = styled.nav`
  background: ${props => props.theme.colors.base};
  width: 100%;
  height: 3.5rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: 0.5s ease;
`
const Title = styled(Link)`
  text-decoration: none;
  display: inline-block;
  h1 {
    text-transform: uppercase;
    font-size: 1rem;
    padding: 1.25rem 2rem;
    color: ${props => props.theme.colors.secondary};
  }
`
const Header = styled.header`
  background: ${props => props.theme.colors.base};
  width: 3.5rem;
  height: 3.5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  transition: 0.5s ease;
  div {
    .bm-overlay {
      background: rgba(16, 11, 0, 0.9) !important;
      backdrop-filter: blur(5px) !important;
      left: 0;
    }
    .bm-menu {
      padding: 2rem 0;
      font-size: 2rem;
      color: ${props => props.theme.colors.base};
    }
    .bm-cross {
      background: ${props => props.theme.colors.base} !important;
      height: 2rem !important;
      width: 0.35rem !important;
    }
    .bm-cross-button {
      height: 2rem !important;
      width: 2rem !important;
      top: 0.5rem !important;
      right: 2rem !important;
    }
    .bm-burger-bars {
      background: #100b00;
      height: 0.35rem;
    }
    .bm-burger-button {
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
      top: 1rem;
    }
  }
`

const MenuMobile = styled(SideMenu)`
  padding: 4rem 0;
  z-index: 110;
  ul {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 0;
  }
  li {
    display: block;
    margin: 0 2rem;
    padding: 0.8rem 0;
    text-align: right;
  }
  a {
    text-decoration: none;
    padding: 1rem;
    font-weight: 800;
    transition: all 0.5s;
    color: ${props => props.theme.colors.base};
    text-transform: uppercase;
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }
  img {
    display: inline-block;
  }
`

const Menu = () => {
  return (
    <Nav>
      <Title to="/">
        <h1>I Am Matthias</h1>
      </Title>
      <Header>
        <MenuMobile right width={'100%'} isOpen={false}>
          <ul>
            <li>
              <Link to="/">Portfolio</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Info</Link>
            </li>
            <li>
              <a
                href="https://www.contentful.com/"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                <img
                  src="https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
                  style={{ width: '100px' }}
                  alt="Powered by Contentful"
                />
              </a>
            </li>
          </ul>
        </MenuMobile>
      </Header>
    </Nav>
  )
}

export default Menu
