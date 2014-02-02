function getHeader(name, headers) {
  for(o in headers) {
    if(headers[o].name === name)
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