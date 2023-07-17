import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectField from '../Components/SelectField';

describe('SelectField component', () => {
  const field = {
    name: 'color',
    label: 'Color',
    isRequired: true,
    pickListEntry: [
      { key: 'red', name: 'red', value: 'Red' },
      { key: 'blue', name: 'blue', value: 'Blue' },
      { key: 'green', name: 'green', value: 'Green' },
    ],
  };

  const formValues = {
    color: 'blue',
  };

  const formErrors = {
    color: 'Color is required',
  };

  const handleInputChange = jest.fn();
  const handleKeyDown = jest.fn();

  beforeEach(() => {
    render(
      <SelectField
        field={field}
        formValues={formValues}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />
    );
  });

  test('renders SelectField component correctly', () => {
    expect(screen.getByTestId('select-field-label')).toHaveTextContent('Color');
    expect(screen.getByTestId('select-field-select')).toHaveValue('blue');
    expect(screen.getByTestId('select-field-option-red')).toHaveTextContent('Red');
    expect(screen.getByTestId('select-field-option-blue')).toHaveTextContent('Blue');
    expect(screen.getByTestId('select-field-option-green')).toHaveTextContent('Green');
    expect(screen.getByTestId('select-field-error')).toHaveTextContent('Color is required');
  });

  test('handles select change', () => {
    const select = screen.getByTestId('select-field-select');
    fireEvent.change(select, { target: { value: 'red' } });
    expect(handleInputChange).toHaveBeenCalledTimes(1);
    expect(handleInputChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('handles key down event', () => {
    const select = screen.getByTestId('select-field-select');
    fireEvent.keyDown(select, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    expect(handleKeyDown).toHaveBeenCalledWith(expect.any(Object));
  });
});
