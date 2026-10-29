import styled, { css } from 'styled-components'
import { Link, NavLink } from 'react-router'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: ${Tokens.zIndex.header};
  width: 100%;
  background-color: rgba(247, 245, 241, 0.86);
  backdrop-filter: saturate(1.2) blur(12px);
  border-bottom: 1px solid ${Colors.border};
`

export const SkipLink = styled.a`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: ${Tokens.zIndex.skipLink};
  padding: 10px 16px;
  border-radius: ${Tokens.radius.sm};
  background-color: ${Colors.background.dark};
  color: ${Colors.text.white};
  font-weight: 500;
  text-decoration: none;
  transform: translateY(-160%);
  transition: transform 200ms ${Tokens.easing.out};

  &:focus-visible {
    transform: translateY(0);
  }
`

export const HeaderContent = styled.div`
  max-width: ${Tokens.container};
  min-height: 72px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: ${Tokens.breakpoints.sm}) {
    flex-wrap: wrap;
    gap: 4px;
    padding-top: 12px;
    padding-bottom: 8px;
  }
`

export const HeaderTitle = styled(Link)`
  font-family: ${Tokens.fonts.display};
  font-size: 1.875rem;
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${Colors.text.dark};
  text-decoration: none;
  white-space: nowrap;
`

export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: ${Tokens.breakpoints.sm}) {
    width: 100%;
    justify-content: space-between;
  }
`

export const HeaderItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;

  @media (max-width: ${Tokens.breakpoints.sm}) {
    gap: 20px;
  }
`

const navItemStyles = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${Colors.text.muted};
  text-decoration: none;
  transition: color 200ms ${Tokens.easing.out};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 8px;
    height: 1px;
    background-color: ${Colors.accent};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 250ms ${Tokens.easing.out};
  }

  &:hover {
    color: ${Colors.text.dark};
  }
`

export const HeaderItem = styled(NavLink)`
  ${navItemStyles}

  &.active {
    color: ${Colors.text.dark};
  }

  &.active::after,
  &:hover::after {
    transform: scaleX(1);
  }
`

export const SignOutButton = styled.button`
  ${navItemStyles}
  background: none;
  border: none;
  cursor: pointer;

  &:hover::after {
    transform: scaleX(1);
  }
`

export const CartButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-right: -10px;
  border: none;
  border-radius: ${Tokens.radius.sm};
  background: none;
  color: ${Colors.text.dark};
  cursor: pointer;
  transition:
    background-color 200ms ${Tokens.easing.out},
    transform 120ms ${Tokens.easing.out};

  &:hover {
    background-color: ${Colors.background.surface};
  }

  &:active {
    transform: scale(0.94);
  }
`

export const CartCount = styled.span`
  position: absolute;
  top: 5px;
  right: 3px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 4px;
  background-color: ${Colors.accent};
  color: ${Colors.text.white};
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  font-variant-numeric: tabular-nums;
`
