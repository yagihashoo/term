chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  // console.log(details);
}, {urls:["<all_urls>"]}
,["requestHeaders"]);

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  var headers = details.responseHeaders;
  if(getHeader("Secure-Session", headers)
     && getHeader("Secure-Session", headers).value === "1") {
    var useSecureSession = true;
    var 
  } else {
    return;
  }
    
  console.log(useSecureSession);
}, {urls:["<all_urls>"]}
,["responseHeaders"]);