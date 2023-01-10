import React, { Component } from "react";
import SvgIcon from "des-svg-icons";
// import _ from "lodash";

export default class Avatar extends Component<{
  labelContClass?: string;
  contClass?: string;
  imgClass?: string;
  descriptionClass?: string;
  nameClass?: string;
  imgAlt?: string;
  imgFormat?: string;
  pic?: string;
  imgSize?: string;
  imgRounded?: string;
  name?: string;
  description?: any;
}> {
  render() {
    // function isEmpty(obj){
    //   for(var prop in obj){
    //     if(obj.hasOwnProperty(prop))
    //     return false;
    //   }
    //   return true
    // }

    // const myEmptyObj = {};

    // Object.keys(myEmptyObj).length === 0 && myEmptyObj.constructor === Object

    // //ok ok
    // _.isEmpty(myEmptyObj)
    // //
    const labelContClass = this.props.labelContClass
      ? this.props.labelContClass
      : "";
    const contClass = this.props.contClass
      ? this.props.contClass
      : "items-center";
    const imgClass = this.props.imgClass
      ? this.props.imgClass
      : "text-gray-500 dark:text-gray-500";
    // const imgClass = this.props.imgClass ? this.props.imgClass : 'text-gray-500 hover:text-base-400 dark:text-gray-500 dark:hover:text-base-200';
    const descriptionClass = this.props.descriptionClass
      ? this.props.descriptionClass
      : "";
    const nameClass = this.props.nameClass ? this.props.nameClass : "";
    const imgAlt = this.props.imgAlt ? this.props.imgAlt : "user";
    const imgFormat = this.props.imgFormat ? this.props.imgFormat : "img";
    const imgSize = this.props.imgSize ? this.props.imgSize : "w-10 h-10";
    const imgRounded = this.props.imgRounded
      ? this.props.imgRounded
      : "rounded-full";
    return (
      <div className={"flex " + contClass}>
        {/* profile picture */}
        {
          // if there's a profile picture
          this.props.pic ? (
            imgFormat === "img" ? (
              // if it's an image, use an img tag and add the url to src
              <img
                className={imgClass + " " + imgSize + " " + imgRounded}
                src={this.props.pic}
                alt={imgAlt}
              />
            ) : (
              // else, display the file
              <div className={imgClass + " " + imgSize + " " + imgRounded}>
                {this.props.pic}
              </div>
            )
          ) : (
            // if no pic, use default avatar
            <div className={imgClass + " " + imgSize + " " + imgRounded}>
              <SvgIcon type="defaultAvatar" />
            </div>
          )
        }
        <div className={"font-medium dark-text " + labelContClass}>
          {/* user's name */}
          {this.props.name && (
            <div className={nameClass}>{this.props.name}</div>
          )}

          {/* user's nickname */}
          {this.props.description && (
            <div
              className={descriptionClass || "dark-text text-sm text-base-400"}
            >
              {this.props.description || "user"}
            </div>
          )}
        </div>
      </div>
    );
  }
}
