import React from 'react';
import { formatNumberToCLP } from '../../../utils/index.tsx';
import styled from 'styled-components';

const StatisticsContainer = styled.div`
  background-color: rgb(31, 48, 71, 0.4);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    background-color: transparent;
    margin-top: 5%;
  }
`;

interface CardProps {
  title: string;
  data: string;
}

const CardContainer = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 20px 10px 20px;
  padding: 10px;
  background-color: #f77f00;
  border-radius: 10px;
  min-width: 300px;

  @media (max-width: 768px) {
    margin: 10px 0;
    width: 50%;
    margin-left: 50%;
  }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

const CardNumber = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #f1faee;
`;

const Card: React.FC<CardProps> = ({ title, data }) => {
  return (
    <CardContainer>
      <div>
        <CardTitle>{title}</CardTitle>
        <CardNumber>{data}</CardNumber>
      </div>
    </CardContainer>
  );
};

const Statistics = ({ initialInvestment, returnRate, returnRateDCA }) => {
  return (
    <StatisticsContainer>
      <Card
        title="Dinero invertido"
        data={formatNumberToCLP(initialInvestment)}
      />
      <Card
        title="Retorno de inversión"
        data={`${(returnRate * 100).toFixed(2)}%`}
      />
      <Card
        title="Retorno de inversión DCA"
        data={`${(returnRateDCA * 100).toFixed(2)}%`}
      />
    </StatisticsContainer>
  );
};

export default Statistics;
