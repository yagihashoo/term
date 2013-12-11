String.prototype.repeat = function(n) {
  for(var str = "", i = 0; i < n; i++)
    str += this;
  return str;
};

/*
 * http://rosettacode.org/wiki/Miller-Rabin_primality_test#JavaScript
 * からコピペ
 * 2**53くらいまではいけるらしい
 * だいたい15桁くらいまでは大丈夫？
 */
function modProd(a, b, n) {
  if (b == 0)
    return 0;
  if (b == 1)
    return a % n;
  return (modProd(a, (b - b % 10) / 10, n) * 10 + (b % 10) * a) % n;
}

function modPow(a, b, n) {
  if (b == 0)
    return 1;
  if (b == 1)
    return a % n;
  if (b % 2 == 0) {
    var c = modPow(a, b / 2, n);
    return modProd(c, c, n);
  }
  return modProd(a, modPow(a, b - 1, n), n);
}

function isPrime(n) {
  if (n == 2 || n == 3 || n == 5)
    return true;
  if (n % 2 == 0 || n % 3 == 0 || n % 5 == 0)
    return false;
  if (n < 25)
    return true;
  for (var a = [2, 3, 5, 7, 11, 13, 17, 19], b = n - 1, d, t, i, x; b % 2 == 0; b /= 2);
  for ( i = 0; i < a.length; i++) {
    x = modPow(a[i], b, n);
    if (x == 1 || x == n - 1)
      continue;
    for ( t = true, d = b; t && d < n - 1; d *= 2) {
      x = modProd(x, x, n);
      if (x == n - 1)
        t = false;
    }
    if (t)
      return false;
  }
  return true;
}

function getPrime(l) {
	if(typeof l === "undefined")
		l = 9;

  with(Math) {
    l = parseInt("1" + "0".repeat(l));
    var n = 0;
    while(!isPrime(n) && n.toString().length != 8) {
      n = floor(random()*l);
    }
    return n;
  }
}

