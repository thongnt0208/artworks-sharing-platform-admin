import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';

import './style.scss';

export default function AssetsCard(props) {
  const { thumbnail, itemsList, handleDownloadAssetsCallback } = props;

  const totalItems = itemsList ? itemsList.length : 0;

  const thumbnailColumn = (image) => (
    <div className="w-fit flex flex-column justify-content-center align-items-end">
      <img alt="Ảnh thu nhỏ của một bài đăng" src={image} className="thumbnail" />
      <Button className="number-of-items" rounded label={`Chứa ${totalItems} tài nguyên`} />
    </div>
  );

  const detailsColumn = (item) => (
    <div className="detail-column">
      <div className="file-info flex flex-column justify-content-start align-items-start">
        <span className="file-name">{item.name}</span>
        <span className="file-size">{item.size} KB</span>
      </div>
      <div className="file-type">
        <span>.{item.extension}</span>
      </div>
      <div className="file-action flex flex-row justify-content-start align-items-center">
        <div className="file-price">
          <span>{`${item.price} Xu`}</span>
        </div>
        <Button
          icon="pi pi-cloud-download"
          className="download-button"
          tooltip="Tải về"
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleDownloadAssetsCallback(item.id)}
        />
      </div>
    </div>
  );

  return (
    <div className="assets-card-container w-full h-fit">
      {thumbnail && <div className="thumbnail-column-container">{thumbnailColumn(thumbnail)}</div>}

      <div className="detail-column-container w-full h-full">
        <DataScroller
          className="w-full"
          value={itemsList}
          itemTemplate={detailsColumn}
          rows={itemsList ? itemsList.length : 0}
        />
      </div>
    </div>
  );
}

AssetsCard.propTypes = {
  thumbnail: PropTypes.string,
  itemsList: PropTypes.array,
  handleDownloadAssetsCallback: PropTypes.func,
};
