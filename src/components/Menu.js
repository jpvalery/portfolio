import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { slide as SideMenu } from 'react-burger-menu'

const Nav = styled.nav`
  background: #fff;
  width: 100%;
  height: 3.5rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  transition: 0.5s ease;
`
const Title = styled(Link)`
  width: 100%;
  text-align: left;
  h1 {
    text-transform: capitalize;
    font-size: 1rem;
    color: black;
    padding: 1.25rem 2rem;
  }
`
const Header = styled.header`
  background: #fff;
  width: 3.5rem;
  height: 3.5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  transition: 0.5s ease;
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
    margin-left: 1em;
    padding: 0.8rem 0;
  }
  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    transition: all 0.5s;
  }
`

var styles = {
  bmBurgerButton: {
    position: 'relative',
    width: '1.5rem',
    height: '1.5rem',
    left: '20px',
    top: '20px',
  },
  bmBurgerBars: {
    background: '#223843',
    height: '5px',
  },
  bmCrossButton: {
    height: '35px',
    width: '35px',
    top: '25px',
    right: '25px',
  },
  bmCross: {
    background: '#D77A61',
  },
  bmMenu: {
    padding: '1em 0',
    fontSize: '2em',
  },
  bmMorphShape: {
    fill: '#223843',
  },
  bmOverlay: {
    background: 'rgba(34, 56, 67,.95)',
    left: '0px',
  },
}

const Menu = () => {
  return (
    <Nav>
      <Title to="/">
        <h1>I Am Matthias</h1>
      </Title>
      <Header>
        <MenuMobile right styles={styles} width={'100%'} isOpen={false}>
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
