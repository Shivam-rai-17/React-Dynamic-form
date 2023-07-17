import React from 'react';
import { render, screen , fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DynamicForm from '../Components/DynamicForm';

describe('DynamicForm', () => {
  const formFields = [
    {
      name: 'firstName',
      label: 'First Name',
      isRequired: true,
      displayType: 30,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      isRequired: true,
      displayType: 30,
    },
  ];

  const formValues = {
    firstName: 'John',
    lastName: 'Doe',
  };

  const formErrors = {};

  const inputRefs = { current: [] };

  const handleInputChange = jest.fn();
  const handleFileRemove = jest.fn();
  const handleKeyDown = jest.fn();
  const handleSubmit = jest.fn();
  const handleCheckboxChange = jest.fn();

  beforeEach(() => {
    render(
      <DynamicForm
        formFields={formFields}
        formValues={formValues}
        formErrors={formErrors}
        inputRefs={inputRefs}
        handleInputChange={handleInputChange}
        handleFileRemove={handleFileRemove}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        handleCheckboxChange={handleCheckboxChange}
      />
    );
  });

  test('renders DynamicForm component correctly', () => {
    expect(screen.getByTestId('dynamic-form')).toBeInTheDocument();
  });

  test('renders form fields correctly', () => {
    formFields.forEach((field) => {
      expect(screen.getByTestId(`form-field-input-${field.name.toLowerCase()}`)).toBeInTheDocument();
    });
  });
  
  test('handles form submission', () => {
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    const form = screen.getByTestId('dynamic-form');
    userEvent.click(form, { button: 0 });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });


});
