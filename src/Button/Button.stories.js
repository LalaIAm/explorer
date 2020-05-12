import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
};

export const defaultButton = () => <Button>Default Button</Button>;

export const filledButton = () => (
  <>
    <Button appearence="primary">Primary</Button>
    <Button appearence="secondary">Secondary</Button>
    <Button appearence="tertiary">Tertiary</Button>
  </>
);

export const outlinedButton = () => (
  <Button appearence="outline">Outline Button</Button>
);

export const disabledButtons = () => (
  <>
    <Button appearence="primary" isDisabled>
      I'm Disabled
    </Button>
  </>
);

export const loadingBtns = () => (
  <>
    <Button appearence="outline" isLoading>
    Loading
    </Button>
    <Button appearence="secondary" isLoading loadingText="Custom load">
      Secondary
    </Button>
  </>
);

export const btnSizes = () => (
  <>
    <Button appearence="tertiary" size="small">
      Small
    </Button>
    <Button appearence="secondary" size="medium">
      Medium
    </Button>
    <Button appearence="primary" size="large">
      Large
    </Button>
  </>
);
