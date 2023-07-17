import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileField from '../Components/FileField';

describe('FileField', () => {
  test('renders FileField component', () => {
    const field = {
      name: 'file',
      label: 'File',
      isRequired: true,
      filesAccepted: 'image/*',
    };
  
    const formValues = {
      file: null,
    };
  
    const formErrors = {
      file: 'Invalid file format',
    };
  
    render(
      <FileField
        field={field}
        formValues={formValues}
        formErrors={formErrors}
        handleInputChange={jest.fn()}
        handleFileRemove={jest.fn()}
      />
    );
  
    const fileLabels = screen.getAllByText(/File/i);
    expect(fileLabels).toHaveLength(2);
  
    fileLabels.forEach((fileLabel) => {
      expect(fileLabel).toBeInTheDocument();
    });
  
    const fileInput = screen.getByTestId('form-field-input-file');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  
    expect(screen.getByText(/Invalid file format/i)).toBeInTheDocument();
  });
  
  
  
      

  test('handles file selection', () => {
    const field = {
      name: 'file',
      label: 'File',
      isRequired: true,
      filesAccepted: 'image/*',
    };

    const formValues = {
      file: null,
    };

    const handleInputChange = jest.fn();

    render(
      <FileField
        field={field}
        formValues={formValues}
        formErrors={{}}
        handleInputChange={handleInputChange}
        handleFileRemove={jest.fn()}
      />
    );

    const fileInput = screen.getByTestId('form-field-input-file');

    fireEvent.change(fileInput, { target: { files: [new File([], 'test.png', { type: 'image/png' })] } });

    expect(handleInputChange).toHaveBeenCalledTimes(1);
    expect(handleInputChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('handles file removal', () => {
    const field = {
      name: 'file',
      label: 'File',
      isRequired: true,
      filesAccepted: 'image/*',
    };

    const formValues = {
      file: { name: 'test.png' },
    };

    const handleFileRemove = jest.fn();

    render(
      <FileField
        field={field}
        formValues={formValues}
        formErrors={{}}
        handleInputChange={jest.fn()}
        handleFileRemove={handleFileRemove}
      />
    );

    const removeButton = screen.getByRole('button', { name: /Remove/i });

    fireEvent.click(removeButton);

    expect(handleFileRemove).toHaveBeenCalledTimes(1);
    expect(handleFileRemove).toHaveBeenCalledWith(field.name);
  });
});
