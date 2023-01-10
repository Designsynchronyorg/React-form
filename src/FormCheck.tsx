import React from "react";
import { useField } from "formik";
import AlertText from "./features/AlertText";

const FormCheck = ({
  label,
  mutedText,
  groupClass,
  inputGroupClass = "",
  hasMessage = true,
  id,
  ...props
}) => {
  const [field, meta] = useField(props.value);
  return (
    <>
      <div className={groupClass}>
        <div
          className={inputGroupClass + " flex items-center justify-center mb-4"}
        >
          <input
            id={id}
            aria-describedby={id}
            type="checkbox"
            className="checkbox"
            {...field}
            {...props}
          />
          <label
            htmlFor={props.name}
            className={
              meta.touched && meta.error
                ? "ml-5 danger-input-label"
                : "ml-5 input-label"
            }
          >
            {label}
          </label>
        </div>
        <div>
          {mutedText ? <div className="muted-text">{mutedText}</div> : ""}
          {meta.touched && meta.error && meta.error !== null && hasMessage ? (
            <AlertText content={meta.error} type="danger" id={id} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FormCheck;
