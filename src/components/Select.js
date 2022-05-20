import React from 'react';
import { useField } from 'formik';
import InputGroup from './InputGroup';


const Select = ({ label, labelClasses, disabled = false, hasMessage, inputClasses, mutedText, groupClass, id, ...props }) => {
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
                <select disabled={disabled} type="email" id={id} className={meta.touched && meta.error ? "danger-input-field cursor-pointer" : "input-field cursor-pointer"} {...field} {...props} />
            }
        />
    );
};

export default Select;
