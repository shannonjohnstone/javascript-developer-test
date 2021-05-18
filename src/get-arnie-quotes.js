const { httpGet } = require('./mock-http-interface');

async function getQuote(url) {
  try {
    const { status, body } = await httpGet(url);
    const message = JSON.parse(body).message
    return status === 200 ? { "Arnie Quote": message } : { FAILURE: message }
  } catch (error) {
    return { FAILURE: error.message }
  }
}

const getArnieQuotes = async (urls) => {
  const response = urls.map(getQuote)
  return Promise.all(response)
};

module.exports = {
  getArnieQuotes,
};
