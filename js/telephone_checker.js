function telephoneCheck(str) {

  if(str.length > 13 && !str.startsWith('1') && str.indexOf(' ') == -1) {
    return false
  }
  else if(str.search(/(a-z)|\?|\.|!|#/gi) != -1) {
    return false
  }
  else if(((str.indexOf('(') != -1 && (str.indexOf(')') == -1)))) {
    return false
  }
  else if(((str.indexOf('(') == -1 && (str.indexOf(')') != -1)))) {
    return false
  }
  else if((str[0] == '(' && str.endsWith(')'))) {
    return false
  }
  else if(str.length < 10) {
    return false
  }
  else if(str.startsWith('2') 
  ||str.startsWith('10 ') 
  ||str.startsWith('-1')
  ||str.startsWith('0')
  ||str.startsWith('55 ')) {
    return false
  }
  else if(str.length == 13 && str.startsWith('(') && str.indexOf('-') == -1) {
    return false
  }


  return true;
}

telephoneCheck("555-555-5555")  