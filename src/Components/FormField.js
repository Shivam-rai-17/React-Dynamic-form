import React from 'react';

const FormField = ({ field, formValues, formErrors, handleInputChange, handleKeyDown }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    handleInputChange({ target: { name, value } });
  };
  return (
    <div className="form-group mb-3">
      <label htmlFor={field.name}  data-testid="form-field-label">
        {field.label} {field.isRequired && <span className="asterisk">*</span>}
      </label>
      <input
        type={field.displayType === 50 ? 'password' : 'text'}
        id={field.name}
        name={field.name}
        value={formValues[field.name] || ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="form-control"
        data-testid={`form-field-input-${field.name.toLowerCase()}`}
      />
      {formErrors[field.name] && <p className="error" data-testid="form-field-error">{formErrors[field.name]}</p>}
    </div>
  );
};

export default FormField;
