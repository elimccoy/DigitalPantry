import CONFIG from '../config';
const API_TOKEN = CONFIG.barcodeSpider.api_token;

/**
 *
 * @typedef BarcodeSpiderResponse
 * @type {object}
 * @property {number} code the HTTP status code
 * @property {string} status the name of the status code
 * @property {string} message a description of the error
 */

/**
 * Represents the full response object from the fetch.
 * Documentation can be found here: https://devapi.barcodespider.com/documentation#response
 * @typedef UpcFetchResponse
 * @type {object}
 * @property {BarcodeSpiderResponse} item_response The response of the request with code, status, and message.
 * @property {object?} item_attributes data about the upc item fetched.
 * @property {array<object>=} Stores Array of stores selling the item.
 */

/**
 * Represents the full response object from the fetch.
 * No proper documentation (╯°□°)╯︵ ┻━┻
 * @typedef UpcSearchResponse
 * @type {object}
 * @property {BarcodeSpiderResponse} item_response The response of the request with code, status, and message.
 * @property {UpcFetchResponse[]} Data Array of products found
 */

/**
 * Fetchs the item data for a given upc using the BarcodeSpider api
 * Response format can be seen here: https://devapi.barcodespider.com/documentation#response
 * @param {string} upc 12 digit upc code passed in as a string to keep the leading 0s
 * @returns {promise<UpcFetchResponse>}  A promise object resulting in the response from the fetch request
 */
export async function fetch_upc(upc) {
  const res = await fetch(`https://api.barcodespider.com/v1/lookup?token=${API_TOKEN}&upc=${upc}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw await res.json();
  }
}

/**
 * Searches for items that relate to the query
 * Response format can be seen here: https://devapi.barcodespider.com/documentation#response
 * @param {string} query text to search for
 * @returns {promise<UpcSearchResponse>}  A promise object resulting in the response from the fetch request
 */
export async function search(query) {
  const res = await fetch(`https://api.barcodespider.com/v1/search?token=${API_TOKEN}&s=${query}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw await res.json();
  }
}
