import React from "react";
import { Navigate } from "react-router-dom";
import AlertText from "./features/AlertText";

export const FormResponseDisplay = ({
  response,
  responseType,
  redirect,
  redirectTo,
}) => (
  <div>
    {/* redirect */}
    {redirect && <Navigate to={redirectTo} replace={true} />}
    {/* success message */}
    {response && responseType === "response" && (
      <>
        <AlertText
          content={response + ". Redirecting you now..."}
          type="success"
        />
      </>
    )}

    {/* server error message */}
    {response && responseType === "serverError" && (
      <>
        <AlertText content={response} type="danger" />
      </>
    )}

    {/* network error message */}
    {response && responseType === "networkError" && (
      <>
        <AlertText content={response} type="danger" />
      </>
    )}
  </div>
);
