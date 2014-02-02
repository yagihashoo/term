function getHeader(name, headers) {
  for (o in headers) {
    if (headers[o].name === name)
      return headers[o];
  }
  return false;
}

// G^(A|B) mod Pを生成する
var getMsg = Module.getMsg;

// DH用の適当な乱数を得る
var getRandForDH = Module.getRandForDH;

// 大きめの素数を得る
var getPrime = Module.getPrime;

// 受け取ったMsg ^ 自分で生成した乱数 mod Pで鍵を得る
var makeKey = Module.makeKey;

function EncodeHTMLForm(data) {
  var params = [];
  for (var name in data ) {
    var value = data[name];
    var param = encodeURIComponent(name).replace(/%20/g, '+') + '=' + encodeURIComponent(value).replace(/%20/g, '+');

    params.push(param);
  }
  return params.join('&');
}

function get(url) {
  $.ajaxSetup({
    async : false
  });
  var hoge = 1;
  var response = "";
  $.get(url, function(data) {
    response = data;
  });
  return response;
}

function post(url, data) {
  $.ajaxSetup({
    async : false
  });
  var response;
  $.post(url, data, function(data) {
    response = data;
  });
  return response;
}
