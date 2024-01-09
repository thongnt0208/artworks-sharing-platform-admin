/* eslint-disable */
// ----------------------------------------------------------------------

import React, { useEffect } from 'react'

import ModerateLeftNav from '../moderate-left-nav'
import ModerateContent from '../moderate-content';
import ModerateRightNav from '../moderate-right-nav';

export default function ModerateView() {
  const [selectingId, setSelectingId] = React.useState("");
  const itemsList = [
    {
      id: "123",
      avatar: "https://picsum.photos/200",
      text: "This is a messrrwrrrrrr wrrrrrr rwwfffffff",
      author: "Author",
      time: "12:00",
      isSeen: false,
    },
    {
      id: "1v24",
      avatar: "https://picsum.photos/400",
      text: "This is ue porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 2",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12df6",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12cd6",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12zzxc6",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "1ss26",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12re6",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "1c26",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "1w26",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12e6",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
    {
      id: "12a",
      avatar: "https://picsum.photos/400",
      text: "Ddolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
      author: "Author 3",
      time: "13:00",
      isSeen: false,
    },
  ]

  useEffect(() => {
    // Fetch the items list from API
    setSelectingId(itemsList[0]?.id);
  }, [])

  useEffect(() => {
    console.log(selectingId);
  }, [selectingId])

  return (
    <div className='grid' style={{ maxHeight: "80vh" }}>
      <div className="col-3 max-h-full">
        <ModerateLeftNav itemsList={itemsList} selectingId={selectingId} setSelectingId={setSelectingId} />
      </div>
      <div className="col-6">
        <ModerateContent className="col-6" />
      </div>
      <div className="col-3">
        <ModerateRightNav className="col-3" />
      </div>

    </div>
  )
}
