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
using namespace std;
using namespace boost;

template <typename T>
string toString(const T& t)
{
  ostringstream ss;
  ss << t;
  return ss.str();
}

mp::int1024_t toInt(string n)
{
  string input(n);
  mp::int1024_t output;
  istringstream sin(input);
  sin >> output;
  return output;
}

mp::int1024_t myPow(mp::int1024_t m, mp::int1024_t k)
{
  mp::int1024_t rslt = m;
  for(mp::int1024_t i = 0, c = k -1; i < c; i++)
    rslt *= m;
  return rslt;
}

bool isPrime(mp::int1024_t n)
{
  boost::random::mt19937 gen;
  return mp::miller_rabin_test(n, 50, gen);
}

mp::int1024_t getRand(int l)
{
  stringstream ss;
  string num = "";

  std::size_t seed = time(NULL);
  boost::random::mt19937 gen(time(NULL));
  boost::random::uniform_int_distribution<> dist(0, 9);

  for(int i = 0; i < l; i++) {
    seed = time(NULL);
    unsigned int r = dist(gen);
    while(r == 0 && i == 0)
      r = dist(gen);
    ss << r;
    num += ss.str();

    // gen.seed(seed);
  }
  return toInt(num);
}

string getPrime()
{
  while(true) {
    mp::int1024_t num = getRand(5);
    if(isPrime(num))
      return toString(num);
  }
}

int main()
{
  // string n = getPrime();
  mp::int1024_t r = getRand(5);
  cout << toString(r);
  return 0;
}
