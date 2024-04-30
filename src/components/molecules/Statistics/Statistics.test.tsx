import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Statistics from './Statistics';

describe('<Statistics />', () => {
  it('renders with correct data', () => {
    const initialInvestment = 1000;
    const returnRate = 0.05;
    const returnRateDCA = 0.07;

    const { getByText } = render(
      <Statistics
        initialInvestment={initialInvestment}
        returnRate={returnRate}
        returnRateDCA={returnRateDCA}
      />,
    );

    expect(getByText('Dinero invertido')).toBeInTheDocument();
    expect(getByText('Retorno de inversión')).toBeInTheDocument();
    expect(getByText('Retorno de inversión DCA')).toBeInTheDocument();
  });
});
