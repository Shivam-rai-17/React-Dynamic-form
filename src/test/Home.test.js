import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from '../pages/Home';
import { getData } from '../api/data';

jest.mock('../api/data', () => ({
  getData: jest.fn(),
}));

describe('Home', () => {
  const formFields = [
    { name: 'firstName', displayType: 30 },
    { name: 'lastName', displayType: 30 },
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

  beforeEach(async () => {
    getData.mockResolvedValue(formFields);
    await act(async () => {
      render(
        <Home
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
  });
  test('fetches form fields and renders form', async () => {
    expect(getData).toHaveBeenCalledTimes(1);
    await screen.findByText('Dynamic Form');
    expect(screen.getByTestId('dynamic-form')).toBeInTheDocument();
  });

});
