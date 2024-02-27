import { axiosPrivate } from 'src/hooks/use-axios';

/**
 * This function to get the list of accounts
 * 
 * @returns A promise that contains the list of accounts
 * @example
 * getAccountsList().then((accounts) => {
 *  console.log(accounts);
 * }
 * @author ThongNT
 * @version 1.0.0
 */
export async function getAccountsList() {
  return axiosPrivate
    .get('/accounts')
    .then((response) => response.data)
}

/**
 * This function to get the list of deleted accounts
 * 
 * @returns A promise that contains the list of deleted accounts
 * @example
 * getDeletedAccountsList().then((accounts) => {
 * console.log(accounts);
 * }
 * @author ThongNT
 * @version 1.0.0
 */
export async function getDeletedAccountsList() {
    return axiosPrivate
        .get('/accounts/deleted')
        .then((response) => response.data)
    
}

export async function deleteAccount(id) {
  return axiosPrivate
    .delete(`/accounts/${id}`)
    .then((response) => response.data)
}