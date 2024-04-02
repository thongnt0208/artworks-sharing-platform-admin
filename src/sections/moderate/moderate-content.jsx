import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Image } from 'primereact/image';
import { ScrollPanel } from 'primereact/scrollpanel';

import './style/moderate-content.scss';
import { getArtworkDetailData } from './Service';

export default function ModerateContent({ selectingId }) {
  const [artwork, setArtwork] = React.useState({});

  useEffect(() => {
    getArtworkDetailData(selectingId).then((data) => {
      setArtwork(data);
    });
  }, [selectingId]);

  return (
    <ScrollPanel style={{ width: '100%', height: '82vh' }}>
      {selectingId ? (
        <div className="content-container">
          <h1 className="title m-0 mb-3">{artwork.title}</h1>
          {artwork.images?.map((image, index) => (
            <Image className="artwork-image" key={index} src={image.location} alt={artwork.title} />
          ))}
          <h3 className="description">{artwork.description}</h3>

          <div className="tags">
            {artwork.tagList?.map((tag, index) => (
              <span key={index} className="tag">
                # {tag.tagName}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div>Chưa có tác phẩm nào cần duyệt!</div>
      )}
    </ScrollPanel>
  );
}

ModerateContent.propTypes = {
  selectingId: PropTypes.string.isRequired,
};
