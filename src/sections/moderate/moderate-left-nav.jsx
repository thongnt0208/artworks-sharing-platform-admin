/* eslint-disable */
// ----------------------------------------------------------------------
import React from 'react'

import MessageItemTemplate from './moderate-message-item'
import { DataScroller } from 'primereact/datascroller';

export default function ModerateLeftNav(props) {
  const { itemsList, selectingId, setSelectingId } = props;
  console.log(selectingId);
  return (
    <div className='max-h-full'>
      <p className='text-cus-h2-bold'>Chưa đọc</p>
      {!itemsList && <p>Không có yêu cầu nào</p>}
      <DataScroller
        value={itemsList}
        rows={8} 
        buffer={0.4}
        inline 
        lazy={true}
        scrollHeight='80vh'
        itemTemplate={(item) => (
          <MessageItemTemplate
            key={item.id}
            item={item}
            selectingId={selectingId}
            setSelectingId={setSelectingId}
          />
        )}
      />
      {/* {itemsList?.map((item) => (
        <MessageItemTemplate
          key={item.id}
          item={item}
          selectingId={selectingId}
          setSelectingId={setSelectingId}
        />
      ))} */}
    </div>
  )
}