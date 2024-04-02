import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'primereact/image';
import { ScrollPanel } from 'primereact/scrollpanel';

import './style/moderate-content.scss';

export default function ModerateContent({ artwork }) {
  const { id, title, description, images, tagList } = artwork;

  return (
    <ScrollPanel style={{ width: '100%', height: '82vh' }}>
      {id ? (
        <div className="content-container">
          <h1 className="title m-0 mb-3">{title}</h1>
          {images?.map((image, index) => (
            <Image className="artwork-image" key={index} src={image.location} alt={title} />
          ))}
          <h3 className="description">{description}</h3>

          <div className="tags">
            {tagList?.map((tag, index) => (
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
  artwork: PropTypes.object,
};
