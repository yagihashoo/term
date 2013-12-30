chrome.webRequest.onBeforeSendHeaders.addListener(function() {
  ;
}, {urls:["<all_urls>"]}
,["requestHeader"]);

chrome.webRequest.onHeadersReceived.addListener(function() {
  ;
}, {urls:["<all_urls>"]}
,["requestHeader"]);

