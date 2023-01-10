import React from "react";
import { FieldHookConfig, useField } from "formik";
// import AlertText from '../features/AlertText';
import FormInputGroup from "./FormInputGroup";

const FormTextArea = ({
  label,
  cols = "",
  labelClasses = "",
  hasMessage = true,
  inputClasses = "",
  rows = 4,
  mutedText,
  groupClass = "",
  id,
  ...props
}: any & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <FormInputGroup
      meta={meta}
      label={label}
      labelClasses={labelClasses}
      hasMessage={hasMessage}
      inputClasses={inputClasses}
      rows={rows}
      mutedText={mutedText}
      groupClass={groupClass}
      id={id}
      inputField={
        <textarea
          rows={rows}
          id={id}
          className={
            (meta.touched && meta.error
              ? "danger-input-field "
              : "input-field ") + inputClasses
          }
          {...field}
          {...props}
        ></textarea>
      }
    />
  );
};

export default FormTextArea;
