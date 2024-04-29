import React from 'react';
import styled from 'styled-components';
import Form from '../../molecules/Form/Form.tsx';
import Chart from '../../molecules/Chart/Chart.tsx';

const SimulatorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  width: 100%;
`;

const FormContainer = styled.div`
  flex: 1;
  width: 20%;
  margin-right: 20px;
`;

const ChartContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DCASimulator: React.FC = () => {
  return (
    <SimulatorContainer>
      <FormContainer>
        <Form />
      </FormContainer>
      <ChartContainer>
        <Chart />
      </ChartContainer>
    </SimulatorContainer>
  );
};

export default DCASimulator;
