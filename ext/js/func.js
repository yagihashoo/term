function getHeader(name, headers) {
  for(o in headers) {
    if(headers[o].name === name)
      return headers[o];
  }
  return false;
}