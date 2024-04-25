import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../atoms/Button/Button.tsx";
import useCurrency from "../../../hooks/useCurrency.tsx";
import {
  separateCryptoAndFiat,
  frecuencyMap,
  formatDate,
} from "../../../utils/index.tsx";
import { useDispatch } from "react-redux";
import { setSimulatorData } from "../../../redux/slice/tradeSlice.tsx";
import { FREQUENCIES } from "../../../utils/constants.tsx";

// Interfaces para definir los tipos de datos del formulario
interface FormData {
  crypto: string;
  amount: number;
  currency: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

// Styled-components para el formulario y sus elementos
const FormContainer = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 90%;
  margin: auto;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
  align-self: flex-start;
`;

const FormInput = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
`;

const FormSelect = styled.select`
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
`;

const Form: React.FC = () => {
  const { availableBaseCurrencies, availableQuoteCurrencies } = useCurrency();

  const currencies = [...availableBaseCurrencies, ...availableQuoteCurrencies];

  const { crypto: cryptoCurrencies, fiat: fiatCurrencies } =
    separateCryptoAndFiat(currencies);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    crypto: "BTC",
    amount: 0,
    currency: "CLP",
    frequency: "monthly",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      ...formData,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
    });
    dispatch(setSimulatorData(formData));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormLabel>Cryptomoneda</FormLabel>
      <FormSelect
        value={formData.crypto}
        onChange={(e) => setFormData({ ...formData, crypto: e.target.value })}
        required
      >
        <option value="">Cryptomoneda</option>
        {cryptoCurrencies?.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </FormSelect>

      <FormLabel>Moneda</FormLabel>
      <FormSelect
        value={formData.currency}
        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
        required
      >
        <option value="">Moneda</option>
        {fiatCurrencies?.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </FormSelect>

      <FormLabel>Inversión en {formData.currency}</FormLabel>
      <FormInput
        type="number"
        name="cantidad"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: parseFloat(e.target.value) })
        }
        required
      />

      <FormLabel>Frecuencia</FormLabel>
      <FormSelect
        value={formData.frequency}
        onChange={(e) => {
          setFormData({ ...formData, frequency: e.target.value });
        }}
        required
      >
        <option value="">Frecuencia</option>
        {FREQUENCIES.map((frecuency, index) => (
          <option key={index} value={frecuency}>
            {frecuencyMap[frecuency]}
          </option>
        ))}
      </FormSelect>

      <FormLabel>Fecha de inicio</FormLabel>
      <FormInput
        type="date"
        value={formData.startDate}
        onChange={(e) =>
          setFormData({ ...formData, startDate: e.target.value })
        }
        required
      />

      <FormLabel>Fecha final</FormLabel>
      <FormInput
        type="date"
        value={formData.endDate}
        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
        required
      />

      <Button type="submit">Calcular</Button>
    </FormContainer>
  );
};

export default Form;
