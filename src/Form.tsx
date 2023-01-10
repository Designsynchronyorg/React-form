import { ProcessHttpMessage } from "des-http-processor";
import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import HttpRequest from "des-http-processor";
import { FormResponseDisplay } from "./FormResponseDisplay";
import { CallParentMethod } from "des-utilities";
import { BindThis } from "des-utilities";
import SvgIcon from "des-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";
// import { boolean } from "yup/lib/locale";

interface IExtraFormData {
  append: any;
}
class MyForm extends Component<
  {
    id?: string;
    extraFormData?: IExtraFormData;
    processResponse?: string;
    shouldDisplayPushNotification?: boolean;
    storeUserData?: Boolean;
    forceRedirect?: string;
    redirectOnSuccess?: string;
    validationSchema?: any;
    errorMessageClass?: string;
    successMessageClass?: string;
    shouldDisplayInlineResponse?: boolean;
    finishSubmitting?: any;
    type?: boolean;
    formId?: string;
    apend?: string | JSX.Element;
    formClass?: string;
    showSpinner?: Boolean;
    formUrl?: string;
    formDisplay?: string;
    initialValues?: any;
    children?: React.ReactNode;
    handleSubmit?: any;
    formClasses?: string;
    isSubmitting?: any;
    form?: any;
  },
  any
> {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      responseType: "",
      redirect: false,
      formMessage: {},
      id: this.props.id ? this.props.id : "defaultForm",
      showSpinner: false,
      formBtnText: "",
    };

    // bind this
    BindThis(this, [
      "handleSubmit",
      "finishSubmitting",
      "startSubmitting",
      "processResponse",
    ]);
  }

  // process form response
  processResponse(response, type, setSubmitting) {
    // call parent process response prop
    CallParentMethod(this, "processResponse", {
      response: response.response,
      type: type,
    });

    // process message in response
    let processedResponse;
    if (response.response)
      processedResponse = ProcessHttpMessage(response.response, type);
    else processedResponse = ProcessHttpMessage(response, type);

    // set response in state
    this.setState({ formMessage: processedResponse });

    // if process was successful
    if (processedResponse.type === "success") {
      // store data in session
      if (this.props.storeUserData) {
        // format depending on response object
        if (processedResponse.data.data) {
          // set token
          if (processedResponse.data.data.user)
            sessionStorage.setItem(
              "user",
              JSON.stringify(processedResponse.data.data.user)
            );

          // set token & isAuthenticated
          if ("token" in processedResponse.data.data) {
            sessionStorage.setItem("isAuthenticated", `${true}`);
            sessionStorage.setItem(
              "token",
              processedResponse.data.data.token.plainTextToken
            );
          }
        } else if (processedResponse.data) {
          // set token
          if (processedResponse.data.user)
            sessionStorage.setItem(
              "user",
              JSON.stringify(processedResponse.data.user)
            );
          else if ("user_type" in processedResponse.data)
            sessionStorage.setItem(
              "user",
              JSON.stringify(processedResponse.data)
            );

          // set token & isAuthenticated
          if ("token" in processedResponse.data) {
            sessionStorage.setItem("isAuthenticated", `${true}`);
            sessionStorage.setItem(
              "token",
              processedResponse.data.token.plainTextToken
            );
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${processedResponse.data.token.plainTextToken}`;
          }
        }
      }

      // give a redirect on success if needed
      if (
        (this.props.redirectOnSuccess &&
          window.location.pathname !== this.props.redirectOnSuccess) ||
        this.props.forceRedirect
      ) {
        setTimeout(() => {
          // redirect after 2secs
          this.setState({
            redirect: true,
          });
        }, 2000);
      }
    }

    // finish submitting
    return this.finishSubmitting(setSubmitting, processedResponse);
  }

  // finish submitting
  finishSubmitting(setSubmitting, message) {
    // set is submitting to false in parent
    if (
      !CallParentMethod(this, "isSubmitting", { isSubmitting: false || "" })
    ) {
      // get form button using form id

      let form = document.getElementById(this.state.id);
      let btn: any = form!.getElementsByTagName("button");

      // and change btn text to processing
      btn.innerText = this.state.formBtnText;

      // store previous btn text
      this.setState({
        formBtnText: "",
      });
    }

    // reset form
    // if (message.type === "success"){
    //   document.getElementById(this.state.id).onreset;
    // }

    // display push notification
    const shouldDisplayPushNotification =
      this.props.shouldDisplayPushNotification === false ? false : true;
    if (shouldDisplayPushNotification) {
      if (message.type === "success") toast.success(message.description);
      else if (message.type === "warning") toast.warn(message.description);
      else if (message.type === "error") toast.error(message.description);
      else toast.info(message.description);
    }

    // hide spinner if previously shown
    if (this.props.showSpinner)
      this.setState({
        showSpinner: false,
      });

    // call finish submitting method
    CallParentMethod(this, "finishSubmitting");
    return setSubmitting(false);
  }

  // start submitting
  startSubmitting() {
    // set is submitting to true in parent
    if (!CallParentMethod(this, "isSubmitting", { isSubmitting: true })) {
      // get form button using form id
      let form = document.getElementById(this.state.id);
      let btn: any = form!.getElementsByTagName("button");

      // store previous btn text
      this.setState({
        formBtnText: btn.innerText,
      });

      // and change btn text to processing
      btn.innerText = "Processing...";
    }

    // show spinner if allowed
    if (this.props.showSpinner)
      this.setState({
        showSpinner: true,
      });
    return;
  }

  // handle submit
  handleSubmit(values, setSubmitting) {
    // start submitting
    this.startSubmitting();

    let data = { ...values };
    // console.log('data: ', data);
    // if there's an extra form data
    if (this.props.extraFormData) {
      // loop through values object
      if (values) {
        Object.entries(values).map((value) =>
          this?.props?.extraFormData?.append(value[0], value[1])
        );
      }

      data = this.props.extraFormData;
    }

    // handle submit
    // if there's a url
    if (this.props.formUrl) {
      // console.log('props', this.props);
      // console.log('data', data);
      HttpRequest(
        this.props.formUrl,
        "post",
        data,
        this.processResponse,
        setSubmitting
      );
    } else {
      setTimeout(() => {
        alert(JSON.stringify(data, null, 2));
        // this.finishSubmitting(setSubmitting)
      }, 400);
    }
  }

  render() {
    const formClass = this.props.formClass ? this.props.formClass : "p-4";
    const formDisplay = this.props.formDisplay
      ? this.props.formDisplay
      : "relative";
    const shouldDisplayInlineResponse =
      this.props.shouldDisplayInlineResponse === false ? false : true;
    // set form message class
    const errorMessageClass = this.props.errorMessageClass
      ? this.props.errorMessageClass
      : "my-3 md:my-6 text-red-600 dark:text-red-300";
    const successMessageClass = this.props.successMessageClass
      ? this.props.successMessageClass
      : "my-3 md:my-6 text-lime-600 dark:text-lime-300";
    return (
      <>
        {/* Formik validation */}
        <Formik
          initialValues={this.props.initialValues}
          validationSchema={Yup.object(this.props.validationSchema)}
          onSubmit={(values, { setSubmitting }) => {
            console.log("form");
            this.props.handleSubmit
              ? this.props.handleSubmit(values)
              : this.handleSubmit(values, setSubmitting);
          }}
        >
          <Form className={formDisplay + " " + formClass} id={this.state.id}>
            {/* form submission response */}
            <FormResponseDisplay
              response={this.state.description}
              responseType={this.state.responseType}
              redirect={this.state.redirect}
              redirectTo={this.props.redirectOnSuccess}
            />

            {/* form spinner */}
            {this.props.showSpinner && this.state.showSpinner && (
              <div
                className={
                  "bg-gray-700/50 dark:bg-gray-900/80 overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-30 w-full md:inset-0 h-full flex justify-center items-center"
                }
              >
                <div className="inline w-8 h-8 md:w-12 md:h-12 lg:w-18 lg:h-18 xl:w-20 xl:h-20 mr-2">
                  <SvgIcon type="spinner" />
                </div>
              </div>
            )}

            {/* form message */}
            {
              // if form message is set and should be displayed
              shouldDisplayInlineResponse &&
                this.state.formMessage.description && (
                  // display message with appropriate class
                  <p
                    className={
                      this.state.formMessage.type === "success"
                        ? successMessageClass
                        : errorMessageClass
                    }
                  >
                    {this.state.formMessage.description}
                  </p>
                )
            }

            {/* form content */}
            {this.props.children}
          </Form>
        </Formik>
      </>
    );
  }
}
export default MyForm;
