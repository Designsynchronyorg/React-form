import React from "react";
import { Field, useField } from "formik";
import FormInputGroup from "./FormInputGroup";

const FormSelect = ({
  labelClasses,
  disabled = false,
  hasMessage = false,
  inputClasses,
  mutedText,
  groupClass,
  options,
  id,
  ...props
}) => {
  const [field, meta, setFieldValue] = useField(id);
  let setValue = setFieldValue.setValue;
  let setTouched = setFieldValue.setTouched;

  return (
    <FormInputGroup
      meta={meta}
      label={props.label}
      labelClasses={labelClasses}
      hasMessage={hasMessage}
      inputClasses={inputClasses}
      mutedText={mutedText}
      groupClass={groupClass}
      id={props.id}
      inputField={
        <Field
          as="select"
          disabled={disabled}
          id={props.id}
          className={
            meta.touched && meta.error && hasMessage
              ? "danger-input-field cursor-pointer"
              : "input-field cursor-pointer"
          }
          {...field}
          name={props.name}
          {...props}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(props.name, true)}
        >
          <option>Select an option</option>
          {options}
        </Field>
      }
    />
  );
};

export default FormSelect;
