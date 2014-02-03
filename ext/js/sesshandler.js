chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  if (details.type === "main_frame") {
    var key = "";
    chrome.storage.local.get("key", function(result) {
      if (result.key !== undefined)
        key = result.key;
    });

    var cookie = "";
    for (o in details.requestHeaders) {
      if (details.requestHeaders[o].name === "Cookie")
        cookie = details.requestHeaders[o].value;
    }

    HMAC_SHA256_init(key);
    HMAC_SHA256_write(cookie);
    var array_hash = HMAC_SHA256_finalize();

    var str_hash = "";
    for (var i = 0; i < array_hash.length; i++) {
      // str_hash += String.fromCharCode(array_hash[i]);
      str_hash += ("00" + array_hash[i].toString(16)).slice(-2);
    }
    var signature = str_hash

    details.requestHeaders.push({
      name : "Secure-Session-Signature",
      value : signature
    });

    return {
      requestHeaders : details.requestHeaders
    };
  }
}, {
  urls : ["<all_urls>"],
  types : ["main_frame"]
}, ["requestHeaders", "blocking"]);

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  var headers = details.responseHeaders;
  if (getHeader("Secure-Session", headers) && getHeader("Secure-Session", headers).value === "1") {
    var isKeySet = true;
    chrome.storage.local.get("key", function(result) {
      if ( typeof result.key === "undefined") {
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
      }
    });
  } else if (getHeader("Secure-Session", headers).value == "0") {
    chrome.storage.local.remove("key", function() {
      if (chrome.extension.lastError !== undefined) {
        console.log("failed to remove key.");
      } else {
        console.log("removed key.");
      }
    });
  } else {
    return;
  }

}, {
  urls : ["<all_urls>"]
}, ["responseHeaders"]);
