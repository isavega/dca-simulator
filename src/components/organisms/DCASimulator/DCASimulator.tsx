import React from 'react';
import styled from 'styled-components';
import Form from '../../molecules/Form/Form.tsx';
import Chart from '../../molecules/Chart/Chart.tsx';
import { useSelector } from 'react-redux';
import Statistics from '../../molecules/Statistics/Statistics.tsx';
import InvestmentTable from '../../molecules/InvestmentTable/InvestmentTable.tsx';

const SimulatorContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const FormContainer = styled.div`
  flex: 1;
  width: 60%;
  margin-right: 20px;
`;

const ChartContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ResultContainer = styled.div`
  background-color: #f77f00;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
`;

const TableContainer = styled.div`
  width: 100%;
  margin: 50px 0 50px 0;
`;

const DCASimulator: React.FC = () => {
  const statistics = useSelector((state) => state.trade.statistics);

  return (
    <div>
      <Statistics
        initialInvestment={statistics.initialInvestment}
        returnRate={statistics.returnRate}
        returnRateDCA={statistics.returnRateDCA}
      />

      <SimulatorContainer>
        <FormContainer>
          <Form />
        </FormContainer>
        <ChartContainer>
          <Chart />
        </ChartContainer>
      </SimulatorContainer>
      <ResultContainer>
        {statistics.returnRateDCA > statistics.returnRate ? (
          <p>
            En el rango de tiempo seleccionado, la estrategia DCA es mejor en un{' '}
            {(
              Math.abs(statistics.returnRateDCA - statistics.returnRate) * 100
            ).toFixed(2)}
            %.
          </p>
        ) : (
          <p>
            En el rango de tiempo seleccionado, la estrategia de inversión
            normal es mejor en un{' '}
            {(
              Math.abs(statistics.returnRateDCA - statistics.returnRate) * 100
            ).toFixed(2)}
            %.
          </p>
        )}
      </ResultContainer>
      <TableContainer>
        <InvestmentTable />
      </TableContainer>
    </div>
  );
};

export default DCASimulator;
