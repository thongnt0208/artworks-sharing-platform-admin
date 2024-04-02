/* eslint-disable */
// ----------------------------------------------------------------------

import React, { useEffect } from 'react';

import ModerateLeftNav from '../moderate-left-nav';
import ModerateContent from '../moderate-content';
import ModerateRightNav from '../moderate-right-nav';
import { downloadAssets, getArtworksData, updateArtworkState } from '../Service';
import { getArtworkDetailData } from '../Service';

export default function ModerateView() {
  //TODO:
  // - ITG Report artwork
  // - ITG download assets artwork
  // - Fix UI for ModerateLeftNav
  // - Fix bug when accept artwork but not re-render ModerateContent & ModerateRightNav
  // - Update set new pageNumber when scroll to bottom
  // - Handle regex for note
  const [refresh, setRefresh] = React.useState(false);
  const [selectingId, setSelectingId] = React.useState('');
  const [accountId, setAccountId] = React.useState('');
  const [artworks, setArtworks] = React.useState([]);
  const [artwork, setArtwork] = React.useState({});
  const [account, setAccount] = React.useState({});
  const [pageNumber, setPageNumber] = React.useState(1);

  const handleModerateCallback = (state, note) => {
    if (selectingId === null) return;
    // Call API to update artwork state
    const response = updateArtworkState(selectingId, state, note);
    if (response) {
      console.log('Update artwork state successfully', response);
      setRefresh(true);
    }
  };

  const handleGetArtworksData = (pageNumber, pageSize) => {
    const artworks = getArtworksData(pageNumber, pageSize);
    artworks.then((data) => {
      const updatedArtworks = data.map((artwork) => ({ ...artwork, isSeen: false }));
      setArtworks(updatedArtworks);
      if (selectingId === '' || accountId === '' || account === null) {
        setSelectingId(updatedArtworks[0]?.id);
        setAccountId(updatedArtworks[0]?.account.id);
        setAccount(updatedArtworks[0]?.account);
      }
    });
  };

  const handleDownloadAssets = (id) => {
    downloadAssets(id)
      .then((link) => {
        window.open(link, '_blank');
      })
      .catch((error) => {
        console.error('loi roi' + error);
      });
  };

  useEffect(() => {
    getArtworkDetailData(selectingId).then((data) => {
      setArtwork(data);
    });
  }, [selectingId]);

  useEffect(() => {
    handleGetArtworksData(pageNumber, 10);
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    const currentAccount = artworks.find((artwork) => artwork.id === selectingId)?.account;
    setAccount(currentAccount);
  }, [accountId]);

  return (
    <div className="grid" style={{ maxHeight: '80vh', padding: '20px 0' }}>
      <div className="left-nav col-3 max-h-full">
        <ModerateLeftNav
          itemsList={artworks}
          selectingId={selectingId}
          setSelectingId={setSelectingId}
          setAccountId={setAccountId}
        />
      </div>
      <div className="content col-6 max-h-full">
        <ModerateContent artwork={artwork} className="col-6" />
      </div>
      <div className="right-nav col-3 max-h-full">
        <ModerateRightNav
          thumbnail={artwork.thumbnail}
          artwork={artwork}
          account={account || {}}
          handleModerateCallback={handleModerateCallback}
          handleDownloadAssetsCallback={(id) => handleDownloadAssets(id)}
          className="col-3"
        />
      </div>
    </div>
  );
}
