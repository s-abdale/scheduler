import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";

   // Confirm story
   if (props.confirm) {
     buttonClass += " button--confirm";
   }

   // Danger story
   if (props.danger) {
      buttonClass += " button--danger";
   }


   return (
      <button 
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
