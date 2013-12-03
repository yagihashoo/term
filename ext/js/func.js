function isPrime(n, k) {
	if(typeof k === "undefined")
		k = 50;
	
	with(Math) {
		n = abs(n);
		
		if(n == 2 || n < 2 || n & 1 == 0)
			return false;

		var d = (n - 1) >> 1;
		while(d & 1 == 0)
			d = d >> 1;

		for(var i = 0; i < k; i++) {
			var a = (random() * (n - 1)) | 0;
			var t = d;
			// var y = pow(a, t) % n;
			var y = myPow(a, t, n);

			while(t != n - 1 && y != 1 && y != n - 1) {
				// y = pow(y, 2) % n;
				y = myPow(y, 2, n);
				t = t << 1;
			}
			if(y != n - 1 && t & 1 == 0)
				return false;
		}
		return true;
	}

	function myPow(a, b, c) {
		console.log("a " + a);
		console.log("b " + b);
		var m = Math.pow(a, b);
		console.log("m " + m);
		return m % c;
	}
}

console.log(isPrime(8911));
