function convertToRoman(num) {

   let strNum = num.toString()
   let RomanNum = ''

   let romanUnits = (num) => {

      switch(num) {
        case 1:
        case 2:
        case 3:
          return 'I'.repeat(num)
        case 4:
          return 'IV'
        case 5:
          return 'V'
        case 6:
        case 7:
        case 8:
          return 'V' + 'I'.repeat(num - 5) 
        case 9:
          return 'IX'
        default:
          return '';
      }

   }

   let romanTens = (num) => {
      let auxStr = ''
      if(num < 40) {
        let numArr = (num.toString()).split('')
        auxStr += 'L'.repeat(Number(numArr[0])) 
        auxStr += romanUnits(Number(numArr[1]))
      }
      else if(num >= 40 && num < 50) {
        let numArr = (num.toString()).split('')
        auxStr += 'XL'
        auxStr += romanUnits(Number(numArr[1]))
      }
      else if(num < 90){
        auxStr += 'L'
        let proxNum = num - 50
        if(proxNum > 10) {
          let numArr = (proxNum.toString()).split('')
          auxStr += 'X'.repeat(Number(numArr[0])) 
          auxStr += romanUnits(Number(numArr[1]))
        }
        else {
          auxStr += romanUnits(proxNum)
        }
      }
      else {
        auxStr += 'XC'
        let proxNum = num - 90
        if(proxNum > 10) {
          let numArr = (proxNum.toString()).split('')
          auxStr += 'X'.repeat(Number(numArr[0])) 
          auxStr += romanUnits(Number(numArr[1]))
        }
        else {
          auxStr += romanUnits(proxNum)
        }
      }
      return auxStr
   }

   let romanHundreds = (num) => {
      if(num < 500) {
        let numArr = (num.toString()).split('')
        let auxN = num - (Number(numArr[0] * 100))
        if(num >= 400) {
            RomanNum += 'CD' 
            RomanNum += romanTens(Number(auxN))      
        }
        else {
          RomanNum += 'C'.repeat(Number(numArr[0])) 
          RomanNum += romanTens(Number(auxN))      
        }
      }
      else if(num < 900){
        let numArr = (num.toString()).split('')
        let auxN = num - (Number(numArr[0] * 100))
        RomanNum += 'D'
        let subN = Number(numArr[0]) - 5
        RomanNum += 'C'.repeat(subN)
        RomanNum += romanTens(Number(auxN))
      }
      else {
        let numArr = (num.toString()).split('')
        let auxN = num - (Number(numArr[0] * 100))
        RomanNum += 'CM'
        RomanNum += romanTens(Number(auxN))
      }

   }

   let romanThousands = (num) => {

      let numArr = strNum.split('')
      if(num >= 1000) {
        let auxN = num - (Number(numArr[0] * 1000))
        RomanNum += 'M'.repeat(Number(numArr[0]))
        if(auxN >= 100) {
          romanHundreds(auxN)
        } 
        else if(auxN >= 10) {
          RomanNum += romanTens(auxN)
        }
        else {
          RomanNum += romanUnits(auxN)
        }
      } 

   }

   switch(strNum.length) {

    case 1:
      RomanNum += romanUnits(num)
      break;
    case 2:
      RomanNum += romanTens(num)
      break;
    case 3:
      romanHundreds(num)
      break;
    case 4:
      romanThousands(num)
      break;

   }

   return RomanNum;
}

console.log(convertToRoman(501))