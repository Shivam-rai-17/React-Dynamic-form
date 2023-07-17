import React from 'react';

const SelectField = ({ field, formValues, formErrors, handleInputChange, handleKeyDown }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={field.name} data-testid="select-field-label">
        {field.label} {field.isRequired && <span className="asterisk">*</span>}
      </label>
      <select
        name={field.name}
        id={field.id}
        value={formValues[field.name] || ''}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="form-control"
        data-testid="select-field-select"
      >
        {field.pickListEntry.map((option) => (
          <option value={option.name} key={option.key} data-testid={`select-field-option-${option.key}`}>
            {option.value}
          </option>
        ))}
      </select>
      {formErrors[field.name] && <p className="error" data-testid="select-field-error">{formErrors[field.name]}</p>}
    </div>
  );
};

export default SelectField;
