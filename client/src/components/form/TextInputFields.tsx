import React from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Form } from "react-bootstrap";

interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

const TextInputField = ({
  name,
  label,
  register,
  registerOtions,
  error,
  ...props
}: TextInputFieldProps) => {
  return (
    <Form.Group className="mb-3" controlId={name + "inuput"}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...props}
        {...register(name, registerOtions)}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextInputField;
