import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, typography, spacing } from '../shared/styles';
import {easing } from '../shared/animations';

const Text = styled.span`
  display: inline-block;
  vertical-align: top;
  font-family: ${typography.fonts.body};
  text-transform: uppercase;
`;

const Loading = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  opacity: 0;
`;

const APPEARENCES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  OUTLINE: 'outline',
  WARNING: 'warning',
  HOVER: 'hover',
};

const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const StyledButton = styled.button`
    border: 0;
    outline: 0;
    border-radius: ${spacing.borderRadius.regular};
    display: inline-block;
    overflow: hidden;
    padding: .5rem 1rem;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all .4s ease-in;
    transform: translate3d(0,0,0);
    vertical-align: top;
    white-space: nowrap;
    user-select: none;
    opacity: 1;
    margin: 0;
    background: transparent;
    box-shadow: 3px 4px 5px 5px rgba(20,20,20,0.1), 5px 8px 8px 3px rgba(20,20,20,0.02), inset 2px 3px 4px rgba(200,200,200,0.4);

    &:hover{
        background: ${colors.turquesa};
        box-shadow: 2px 3px 4px rgba(20,20,20,0.6);
    }

    ${(props) =>
    props.size === SIZES.SMALL && `font-size: ${typography.size.xs};
      padding: ${spacing.padding.m} ${spacing.padding.m}`};

    ${(props) =>
    props.size === SIZES.MEDIUM && `font-size: ${typography.size.s};
      padding: ${spacing.padding.m} ${spacing.padding.l}`};

    ${(props) =>
    props.size === SIZES.LARGE && `font-size: ${typography.size.m};
      padding: ${spacing.padding.m} ${spacing.padding.xl}`};

    ${(props) =>
      props.appearence === APPEARENCES.PRIMARY &&
      `background: ${colors.lapiz};
     color: ${colors.lightest};`}

     ${(props) =>
       props.appearence === APPEARENCES.SECONDARY &&
       `background: ${colors.terraCotta};
    color: ${colors.lightest};`}

    ${(props) =>
      props.appearence === APPEARENCES.TERTIARY &&
      `background: ${colors.cafeAuLait};
    color: ${colors.lightest};`}

    ${(props) =>
      props.appearence === APPEARENCES.OUTLINE &&
      `border: 1px solid ${colors.lapiz};
    color: ${colors.lapiz};`}

    ${(props) =>
      props.appearence === APPEARENCES.HOVER &&
      `background: ${colors.darkest};
    color: ${colors.lightest};`}

    ${props => props.isLoading && 
    `cursor: progress !important;
    opacity: 0.7;
    
    ${Loading}{
        transition: transform 700ms ${easing.rubber};
        transform: translate3d(0, -50%, 0);
        opacity: 1;
    }`}

    ${props => props.disabled &&
    `cursor: not-allowed !important;
    opacity: 0.5;
    &:hover {
        transform: none;
    }`}
`;

const ButtonLink = StyledButton.withComponent('a');

const applyStyle = (ButtonWrapper) => {
  return (
    ButtonWrapper &&
    StyledButton.withComponent(({ isUnclickable, ...rest }) => (
      <ButtonWrapper {...rest} />
    ))
  );
};

export function Button({
  isDisabled,
  isLoading,
  isLink,
  children,
  ButtonWrapper,
  loadingText,
  ...props
}) {
  const buttonInner = (
    <>
      <Text>{children}</Text>
      {isLoading && <Loading>{loadingText || 'Loading...'}</Loading>}
    </>
  );

  const StyledButtonWrapper = React.useMemo(() => applyStyle(ButtonWrapper), [
    ButtonWrapper,
  ]);

  let SelectedButton = StyledButton;
  if (ButtonWrapper) {
    SelectedButton = StyledButtonWrapper;
  } else if (isLink) {
    SelectedButton = ButtonLink;
  }

  return (
    <SelectedButton isLoading={isLoading} disabled={isDisabled} {...props}>
      {buttonInner}
    </SelectedButton>
  );
}

Button.propTypes = {
    isLoading: PropTypes.bool,
    loadingText: PropTypes.node,
    isLink: PropTypes.bool,
    children: PropTypes.node.isRequired,
    appearence: PropTypes.oneOf(Object.values(APPEARENCES)),
    isDisabled: PropTypes.bool,
    size: PropTypes.oneOf(Object.values(SIZES)),
    ButtonWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

Button.defaultProps = {
    isLoading: false,
    loadingText: null,
    isLink: false,
    appearance: APPEARENCES.TERTIARY,
    isDisabled: false,
    size: SIZES.MEDIUM,
    ButtonWrapper: undefined
}