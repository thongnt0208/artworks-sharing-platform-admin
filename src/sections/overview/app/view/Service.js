import { axiosPrivate } from 'src/hooks/use-axios';

/**
 *
 * Retrieves the wallet history data for a given account ID.
 *
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
 *
 * @returns A promise that resolves to an array of TransactionHistoryProps objects.
 * @param AnhDH
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
