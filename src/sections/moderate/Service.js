import axios, { axiosPrivate } from '../../hooks/use-axios';

/**
 * Retrieves artworks data for moderation.
 * @param {number} pageNumber - The page number of the data to retrieve.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise<Array>} - A promise that resolves to an array of artwork items.
 * @author AnhDH
 * @version 1.0.1
 */
export async function getArtworksData(state, pageNumber, pageSize) {
  const response = await axiosPrivate.get('/moderation/artworks', {
    params: {
      state,
      pageNumber,
      pageSize,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data.items;
}

/**
 * Retrieves the artwork detail data from the server.
 * @param {string} artworkId - The ID of the artwork to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the artwork detail data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function getArtworkDetailData(artworkId) {
  const response = await axios.get(`/artworks/${artworkId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

/**
 * Updates the state of an artwork.
 * @param {string} artworkId - The ID of the artwork to update.
 * @param {string} state - The new state of the artwork.
 * @param {string} note - The note associated with the state change.
 * @returns {Promise<boolean>} - A promise that resolves to true if the artwork state is updated successfully, or false otherwise.
 * @author AnhDH
 * @version 1.0.1
 */
export async function updateArtworkState(artworkId, state, note) {
  try {
    const response = await axiosPrivate.put(`/moderation/artworks/${artworkId}/state`, {
      state,
      note,
    });
    if (response.status !== 204) {
      return response;
    }
    return response;
  } catch (error) {
    return error;
  }
}

/**
 * Downloads assets from the server.
 * @param {string} assetId - The ID of the asset to download.
 * @returns {Promise<string>} - The download link for the asset.
 * @author AnhDH
 * @version 1.0.0
 */
export async function downloadAssets(assetId) {
  try {
    const response = await axiosPrivate.get(`/assets/moderation/download/${assetId}`);
    if (response?.status !== 200) {
      console.error('Failed to download assets', response);
      return `https://artworkia-4f397.web.app/error?status=${response?.status}&message=${response?.data}`;
    }
    return response.data.link;
  } catch (error) {
    console.error('Failed to download assets', error);
    return `https://artworkia-4f397.web.app/error?status=${error?.status}&message=${error?.data}`;
  }
}
