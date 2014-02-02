#include <string>
#include <iostream>
#include <stdint.h>
#include <stdlib.h>
#include <sstream>
#include <ctime>
#include <cstdlib>
#include <boost/multiprecision/cpp_int.hpp>
#include <boost/multiprecision/miller_rabin.hpp>
#include <boost/random/mersenne_twister.hpp>
#include <boost/random.hpp>

namespace mp = boost::multiprecision;
using namespace boost;

template <typename T>
std::string toString(const T& t)
{
  std::stringstream ss;
  ss << t;
  return ss.str();
}

mp::int1024_t toInt(std::string n)
{
  std::string input(n);
  mp::int1024_t output;
  std::stringstream sin(input);
  sin >> output;
  return output;
}

extern mp::int1024_t modPow(mp::int1024_t M, mp::int1024_t K, mp::int1024_t P)
{
  mp::int1024_t rslt = 1;
  while(K > 0) {
    if((K & 1) == 1) rslt = (rslt * M) % P;
    K >>= 1;
    M = (M * M) % P;
  }
  return rslt;
}

bool isPrime(mp::int1024_t n)
{
  boost::random::mt19937 gen;
  return mp::miller_rabin_test(n, 50, gen);
}

mp::int1024_t getRand(int l)
{
  std::stringstream ss;
  std::string num = "";
  for(int i = 0; i < l; i++) {
    unsigned int r = rand() % 10;
    while(r == 0 && i == 0)
      r = rand() % 10;
    ss << r;
  }
  return toInt(ss.str());
}

extern std::string getPrime()
{
  srand(time(NULL));
  while(true) {
    mp::int1024_t num = getRand(20);
    if(isPrime(num))
      return toString(num);
  }
}

extern std::string getRandForDH()
{
  return toString(getRand(10));
}

// G^A mod P あるいは G^B mod Pを生成するための関数
extern std::string getMsg(std::string R, std::string P)
{
  return toString(modPow(2, toInt(R), toInt(P)));
}

// 受け取ったメッセージ^自分で生成した乱数 mod Pで鍵を得る
extern std::string makeKey(std::string msg, std::string r, std::string p)
{
  mp::int1024_t MSG = toInt(msg), R = toInt(r), P = toInt(p);
  return toString(modPow(MSG, R, P));
}

extern std::string modPowLink(std::string m, std::string k, std::string p)
{
  mp::int1024_t M = toInt(m), K = toInt(k), P = toInt(p);
  return toString(modPow(M, K, P));
}

int main()
{
  srand(time(NULL));
  std::string rnd = getRandForDH();
  std::string prm = getPrime();
  std::string msg = getMsg(rnd, prm);

  std::cout << prm;
  std::cout << ":";
  std::cout << msg;
  std::cout << ",";
  std::cout << rnd;
  return 0;
}
