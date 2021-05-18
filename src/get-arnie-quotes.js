const { httpGet } = require('./mock-http-interface');

/**
 * formatArnieResponse - returns formatted response, dependent on status
 * @param {Number} status 
 * @param {String} message
 * @returns {Object}
 */
function formatArnieResponse({ status, message }) {
  return status === 200 ? { "Arnie Quote": message } : { FAILURE: message }
}

/**
 * requestArnieQuote - returns arnie request data
 * @param {String} url 
 * @returns {Object}
 */
async function requestArnieQuote(url) {
  const { status, body } = await httpGet(url);
  const { message } = JSON.parse(body);

  return { status, message }
}

/**
 * resolveArnieQuote - requests and returns single formatted arnie quote data
 * @param {String} url 
 * @returns {Object}
 */
async function resolveArnieQuote(url) {
  try {
    const response = await requestArnieQuote(url);
    return formatArnieResponse(response);
  } catch (error) {
    return formatArnieResponse(error);
  }
}

/**
 * getArnieQuotes - returns array of arnie quote data
 * @param {Array<String>} urls 
 * @returns {Array<Object>}
 */
const getArnieQuotes = async (urls) => {
  const arnieQuotesResults = urls.map(resolveArnieQuote);
  return Promise.all(arnieQuotesResults);
};

module.exports = {
  getArnieQuotes,
};
