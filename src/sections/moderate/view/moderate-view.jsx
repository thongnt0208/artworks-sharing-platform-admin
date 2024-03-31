/* eslint-disable */
// ----------------------------------------------------------------------

import React, { useEffect } from 'react';

import ModerateLeftNav from '../moderate-left-nav';
import ModerateContent from '../moderate-content';
import ModerateRightNav from '../moderate-right-nav';
import { getArtworksData, updateArtworkState } from '../Service';
import { set } from 'lodash';

export default function ModerateView() {
  const [refresh, setRefresh] = React.useState(false);
  const [selectingId, setSelectingId] = React.useState('');
  const [accountId, setAccountId] = React.useState('');
  const [artworks, setArtworks] = React.useState([]);
  const [account, setAccount] = React.useState({});
  const [pageNumber, setPageNumber] = React.useState(1);

  const handleModerateCallback = (note) => {
    if (selectingId === '') return;
    // Call API to update artwork state
    const response = updateArtworkState(selectingId, 1, note);
    if (response) {
      setRefresh(true);
    }
  }

  useEffect(() => {
    const artworks = getArtworksData(pageNumber, 10);
    artworks.then((data) => {
      const updatedArtworks = data.map((artwork) => ({ ...artwork, isSeen: false }));
      setArtworks(updatedArtworks);
      if (selectingId === '' || accountId === '' || account === null) {
        setSelectingId(updatedArtworks[0]?.id);
        setAccountId(updatedArtworks[0]?.account.id);
        setAccount(updatedArtworks[0]?.account);
      }
    });
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    const currentAccount = artworks.find((artwork) => artwork.id === selectingId)?.account;
    setAccount(currentAccount);
  }, [accountId]);

  return (
    <div className="grid" style={{ maxHeight: '80vh', padding: '20px 0' }}>
      <div className="col-3 max-h-full">
        <ModerateLeftNav
          itemsList={artworks}
          selectingId={selectingId}
          setSelectingId={setSelectingId}
          setAccountId={setAccountId}
        />
      </div>
      <div className="col-6 max-h-full">
        <ModerateContent selectingId={selectingId  || ""} className="col-6" />
      </div>
      <div className="col-3 max-h-full">
        <ModerateRightNav account={account || {}} handleModerateCallback={handleModerateCallback} className="col-3" />
      </div>
    </div>
  );
}