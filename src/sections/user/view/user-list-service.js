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
 * @version 2.0.0
 */
export async function getAccountsList(offset = 1, pageSize = 20) {
  return axiosPrivate
    .get(`/accounts?PageNumber=${offset}&PageSize=${pageSize}`)
    .then((response) => response.data);
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

/**
 * This function to delete an account by id
 * 
 * @param {*} id - The id of the account to be deleted
 * @returns A promise that contains the result of the deletion
 * @example
 * deleteAccount('user1').then((result) => {
 * console.log(result)
 * }
 * @author ThongNT
 * @version 1.0.0
 */
export async function deleteAccount(id) {
  return axiosPrivate
    .delete(`/accounts/${id}`)
    .then((response) => response.data)
}