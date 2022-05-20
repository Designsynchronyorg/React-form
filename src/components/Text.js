import React from 'react';
import { useField } from 'formik';
import InputGroup from './InputGroup';

const Text = ({ label, labelClasses, hasMessage, inputClasses, mutedText, groupClass, id, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <InputGroup
            meta={meta}
            label={label}
            labelClasses={labelClasses}
            hasMessage={hasMessage}
            inputClasses={inputClasses}
            mutedText={mutedText}
            groupClass={groupClass}
            id={id}
            inputField={
                <input type="email" id={id} className={(meta.touched && meta.error ? "danger-input-field " : "input-field ") + inputClasses} {...field} {...props} />
            }
        />
    );
};

export default Text;
