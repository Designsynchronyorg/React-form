import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AlertText from '../features/AlertText';
import { MyConfig } from '../../MyConfig';

export default class MyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            response: '',
            responseType: '',
            redirect: false,
        }

        // bind this
        this.handleSubmit = this.handleSubmit.bind(this);
        this.finishSubmitting = this.finishSubmitting.bind(this);
        this.startSubmitting = this.startSubmitting.bind(this);
        this.processResponse = this.processResponse.bind(this);
    }


    // process form response
    processResponse(setSubmitting, response, type = "response") {
        // if there's a process response prop
        if (this.props.processResponse) {
            return this.props.processResponse(response, type);
        }

        // console.log(response);
        // alert(response);


        // set message type
        let responseType = '';
        let message = '';
        // if error
        if (type === 'error') {
            // if(response)
            responseType = 'networkError';
            message = "There was a problem processing your request. Please check your internet connection or try again later";
        } else if (type === 'response' && (response.data.status.toLowerCase() !== 'success' || response.status !== 200)) {
            responseType = 'serverError';
            message = response.data.message;
        } else {
            responseType = 'response';
            message = response.data.message;
        }

        // set response in state
        this.setState({
            response: message,
            responseType: responseType,
        });

        // if process was successful
        if (responseType === 'response') {
            // store data in session
            if (this.props.storeUserData) {
                sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
                sessionStorage.setItem('isAuthenticated', true);
                sessionStorage.setItem('token', response.data.data.token.plainTextToken);
            }

            // give a redirect on success if needed
            if (this.props.redirectOnSuccess) {
                setTimeout(() => {
                    // redirect after 2secs
                    this.setState({
                        redirect: true,
                    });
                }, 2000);
            }
        }

        // finish submitting
        return this.finishSubmitting(setSubmitting);
    }

    // finish submitting
    finishSubmitting(setSubmitting) {
        if (this.props.isSubmitting) {
            this.props.isSubmitting(false);
        }
        setSubmitting(false);
        return;
    }

    // start submitting
    startSubmitting() {
        // pass
        if (this.props.isSubmitting) {
            this.props.isSubmitting(true);
        }

        return;
    }

    // handle submit
    handleSubmit(values, setSubmitting) {
        // start submitting
        this.startSubmitting();

        // handle submit
        // if there's a url
        if (this.props.formUrl) {
            // this.props.handleSubmit(values);
            let formUrl = MyConfig.apiUrl + this.props.formUrl;
            let self = this;
            const token = sessionStorage.getItem('token');
            // if there's a token
            if (token) {
                axios.post(formUrl, values, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(function (response) {
                        self.processResponse(setSubmitting, response);
                    })
                    .catch(function (error) {
                        self.processResponse(setSubmitting, error, "error");
                    });
                // if no token
            } else {
                axios.post(formUrl, values)
                    .then(function (response) {
                        self.processResponse(setSubmitting, response);
                    })
                    .catch(function (error) {
                        self.processResponse(setSubmitting, error, "error");
                    });
            }
        } else {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                this.finishSubmitting(setSubmitting);
            }, 400);
        }
    }

    render() {
        return (
            <>
                {/* Formik validation */}
                <Formik
                    initialValues={this.props.initialValues}
                    validationSchema={Yup.object(this.props.validationSchema)}
                    onSubmit={(values, { setSubmitting }) => {
                        return this.props.handleSubmit ? this.props.handleSubmit : this.handleSubmit(values, setSubmitting);
                    }}
                >
                    <Form className={this.props.formClasses + " my-12 md:my-auto"}>
                        {/* form message */}
                        <div>
                            {/* redirect */}
                            {this.state.redirect && <Navigate to={this.props.redirectOnSuccess} replace={true} />}
                            {/* success message */}
                            {
                                (
                                    this.state.response && (this.state.responseType === 'response') &&
                                    (
                                        <>
                                            <AlertText content={this.state.response + '. Redirecting you now...'} type='success' />
                                        </>
                                    )
                                )

                            }


                            {/* server error message */}
                            {
                                (this.state.response && (this.state.responseType === 'serverError') && (
                                    <>
                                        <AlertText content={this.state.response} type='danger' /></>
                                ))
                            }


                            {/* network error message */}
                            {
                                (this.state.response && (this.state.responseType === 'networkError') && (
                                    <>
                                        <AlertText content={this.state.response} type='danger' /></>
                                ))
                            }
                        </div>
                        {this.props.children}
                    </Form>
                </Formik>
            </>
        );
    }
};
