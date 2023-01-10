import AlertText from "./features/AlertText";

const FormInputGroup = ({
  label,
  meta,
  inputField,
  labelClasses = "",
  hasMessage = true,
  inputClasses = "",
  rows = 4,
  mutedText,
  groupClass = "",
  id,
  ...props
}) => {
  return (
    <>
      {/* input field group */}
      <div className={groupClass}>
        {/* if there's label, display the label */}
        {label && (
          <label
            htmlFor={props.name}
            className={
              (meta.touched && meta.error
                ? "danger-input-label "
                : "input-label ") + labelClasses
            }
          >
            {label}
          </label>
        )}

        {/* input field */}
        {inputField}

        {/* input field description */}
        {mutedText ? <div className="muted-text">{mutedText}</div> : ""}

        {/* Error message */}
        {/* {meta.touched && meta.error && meta.error !== null && hasMessage && (
          <AlertText content={meta.error} id={id} type="danger" />
        )} */}
        {meta.error && meta.error !== "" && meta.error !== null && (
          <AlertText content={meta.error} id={id} type="danger" />
        )}
      </div>
    </>
  );
};

export default FormInputGroup;
