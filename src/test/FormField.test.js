import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../Components/FormField';

describe('FormField component', () => {
  const field = {
    name: 'name',
    label: 'Name',
    isRequired: true,
    displayType: 30,
  };

  const formValues = {
    name: 'John Doe',
  };

  const formErrors = {
    name: 'Name is required',
  };

  const handleInputChange = jest.fn();
  const handleKeyDown = jest.fn();

  beforeEach(() => {
    render(
      <FormField
        field={field}
        formValues={formValues}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />
    );
  });

  test('renders FormField component correctly', () => {
    expect(screen.getByTestId('form-field-label')).toHaveTextContent('Name');
    expect(screen.getByTestId('form-field-input-name')).toHaveValue('John Doe');
    expect(screen.getByTestId('form-field-error')).toHaveTextContent('Name is required');
  });

  test('handles input change', () => {
    const input = screen.getByTestId('form-field-input-name');
    fireEvent.change(input, { target: { value: 'Jane Smith' } });
    expect(handleInputChange).toHaveBeenCalledTimes(1);
    expect(handleInputChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('handles key down event', () => {
    const input = screen.getByTestId('form-field-input-name');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    expect(handleKeyDown).toHaveBeenCalledWith(expect.any(Object));
  });
});
