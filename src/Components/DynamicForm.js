import React from 'react';
import FormField from './FormField';
import CheckboxField from './CheckboxField';
import FileField from './FileField';
import SelectField from './SelectField';
import PasswordField from './PasswordField';
import 'bootstrap/dist/css/bootstrap.min.css';

const DynamicForm = ({
  formFields,
  formValues,
  formErrors,
  inputRefs,
  handleInputChange,
  handleFileRemove,
  handleKeyDown,
  handleSubmit,
  handleCheckboxChange,
}) => {

  const setFieldRef = (index, inputRef , field) => {
    inputRefs.current[index] = inputRef;
  };

  return (
    <form data-testid="dynamic-form" onSubmit={handleSubmit}>
      {formFields.map((field, index) => (
        <div key={field.name} ref={(inputRef) => setFieldRef(index, inputRef , field)}>
          {field.displayType === 30 && (
            <FormField
              field={field}
              formValues={formValues}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
              handleKeyDown={(e) => handleKeyDown(e, index)}
              inputRef={inputRefs[field.name]}
              
            />
          )}

          {field.displayType === 10 && (
            <SelectField
              field={field}
              formErrors={formErrors}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleKeyDown={(e) => handleKeyDown(e, index)}
              inputRef={inputRefs[field.name]}
              data-testid={`form-field-input-${field.name}`}
            />
          )}

          {field.displayType === 50 && (
            <PasswordField
              field={field}
              formErrors={formErrors}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleKeyDown={(e) => handleKeyDown(e, index)}
              inputRef={inputRefs[field.name]}
              data-testid={`form-field-input-${field.name}`}
            />
          )}

          {field.displayType === 40 && (
            <CheckboxField
              field={field}
              formValues={formValues}
              handleInputChange={handleInputChange}
              handleCheckboxChange={handleCheckboxChange}
              inputRef={inputRefs[field.name]}
              data-testid={`form-field-input-${field.name}`}
            />
          )}

          {field.displayType === 60 && (
            <FileField
              field={field}
              formValues={formValues}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
              handleFileRemove={handleFileRemove}
              inputRef={inputRefs[field.name]}
              data-testid={`form-field-input-${field.name}`}
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
