chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  // console.log(details);
}, {
  urls : ["<all_urls>"]
}, ["requestHeaders"]);

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  var headers = details.responseHeaders;
  if (getHeader("Secure-Session", headers) && getHeader("Secure-Session", headers).value === "1") {
    var useSecureSession = true;
    var dhke = getHeader("Secure-Session-Ex", headers).value;

    var response = get(dhke);
    response = response.split(":");
    var P = response[0];
    var msg = response[1];
    var R = getRandForDH();
    var key = makeKey(msg, R, P);
    chrome.storage.local.set({
      "key" : key
    });

    var GBmodP = getMsg(R, P);
    var data = {
      "GBmodP" : GBmodP
    };
    var response = post(dhke, data);
    // console.log(response);
    chrome.storage.local.get("key", function(result) {
      console.log(result);
    });
  } else {
    return;
  }

}, {
  urls : ["<all_urls>"]
}, ["responseHeaders"]);
