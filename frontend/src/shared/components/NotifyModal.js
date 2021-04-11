import React from 'react';
import { TiTickOutline } from 'react-icons/ti'
import Modal from './Modal';
import Button from './Button';
import './NotifyModal.css'

const NotifyModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Notification"
      show={!!props.message}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    > <div className='message'>
        <TiTickOutline size={50} className='tick-icon'/>
        <p>{props.message}</p>
      </div>
    </Modal>
  )
}

export default NotifyModal
