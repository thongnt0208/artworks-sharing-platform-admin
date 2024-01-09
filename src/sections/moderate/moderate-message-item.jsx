/* eslint-disable */
// ----------------------------------------------------------------------

import React from 'react'

import './style/moderate-message-item.scss'
import { Avatar } from 'primereact/avatar';

export default function MessageItemTemplate(props, context) {
  const { item, selectingId, setSelectingId } = props;
  const { id, avatar, text, author, time, isSeen } = item;
  const [isSeenLocal, setIsSeenLocal] = React.useState(isSeen);
  const flexAddition = 'flex gap-3 align-items-center'
  const messageItemClass = selectingId !== id ? `message-item ${flexAddition}` : `message-item message-item-selecting ${flexAddition}`;

  const textElements = document.querySelectorAll(".text-limit");
  textElements.forEach(element => {
    let text = element.textContent.trim();
    if (text.length > 30) {
      text = text.slice(0, 30) + "...";
      element.textContent = text;
    }
  });

  const itemClickHandler = () => {
    // Call a function that call API to setIsSeen to false
    // setIsSeenLocal(true)
    setSelectingId(id);
    setIsSeenLocal(true)
  }


  return (
    <div className={messageItemClass} onClick={itemClickHandler}>
      <div className="message-item-avatar flex">
        <Avatar image={avatar} size="large" shape="circle" />
      </div>
      <div className="message-item-content">
        <div className="message-item-header">
          <div className="message-item-author text-cus-normal-bold">
            {author}
          </div>

        </div>
        <div className={!isSeenLocal ? 'message-item-text text-cus-normal-bold text-limit' : 'message-item-text text-cus-normal text-limit'}>
          {text}
        </div>
      </div>
      <div className="message-status-content">
        <div className="message-item-time text-cus-small">
          {time}
        </div>
        {!isSeenLocal && <div className="message-item-seen" />}
      </div>
    </div>
  )
}
