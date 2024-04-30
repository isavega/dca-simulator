import React from 'react';
import { formatNumberToCLP } from '../../../utils/index.tsx';
import styled from 'styled-components';

const StatisticsContainer = styled.div`
  background-color: rgb(31, 48, 71, 0.4);
  border-radius: 15px;
  padding: 20px 30px 50px 30px;
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: auto;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

const Statistics = ({ initialInvestment, returnRate, returnRateDCA }) => {
  return (
    <StatisticsContainer>
      <h4>Dinero invertido: {formatNumberToCLP(initialInvestment)}</h4>
      <h4>Retorno de inversión: {(returnRate * 100).toFixed(2)}%</h4>
      <h4>Retorno de inversión con DCA: {(returnRateDCA * 100).toFixed(2)}%</h4>
      {returnRateDCA > returnRate ? (
        <h4>
          En el rango de tiempo seleccionado, la estrategia DCA es mejor en un{' '}
          {(Math.abs(returnRateDCA - returnRate) * 100).toFixed(2)}%.
        </h4>
      ) : (
        <h4>
          En el rango de tiempo seleccionado, la estrategia de inversión normal
          es mejor en un{' '}
          {(Math.abs(returnRateDCA - returnRate) * 100).toFixed(2)}%.
          {/* {(Math.abs(returnRateDCA - returnRate) * 100).toFixed(2)}%. */}
        </h4>
      )}
    </StatisticsContainer>
  );
};

export default Statistics;
