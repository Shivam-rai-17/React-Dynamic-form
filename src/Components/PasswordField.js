import React from 'react';

const PasswordField = ({ field, formErrors, formValues, handleInputChange, handleKeyDown }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={field.name} data-testid="password-label">
        {field.label} {field.isRequired && <span className="asterisk">*</span>}
      </label>
      <input
        type="password"
        id={field.name}
        name={field.name}
        value={formValues[field.name] || ''}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="form-control"
        data-testid="password-input"
      />
      {formErrors[field.name] && (
        <p className="error" data-testid="password-error">
          {formErrors[field.name]}
        </p>
      )}
    </div>
  );
};


export default PasswordField;
