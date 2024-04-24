import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../atoms/Button/Button.tsx";
import useCurrency from "../../../hooks/useCurrency.tsx";
import { separateCryptoAndFiat } from "../../../utils/index.tsx";
import Calendar from "../Calendar/Calendar.tsx";

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

const FormCalendar = styled.div`
  margin-bottom: 16px;
`;

const Form: React.FC = () => {
  const { availableBaseCurrencies, availableQuoteCurrencies } = useCurrency();

  const currencies = [...availableBaseCurrencies, ...availableQuoteCurrencies];

  const { crypto: cryptoCurrencies, fiat: fiatCurrencies } =
    separateCryptoAndFiat(currencies);

  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    crypto: "",
    amount: 0,
    currency: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });

  return (
    <FormContainer onSubmit={() => {}}>
      <FormLabel>Cryptomoneda</FormLabel>
      <FormSelect
        name="cryptomoneda"
        value={formData.crypto}
        onChange={() => {}}
        required
      >
        <option value="">Cryptomoneda</option>
        {cryptoCurrencies?.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </FormSelect>

      <FormLabel>Monto inversión</FormLabel>
      <FormInput
        type="number"
        name="cantidad"
        value={formData.amount}
        onChange={() => {}}
        required
      />

      <FormLabel>Moneda</FormLabel>
      <FormSelect
        name="tipoMoneda"
        value={formData.currency}
        onChange={() => {}}
        required
      >
        <option value="">Moneda</option>
        {fiatCurrencies?.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </FormSelect>

      <FormLabel>Frecuencia</FormLabel>
      <FormInput
        type="text"
        name="frecuencia"
        value={formData.frequency}
        onChange={() => {}}
        required
      />

      <FormLabel>Fecha de inicio</FormLabel>
      <FormCalendar
        onClick={() => {
          setShowCalendar(!showCalendar);
        }}
      >
        {formData.startDate}
      </FormCalendar>
      {showCalendar && <Calendar />}

      <FormLabel>Fecha final</FormLabel>
      <FormInput
        type="date"
        name="fechaFinal"
        value={formData.endDate}
        onChange={() => {}}
        required
      />

      <Button type="submit">Calcular</Button>
    </FormContainer>
  );
};

export default Form;
