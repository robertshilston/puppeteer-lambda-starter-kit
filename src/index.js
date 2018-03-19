const setup = require('./starter-kit/setup');

module.exports.handler = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();

  let response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
  };

  try {
    let pageurl = 'https://wikipedia.org';
    if (event.queryStringParameters && event.queryStringParameters.url) {
      pageurl = event.queryStringParameters.url;
    }

    const result = await exports.getFinishedPage(browser, pageurl);
    response.body = JSON.stringify(result);
    callback(null, response);
  } catch (err) {
    response.body = JSON.stringify(err);
    response.statusCode = 500;
    callback(err, response);
  }
};


exports.getFinishedPage = async (browser, pageurl) => {
  let response = {};
  const page = await browser.newPage();

  // Load the target web page.
  await page.goto(pageurl,
    {waitUntil: ['domcontentloaded', 'networkidle0']}
  );

  response.pageTitle = await page.title();
  console.log(response.pageTitle);
  return response;
};

exports.getScreenshotFromURL = async (browser) => {
  let screenshotoutput = '';
  const page = await browser.newPage();

  // Load the target web page.
  await page.goto('https://wikipedia.org',
    {waitUntil: ['domcontentloaded', 'networkidle0']}
  );

  let screenshotoptions = {};
  let tmp = require('tmp');
  let tmpobj = tmp.fileSync(
    {keep: true,
    mode: 0o600,
    prefix: 'screenshot-',
    postfix: '.png'});
  screenshotoptions.path = tmpobj.name;

  await page.screenshot(screenshotoptions)
    .then((result) => {
      screenshotoutput = screenshotoptions.path;
    })
    .catch((err) => {
      screenshotoutput = 'Error: ' + err;
      console.error(err);
    });

  return screenshotoutput;
};
