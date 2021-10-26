import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({onClose, children}) {

  useEffect(() => { 
    window.addEventListener('keydown', handleKeyDown);
    return () => {
    window.removeEventListener('keydown', handleKeyDown);
    }
  })

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

    return createPortal(
      <div className={style.Overlay} onClick={handleOverlayClick}>
        <div className={style.Modal}>{children}</div>
      </div>,
      modalRoot,
    );
}