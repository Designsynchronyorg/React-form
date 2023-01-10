import React from 'react';
import { useField } from 'formik';
import AlertText from './AlertText';

const Checkbox = ({ label, mutedText, groupClass, inputGroupClass = '', errorOnTouch=true, hasMessage=true, id, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className={groupClass}>
                <div className={inputGroupClass + " flex items-center justify-center mb-4"}>
                    <input id={id} aria-describedby={id} type="checkbox" className="checkbox" {...field} {...props} />
                    <label htmlFor={props.name} className={(errorOnTouch && meta.touched) || meta.error ? "ml-5 danger-input-label" : "ml-5 input-label"}>{label}</label>
                </div>
                <div>
                    {mutedText ? (<div className="muted-text">{mutedText}</div>) : ''}
                    {(errorOnTouch && meta.touched) || meta.error && hasMessage ? (
                        <AlertText content={meta.error} type="danger" />
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Checkbox;
