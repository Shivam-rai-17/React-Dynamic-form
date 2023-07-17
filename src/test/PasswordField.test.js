import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordField from '../Components/PasswordField';

test('renders PasswordField component', () => {
    const field = {
      name: 'password',
      label: 'Password',
      isRequired: true,
    };
  
    const formValues = {
      password: '',
    };
  
    const formErrors = {
      password: 'Password is required',
    };
  
    render(
      <PasswordField
        field={field}
        formErrors={formErrors}
        formValues={formValues}
        handleInputChange={jest.fn()}
        handleKeyDown={jest.fn()}
      />
    );
  
    const passwordLabel = screen.getByTestId('password-label');
    const passwordInput = screen.getByTestId('password-input');
    const passwordErrorMessage = screen.getByTestId('password-error');
  
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });
  
  test('handles password input change', () => {
    const field = {
      name: 'password',
      label: 'Password',
      isRequired: true,
    };
  
    const formValues = {
      password: '',
    };
  
    const handleInputChange = jest.fn();
  
    render(
      <PasswordField
        field={field}
        formErrors={{}}
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleKeyDown={jest.fn()}
      />
    );
  
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'myPassword123' } });
  
    expect(handleInputChange).toHaveBeenCalledTimes(1);
    expect(handleInputChange).toHaveBeenCalledWith(expect.any(Object));
  });
  
