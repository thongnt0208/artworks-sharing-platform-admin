/* eslint-disable */
// ----------------------------------------------------------------------
import React from 'react'

import MessageItemTemplate from './moderate-message-item'
import { DataScroller } from 'primereact/datascroller';

export default function ModerateLeftNav(props) {
  const { itemsList, selectingId, setSelectingId, setAccountId } = props;
  return (
    <div className='max-h-full'>
      <p className='text-cus-h2-bold m-0 mb-3'>Chưa duyệt</p>
      <DataScroller
        value={itemsList}
        emptyMessage='Không có tác phẩm nào cần duyệt' 
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
            setAccountId={setAccountId}
          />
        )}
      />
    </div>
  )
}