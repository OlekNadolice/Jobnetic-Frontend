import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";

import classes from "./modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  children: React.ReactNode;
  title: string;

  closeModal: () => void;
}

const Modal: FC<ModalProps> = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  function closeStateModal(e: React.MouseEvent): void {
    props.closeModal();
  }

  {
    return ReactDOM.createPortal(
      <div className={classes.backdrop} id="backDrop" onClick={e => closeStateModal(e)}>
        <div className={classes.modal}>
          <header className={classes.modalHeader}>
            <h2>{props.title}</h2>
            <AiOutlineClose id="closeIcon" onClick={e => closeStateModal(e)} />
          </header>
          {props.children}
        </div>
      </div>,
      document.getElementById("modal")!
    );
  }
};

export default Modal;
