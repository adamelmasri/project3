import "./style.css";
import React from "react";

export function ModalView() {

    return (
      <div class="div">
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal2"
          id="modalViewLink"
        >
          View Comments
        </a>
      </div>
    );
  }

