import { axiosPrivate } from 'src/hooks/use-axios';

import { fDate } from 'src/utils/format-time';

/**
 * Retrieves the total count of artworks from the server.
 * @returns {Promise<number>} The total count of artworks.
 * @throws {Error} If unable to fetch the artwork data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetTotalArtworks() {
  try {
    const response = await axiosPrivate.get('/moderation/artworks');
    return response.data.totalCount;
  } catch (error) {
    console.error('Không thể lấy dữ liệu tác phẩm.', error);
    return [];
  }
}

/**
 * Retrieves the total number of accounts from the server.
 * @returns {Promise<number>} The total number of accounts.
 * @throws {Error} If unable to fetch the account data from the server.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetTotalAccounts() {
  try {
    const response = await axiosPrivate.get('/moderation/accounts');
    return response.data.totalCount;
  } catch (error) {
    console.error('Không thể lấy dữ liệu tài khoản.', error);
    return [];
  }
}

/**
 * Retrieves the total number of services.
 *
 * @returns {Promise<number>} The total number of services.
 * @throws {Error} If there is an error retrieving the data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetTotalServices() {
  try {
    const response = await axiosPrivate.get('/services');
    return response.data.totalCount;
  } catch (error) {
    console.error('Không thể lấy dữ liệu dịch vụ.', error);
    return [];
  }
}

/**
 * Retrieves the total number of reports.
 *
 * @async
 * @function GetTotalReports
 * @returns {Promise<number>} The total number of reports.
 * @throws {Error} If there is an error retrieving the data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetTotalReports() {
  try {
    const response = await axiosPrivate.get('/reports');
    return response.data.totalCount;
  } catch (error) {
    console.error('Không thể lấy dữ liệu báo cáo.', error);
    return [];
  }
}

/**
 * Retrieves the wallet history data for a given account ID.
 * @returns A promise that resolves to the wallet history data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetWalletHistoryData() {
  try {
    const response = await axiosPrivate.get(`/Dashboard/wallet-histories`);
    if (response.data.items.length === 0) {
      return [];
    }
    return response.data.items;
  } catch (error) {
    console.error('Không thể lấy dữ liệu lịch sử ví.', error);
    return [];
  }
}

/**
 * Retrieves transaction history data for a given account ID.
 * @returns A promise that resolves to an array of TransactionHistoryProps objects.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetTransactionHistoryData() {
  try {
    const response = await axiosPrivate.get(`/Dashboard/transaction-histories`);
    if (response.data.items.length === 0) {
      return [];
    }
    return response.data.items;
  } catch (error) {
    console.error('Không thể lấy dữ liệu lịch sử giao dịch.', error);
    throw new Error('Không thể lấy dữ liệu lịch sử giao dịch.');
  }
}

/**
 * Retrieves the percentage category proposal statistics.
 * @returns {Promise} A promise that resolves to the response data.
 * @throws {Error} If there is an error retrieving the statistics.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetPercentageCategoryAssetTransactionStatistic() {
  try {
    const response = await axiosPrivate.get(
      `/dashboard/percentage-category-asset-transaction-statistic`
    );
    const { data } = response;
    const formattedData = {
      labels: data.map((item) => item.category),
      datasets: [
        {
          label: 'Tỉ lệ: ',
          data: data.map((item) => item.percentage),
        },
      ],
    };
    return formattedData;
  } catch (error) {
    console.error('Không thể lấy dữ liệu thống kê đề xuất.', error);
    throw new Error('Không thể lấy dữ liệu thống kê đề xuất.');
  }
}

/**
 * Retrieves the percentage category proposal statistic from the server.
 * @returns {Promise<Object>} The formatted data containing labels and datasets.
 * @throws {Error} If unable to fetch the proposal statistic data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetPercentageCategoryProposalStatistic() {
  try {
    const response = await axiosPrivate.get(`/dashboard/percentage-category-proposal-statistic`);
    const { data } = response;
    const formattedData = {
      labels: data.map((item) => item.category),
      datasets: [
        {
          label: 'Tỉ lệ: ',
          data: data.map((item) => item.percentage),
        },
      ],
    };
    return formattedData;
  } catch (error) {
    console.error('Không thể lấy dữ liệu thống kê đề xuất.', error);
    throw new Error('Không thể lấy dữ liệu thống kê đề xuất.');
  }
}

/**
 * Retrieves the proposal statistics from the server.
 * @returns {Promise<Object>} The formatted proposal statistics data.
 * @throws {Error} If unable to fetch the proposal statistics.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetProposalStatistic() {
  try {
    const response = await axiosPrivate.get(
      `/dashboard/proposal-statistic`
    );
    const { data } = response;
    
    const formattedData = {
      labels: data.map((item) => fDate(item.date)),
      datasets: [
        {
          label: 'Số lượng trong ngày',
          data: data.map((item) => item.count),
        },
        {
          label: 'Số lượng tổng',
          data: data.map((item) => item.total),
        }
      ],
    };
    return formattedData;
  } catch (error) {
    console.error('Không thể lấy dữ liệu thống kê.', error);
    throw new Error('Không thể lấy dữ liệu thống kê.');
  }
}

/**
 * Retrieves asset transaction statistics.
 * @returns {Promise<Object>} The formatted data containing labels and datasets.
 * @throws {Error} If unable to fetch the statistics data.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetAssetTransactionStatistic() {
  try {
    const response = await axiosPrivate.get(
      `/dashboard/asset-transaction-statistic`
    );
    const { data } = response;
    
    const formattedData = {
      labels: data.map((item) => fDate(item.date)),
      datasets: [
        {
          label: 'Số lượng trong ngày',
          data: data.map((item) => item.count),
        },
        {
          label: 'Số lượng tổng',
          data: data.map((item) => item.total),
        }
      ],
    };
    return formattedData;
  } catch (error) {
    console.error('Không thể lấy dữ liệu thống kê.', error);
    throw new Error('Không thể lấy dữ liệu thống kê.');
  }
}

/**
 * Retrieves the statistics for the top creator with the most hired proposals.
 * @returns {Promise<Array>} A promise that resolves to an array of data representing the top creator statistics.
 * @throws {Error} If unable to fetch the top creator statistics.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetTopCreatorMostSellAsset() {
  try {
    const response = await axiosPrivate.get(`/dashboard/top-creator-asset-transaction-statistic`);
    return response.data;
  } catch (error) {
    console.error('Không thể lấy dữ liệu nhà sáng tạo bán được nhiều tài nguyên nhất.', error);
    return [];
  }
}

/**
 * Retrieves the statistics for the top creator with the most hired proposals.
 * @returns {Promise<Array>} A promise that resolves to an array of data representing the statistics.
 * @throws {Error} If unable to fetch the top creator statistics.
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetTopCreatorMostHiredProposal() {
  try {
    const response = await axiosPrivate.get(`/dashboard/top-creator-proposal-statistic`);
    return response.data;
  } catch (error) {
    console.error('Không thể lấy dữ liệu nhà sáng tạo được nhiều người thuê nhất.', error);
    return [];
  }
}
