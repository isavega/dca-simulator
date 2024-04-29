import React, { useState } from 'react';
import styled from 'styled-components';
import useCurrency from '../../../hooks/useCurrency.tsx';
import {
  separateCryptoAndFiat,
  frecuencyMap,
  formatDate,
} from '../../../utils/index.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSimulatorData } from '../../../redux/slice/tradeSlice.tsx';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

interface FormData {
  crypto: string;
  amount: number;
  currency: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

const FormContainer = styled.form`
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

const FormLabel = styled.label`
  margin-bottom: 8px;
  align-self: flex-start;
`;

const FormInput = styled.input`
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

const Form: React.FC = () => {
  const { availableBaseCurrencies, availableQuoteCurrencies } = useCurrency();

  const currencies = [...availableBaseCurrencies, ...availableQuoteCurrencies];

  const { simulatorData } = useSelector((state) => state.trade);

  const { crypto: cryptoCurrencies, fiat: fiatCurrencies } =
    separateCryptoAndFiat(currencies);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    ...simulatorData,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      ...formData,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
    });

    dispatch(setSimulatorData(formData));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <h2>DCC Simulator</h2>
      </InputContainer>

      <InputContainer>
        <FormControl fullWidth>
          <InputLabel id="select-label"> Crypto </InputLabel>
          <Select
            labelId="elect-label"
            id="select"
            value={formData.crypto}
            label="Age"
            onChange={(e) =>
              setFormData({ ...formData, crypto: e.target.value })
            }
          >
            {cryptoCurrencies?.map((currency, index) => (
              <MenuItem key={index} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </InputContainer>

      <InputContainer>
        <FormControl fullWidth>
          <InputLabel id="select-label"> Currency </InputLabel>
          <Select
            labelId="elect-label"
            id="select"
            value={formData.currency}
            label="Age"
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
          >
            {fiatCurrencies?.map((currency, index) => (
              <MenuItem key={index} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </InputContainer>

      <InputContainer>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: parseFloat(e.target.value) })
            }
            required
          />
        </FormControl>
      </InputContainer>

      <InputContainer>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">
            Frecuencia
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Frecuencia"
            value={frecuencyMap[formData.frequency]}
            readOnly
          />
        </FormControl>
      </InputContainer>

      <InputContainer>
        <FormLabel>Fecha Inicio</FormLabel>
        <FormInput
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          min="2016-01-01"
          required
        />
      </InputContainer>

      <InputContainer>
        <FormLabel>Fecha final</FormLabel>
        <FormInput
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          required
        />
      </InputContainer>

      <LoadingButton
        variant="outlined"
        type="submit"
        size="large"
        loading={false}
        loadingPosition="start"
        fullWidth={true}
        startIcon={<SendIcon />}
      >
        Calcular
      </LoadingButton>
    </FormContainer>
  );
};

export default Form;
