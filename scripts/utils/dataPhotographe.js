import { urlApi } from "./urlApi.js";
/**
 * Download data from the specified URL.
 *
 * @async
 * @function data
 * @param {string} urlApi - The URL to download from.
 * @return {Promise<string>} The data from the URL.
 */
export default async function data() {
    const response = await fetch(urlApi);
    const promise = await response.json();
    return promise;
}
