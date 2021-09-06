function rot13(str) {

  let strArr = str.split(' ')
  let alfStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let newStr = ''
  let newIdx;
  let pos;

  strArr.forEach(s => {

    for(let i = 0; i < s.length; i++) {

      let idxStr = alfStr.indexOf(s[i])
      pos = ((alfStr.length - 1) - idxStr) 
      if(idxStr != -1) {
        if(pos < 13) {
          newIdx = (13 - pos) - 1
          newStr += alfStr.charAt(newIdx) 
        }
        else {
          newIdx = idxStr + 13
          newStr += alfStr.charAt(newIdx)
        }
      }
      else {
        newStr += s[i]
      } 

    }

    newStr += ' '

  })

  return newStr;
}

console.log(rot13("SERR YBIR?"))