import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxField from '../Components/CheckboxField';

test('handles checkbox change', () => {
  const field = {
    name: 'options',
    label: 'Options',
    isRequired: true,
    pickListEntry: [
      { key: '1', name: 'option1', value: 'Option 1' },
      { key: '2', name: 'option2', value: 'Option 2' },
      { key: '3', name: 'option3', value: 'Option 3' },
    ],
  };

  const formValues = {
    options: 'option1',
  };

  const handleCheckboxChange = jest.fn();

  render(
    <CheckboxField
      field={field}
      formValues={formValues}
      handleCheckboxChange={handleCheckboxChange}
    />
  );

  const option2Checkbox = screen.getByLabelText(/Option 2/i);

  fireEvent.click(option2Checkbox); 

  expect(handleCheckboxChange).toHaveBeenCalledTimes(1);
  expect(handleCheckboxChange).toHaveBeenCalledWith(expect.any(Object));
});
