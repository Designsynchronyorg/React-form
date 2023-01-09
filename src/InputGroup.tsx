import React from "react";
import AlertText from "./features/AlertText";

class InputGroup extends React.Component<{
  label?: any;
  meta?: any;
  inputField?: any;
  labelClasses?: string;
  hasMessage?: boolean;
  inputClasses?: string;
  rows: number;
  mutedText?: string;
  groupClass?: string;
  id?: any;
  name?: any;
}> {
  render() {
    const {
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
    } = this.props;
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
          {meta.touched && meta.error && hasMessage && (
            <AlertText content={meta.error} type="danger" />
          )}
        </div>
      </>
    );
  }
}

export default InputGroup;
