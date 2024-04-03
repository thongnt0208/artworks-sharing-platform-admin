/* eslint-disable */
// ----------------------------------------------------------------------

import React, { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

import ModerateLeftNav from '../moderate-left-nav';
import ModerateContent from '../moderate-content';
import ModerateRightNav from '../moderate-right-nav';
import { downloadAssets, getArtworksData, updateArtworkState } from '../Service';
import { getArtworkDetailData } from '../Service';
import { getAuthInfo } from 'src/utils/AuthUtil';

export default function ModerateView() {
  const authData = getAuthInfo();
  if (!authData) {
    window.location.href = '/login';
  }
  const toast = useRef(null);
  const [tabValue, setTabValue] = React.useState('0');
  const [refresh, setRefresh] = React.useState(false);
  const [selectingId, setSelectingId] = React.useState('');
  const [accountId, setAccountId] = React.useState('');
  const [artworks, setArtworks] = React.useState([]);
  const [artwork, setArtwork] = React.useState({});
  const [account, setAccount] = React.useState({});
  const [pageNumber, setPageNumber] = React.useState(1);

  const showSuccess = (summary, detail) => {
    toast.current.show({ severity: 'success', summary: summary, detail: detail, life: 3000 });
  };

  const showError = (summary, detail) => {
    toast.current.show({ severity: 'error', summary: summary, detail: detail, life: 3000 });
  };

  const handleModerateCallback = (state, note) => {
    if (selectingId === null) return;
    // Call API to update artwork state
    const response = updateArtworkState(selectingId, state, note);
    response.then((data) => {
      if (data.status === 204) {
        showSuccess('Thành công', `Duyệt bài thành công: ${state === 1 ? 'Chấp nhận' : 'Từ chối'}`);
        setRefresh(true);
      } else {
        showError('Thất bại', `Lỗi: ${data.status} - Duyệt bài thất bại`);
      }
    });
  };

  const handleGetArtworksData = (state, pageNumber, pageSize) => {
    const artworks = getArtworksData(state, pageNumber, pageSize);
    artworks.then((data) => {
      const updatedArtworks = data.map((artwork) => ({ ...artwork, isSeen: false }));
      setArtworks(updatedArtworks);
      setSelectingId(updatedArtworks[0]?.id);
      setAccountId(updatedArtworks[0]?.account.id);
      setAccount(updatedArtworks[0]?.account);
    });
    setRefresh(false);
  };

  const handleDownloadAssets = (id) => {
    if (id === null) return;
    downloadAssets(id)
      .then((link) => {
        window.open(link, '_blank');
      })
      .catch((error) => {
        console.error('loi roi' + error);
      });
  };

  useEffect(() => {
    if (selectingId === '') return;
    getArtworkDetailData(selectingId).then((data) => {
      setArtwork(data);
    });
  }, [selectingId]);

  useEffect(() => {
    setSelectingId('');
    setAccountId('');
    setAccount({});
    handleGetArtworksData(tabValue, pageNumber, 50);
  }, [refresh, tabValue]);

  useEffect(() => {
    const currentAccount = artworks.find((artwork) => artwork.id === selectingId)?.account;
    setAccount(currentAccount);
  }, [accountId]);

  return (
    <div className="grid" style={{ maxHeight: '80vh', padding: '20px 0' }}>
      <Toast ref={toast} />
      <div className="left-nav col-3 max-h-full">
        <ModerateLeftNav
          tabValue={tabValue}
          setTabValue={setTabValue}
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
