import { axiosPrivate } from '../../hooks/use-axios';

/**
 * Retrieves report data from the server.
 * @param {string} reportEntity - The entity for which the report data is requested.
 * @param {number} pageNumber - The page number of the report data.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise<any>} - A promise that resolves to the report data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function getReportData(reportEntity, pageNumber, pageSize) {
  try {
    const response = await axiosPrivate.get('/reports', {
      params: {
        reportEntity,
        pageNumber,
        pageSize,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

/**
 * Updates the state of a report.
 * @param {string} reportId - The ID of the report to update.
 * @param {string} status - The new status of the report.
 * @param {string} note - Additional notes for the report.
 * @returns {Promise<boolean>} - A promise that resolves to true if the report state was updated successfully, or false otherwise.
 * @author AnhDH
 * @version 1.0.0
 */
export async function updateReportState(reportId, state, note) {
  try {
    const response = await axiosPrivate.put(`/reports/${reportId}/state`, {
      state,
      note,
    });
    if (response.status !== 204) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Soft deletes an account by its ID.
 * @param {string} accountId - The ID of the account to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the account was successfully deleted, or false otherwise.
 * @author AnhDH
 * @version 1.0.0
 */
export async function softDeleteAccount(accountId) {
  try {
    const response = await axiosPrivate.delete(`/accounts/${accountId}`);
    if (response.status !== 204) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Retrieves the detailed data of a comment.
 *
 * @param {string} commentId - The ID of the comment.
 * @returns {Promise<Object>} - A promise that resolves to the comment data.
 * @throws {Error} - If an error occurs during the API request.
 * @author AnhDH
 * @version 1.0.0
 */
export async function getCommentDetailData(commentId) {
  try {
    const response = await axiosPrivate.get(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

/**
 * Soft deletes a comment by its ID.
 * @param {string} commentId - The ID of the comment to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the comment is successfully deleted, or false otherwise.
 * @throws {Error} - If an error occurs during the API request.
 * @author AnhDH
 * @version 1.0.0
 */
export async function softDeleteComment(commentId) {
  try {
    const response = await axiosPrivate.delete(`/comments/${commentId}`);
    if (response.status !== 204) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Retrieves the artwork detail data from the server.
 * @param {string} artworkId - The ID of the artwork.
 * @returns {Promise<Object>} - A promise that resolves to the artwork detail data.
 * @throws {Error} - If an error occurs while retrieving the artwork detail data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function getArtworkDetailData(artworkId) {
  try {
    const response = await axiosPrivate.get(`/artworks/${artworkId}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

/**
 * Soft deletes an artwork by its ID.
 * @param {string} artworkId - The ID of the artwork to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the artwork is successfully deleted, or false otherwise.
 * @author AnhDH
 * @version 1.0.0
 */
export async function softDeleteArtwork(artworkId) {
  try {
    const response = await axiosPrivate.delete(`/artworks/softdelete/${artworkId}`);
    if (response.status !== 204) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
