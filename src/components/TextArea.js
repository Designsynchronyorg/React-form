import React from 'react';
import { useField } from 'formik';
import InputGroup from './InputGroup';

const TextArea = ({ label, labelClasses = '', hasMessage = true, inputClasses = '', rows = 4, mutedText, groupClass = '', id, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <InputGroup
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
                <textarea rows={rows} id={id} className={(meta.touched && meta.error ? "danger-input-field " : "input-field ") + inputClasses} {...field} {...props}></textarea>
            }
        />
    );
};

export default TextArea;
