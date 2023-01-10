import React, { useEffect } from "react";
import { useField } from "formik";
import FormInputGroup from "./FormInputGroup";

// type = {
//     label?: any;
//     labelClasses?: string;
//     hasMessage: string;
//     inputClasses: string;
//     mutedText?: string;
//     groupClass: string;
//     id?: string;
// }
const FormText = ({
  label,
  labelClasses,
  hasMessage,
  inputClasses,
  mutedText,
  groupClass,
  id,
  ...props
}) => {
  const [field, meta, setFieldValue] = useField(id);

  useEffect(() => {
    if (
      props.type &&
      props.type === "hidden" &&
      props.value &&
      props.value !== field.value
    )
      setFieldValue.setValue(props.value);
  });

  return (
    <>
      <FormInputGroup
        meta={{ error: meta.error || "" }}
        label={label}
        labelClasses={labelClasses}
        hasMessage={hasMessage}
        inputClasses={inputClasses}
        mutedText={mutedText}
        groupClass={groupClass}
        id={id}
        inputField={
          <input
            id={id}
            className={
              (meta.touched && meta.error
                ? "danger-input-field "
                : "input-field ") + inputClasses
            }
            {...field}
            {...props}
          />
        }
      />
    </>
  );
};

export default FormText;
