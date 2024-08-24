import React from 'react'
import './ToastModal.css'
export const ToastModal = ({id,type,message,handleClose}) => {

  console.log(handleClose)
  return (
        <div className={`toast-wrapper ${type}`}>
            {message}
            <span onClick={()=>{handleClose(id)}}> X</span>
        </div>
  )
}
