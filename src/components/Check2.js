import React from 'react';
import { useField } from 'formik';
import AlertText from '../features/AlertText';

const FormText = ({ label, mutedText, groupClass, id, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className={groupClass}>
                <label>{label}</label>
                <input type="email" id={id} className={meta.touched && meta.error ? "danger-input-field" : "input-field"} {...field} {...props} />
                {mutedText ? (<div className="muted-text">{mutedText}</div>) : ''}
                {meta.touched && meta.error ? (
                    <AlertText content={meta.error} type="danger" />
                ) : null}



                <div className="flex items-center mb-4">
                    <input id={id} aria-describedby={id} type="checkbox" className="checkbox" />
                    <label htmlFor={props.name} className={meta.touched && meta.error ? "danger-input-label" : "input-label"}>{label}</label>
                </div>
                <div>
                    {mutedText ? (<div className="muted-text">{mutedText}</div>) : ''}
                    {meta.touched && meta.error ? (
                        <AlertText content={meta.error} type="danger" />
                    ) : null}
                </div>
            </div>






            <div className={this.props.groupClass}>
                <div className="flex items-center mb-4">
                    <input id="checkbox-2" aria-describedby="checkbox-2" type="checkbox" className="w-4 h-4 text-base-400 bg-gray-100 rounded border-gray-300 focus:ring-base-400 dark:focus:ring-base-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-2" className="ml-3 text-sm font-medium text-lg">{this.props.label}</label>
                </div>
            </div>
        </>
    );
};

export default FormText;
