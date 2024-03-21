import { axiosPrivate } from 'src/hooks/use-axios';

/**
 * This function to get the list of categories
 * 
 * @returns A promise that contains the list of categories
 * @example
 * getCategoriesList().then((categories) => {
 *  console.log(categories);
 * }
 * @author ThongNT
 * @version 1.0.0
 */
export async function getCategoriesList() {
  return axiosPrivate
    .get('/categories')
    .then((response) => response.data)
}

/**
 * This function to delete a category by id
 * 
 * @param {*} id - The id of the category to be deleted
 * @returns A promise that contains the result of the deletion
 * @example
 * deleteCategory('category1').then((result) => {
 * console.log(result)
 * }
 * @author ThongNT
 * @version 1.0.0
 */
export async function deleteCategory(id) {
  return axiosPrivate
    .delete(`/categories/${id}`)
    .then((response) => response.data)
}

/**
 * This function to update a category name by id
 * 
 * @param {*} id - The id of the category to be updated
 * @param {*} categoryName - The new category name
 * @returns A promise that contains the result of the update
 * @example
 * updateCategory('category1', 'New Category Name').then((result) => {
 * console.log(result)
 * }
 * @author ThongNT
 * @version 1.0.0
 */
export async function updateCategory(id, categoryName) {
  return axiosPrivate
    .put(`/categories/${id}`, { categoryName })
    .then((response) => response.data)
}

/**
 * This function to create a new category
 * 
 * @param {*} categoryName - The new category name
 * @returns A promise that contains the result of the creation
 * @example
 * createCategory('New Category Name').then((result) => {
 * console.log(result)
 * }
 * @author ThongNT
 * @version 1.0.0
 */
export async function createCategory(categoryName) {
    return axiosPrivate
        .post(`/categories`, { categoryName })
        .then((response) => response.data)
    }