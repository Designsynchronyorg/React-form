import React from "react";
import { Field, useField } from "formik";
import FormInputGroup from "./FormInputGroup";
import { toast } from "react-toastify";
import Avatar from "./features/Avatar";
import Swal from "sweetalert2";

const FormFile = ({
  maxNumber,
  disabled = false,
  hasMessage = false,
  inputClasses,
  value,
  mutedText,
  groupClass,
  options,
  ...props
}) => {
  const [field, meta, setFieldValue] = useField(props.value);
  let setValue = setFieldValue.setValue;
  let setTouched = setFieldValue.setTouched;
  let user = JSON.parse(sessionStorage.getItem("user")!);

  function onChange(imageList, addUpdateIndex) {
    // const data = new FormData()
    // data.append('file', imageList)
    // // send to database
    // HttpRequest(MyConfig.apiUrl + 'update-user-image', 'post', data, ProcessHttpMessage)
    //     .then(response => {
    //         response.type === 'success' ? toast.success('Image updated successfully') : toast.error('There was a problem updating your image, please try again later.');
    //     });

    console.log("Here and there");
  }

  // On file select (from the pop up)
  function handleFileUpload(e) {
    e.preventDefault();
    const fi = e.target.files[0];
    console.log("file", fi);
    // Check if any file is selected.
    if (fi) {
      // for (const i = 0; i <= fi.length - 1; i++) {

      const fsize = Math.round(fi.size / 1024);
      const file = fsize;
      console.log("fileSize", file);

      // The size of the file.
      if (file >= 2096) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "File too Big, file size should be between 500kb to 2mb!",
          footer: "<p>Try a smaller file</p>",
        });
      } else if (file < 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "File too small, file size should be between 500kb to 2mb!",
          footer: "<p>This would help maintain image quality</p>",
        });
      } else {
        // Update the state
        // this.setState({selectedFile: event.target.files[0]});
        // onChange = {(event) => {
        //   if (event.currentTarget.files) {
        //   }
        console.log("setting formik");
        // setValue(fi);
      }
    }
  }

  return (
    <div className="cursor-pointer">
      <input
        name={props.name}
        accept="image/*"
        id="icon-button-file"
        type="file"
        className="inputfile inputfile-5" //   data-multiple-caption={`${count} files selected`}
        // multiple=""
        onChange={handleFileUpload}
        onClick={(e: React.FormEvent<HTMLInputElement>) => {
          e.currentTarget.value = null!;
        }}
        style={{ display: "none", cursor: "pointer" }}
      />
      <figure>
        <label htmlFor="icon-button-file">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M1 13L5.58578 8.41421C6.36683 7.63317 7.63316 7.63316 8.4142 8.41421L13 13M11 11L12.5858 9.41421C13.3668 8.63317 14.6331 8.63316 15.4142 9.41421L17 11M11 5H11.01M3 17H15C16.1045 17 17 16.1046 17 15V3C17 1.89543 16.1045 1 15 1H3C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17Z"
              stroke="#1C0C5B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
      </figure>
    </div>
  );
};

export default FormFile;
