import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../atoms/Button/Button.tsx";
import useCurrency from "../../../hooks/useCurrency.tsx";

// Interfaces para definir los tipos de datos del formulario
interface FormData {
  cryptomoneda: string;
  cantidad: number;
  tipoMoneda: string;
  frecuencia: string;
  fechaInicio: string;
  fechaFinal: string;
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

const Form: React.FC = () => {
  // Hook personalizado para obtener las cryptomonedas
  const { availableBaseCurrencies, availableQuoteCurrencies } = useCurrency();

  const [formData, setFormData] = useState<FormData>({
    cryptomoneda: "",
    cantidad: 0,
    tipoMoneda: "",
    frecuencia: "",
    fechaInicio: "",
    fechaFinal: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Aquí puedes enviar los datos a la lógica de tu aplicación
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormLabel>Cryptomoneda</FormLabel>
      <FormInput
        type="text"
        name="cryptomoneda"
        value={formData.cryptomoneda}
        onChange={handleInputChange}
        required
      />

      <FormLabel>Cantidad de dinero</FormLabel>
      <FormInput
        type="number"
        name="cantidad"
        value={formData.cantidad}
        onChange={handleInputChange}
        required
      />

      <FormLabel>Tipo de moneda</FormLabel>
      <FormInput
        type="text"
        name="tipoMoneda"
        value={formData.tipoMoneda}
        onChange={handleInputChange}
        required
      />

      <FormLabel>Frecuencia</FormLabel>
      <FormInput
        type="text"
        name="frecuencia"
        value={formData.frecuencia}
        onChange={handleInputChange}
        required
      />

      <FormLabel>Fecha de inicio</FormLabel>
      <FormInput
        type="date"
        name="fechaInicio"
        value={formData.fechaInicio}
        onChange={handleInputChange}
        required
      />

      <FormLabel>Fecha final</FormLabel>
      <FormInput
        type="date"
        name="fechaFinal"
        value={formData.fechaFinal}
        onChange={handleInputChange}
        required
      />

      <Button type="submit">Calcular</Button>
    </FormContainer>
  );
};

export default Form;
