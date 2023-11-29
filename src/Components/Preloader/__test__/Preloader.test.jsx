import React from 'react';
import { render } from '@testing-library/react';
import Preloader from '../Preloader';

test('renders Preloader component', () => {
  const { getByAltText, getByText } = render(<Preloader />);


  const logo = getByAltText('');
  expect(logo).toBeInTheDocument();

 
  const textContent = getByText(/Hell/i); 
  expect(textContent).toBeInTheDocument();
});
