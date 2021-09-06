function checkCashRegister(price, cash, cid) {
  var ret;
  var troco = cash - price
  var retArr = []
  var currency = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100],
  ]

  function checkDispVal(value) {
    
    let auxArr = []
    let theBigger = 0
    let theBiggerN = ''

    currency.forEach(c => {

      if(c[1] <= value) {
        cid.forEach(i => {
          if(c[0] == i[0]) {
            if(i[1] > 0) {
              auxArr.push(c)
            }
          }
        })
      }

    })
    console.log(auxArr)
    if(!checkQtdisp(auxArr, value)) {
      return null
    }

    auxArr.forEach(i => {
      if(i[1] > theBigger) {
        theBiggerN = i[0]
      }

      theBigger = i[1]

    })


    return theBiggerN
  }

  function checkQtdisp(auxArr, value) {
    let aux = 0
    cid.forEach(c => {
      auxArr.forEach(a => {
        if(c[0] == a[0]) {
          aux += c[1]
        }
      })
    })
    return aux < value ? false : true
  }

  function checkQtd(name) {
    let QtdByN;

    cid.forEach(c => {
      if(c[0] == name) {
        QtdByN = c[1]
      }
    })

    return QtdByN

  }

  function setNewCid(name, value) {
    cid.forEach(c => {
      if(c[0] == name) {
        c[1] -= value
      }
    })

  }

  function setValues(name, value, valRef) {
    let totalR = 0;
    let qtdDisp = 0
    qtdDisp = checkQtd(name)
    while(value >= valRef && qtdDisp > 0) {
      value -= valRef
      qtdDisp -= valRef
      totalR += valRef
      if(value < 0.04) {
        value = roundVal(value)
      }
    }
    setNewCid(name, totalR)

    return {val: value, qtdCoins: [name, totalR]}

  }

  function roundVal(value) {
    let val = value.toString()
    let auxVal
    let num = val[4]
    let auxStrN

    if(num == 9) {
      auxVal = ((Number(val[3]) + 1).toString())
      
      auxStrN = val.replace(val[3], auxVal)

      return Number(auxStrN.slice(0, 4))

    }
    else {
      return value
    }

  }

  function calcVal(name, value) { 
    let valRef = 0
    switch(name) {
      case 'PENNY':
        valRef = 0.01
        value = roundVal(value)
        return setValues(name, value, valRef)        
      case 'NICKEL':
        valRef = 0.05
        return setValues(name, value, valRef)
      case 'DIME':
        valRef = 0.1
        return setValues(name, value, valRef)
      case 'QUARTER':
        valRef = 0.25
        return setValues(name, value, valRef)
      case 'ONE':
        valRef = 1
        return setValues(name, value, valRef)
      case 'FIVE':
        valRef = 5
        return setValues(name, value, valRef)
      case 'TEN':
        valRef = 10
        return setValues(name, value, valRef)
      case 'TWENTY':
        valRef = 20
        return setValues(name, value, valRef)
      case 'ONE HUNDRED':
        valRef = 100
        return setValues(name, value, valRef)
    }

    return []
  }

  function incrementAgain(objCal) {

    var valC = 0

    valC = objCal.val
    retArr.push(objCal.qtdCoins)
    objCal = calcVal(checkDispVal(valC), valC)

    if(valC > 0) {
      incrementAgain(objCal)
    }

  }

  function checkClosed(val) {
    let ret;
    cid.forEach(c => {
      if(c[1] == val) {
        ret = true
      }
    })
    return ret
  }

  if(checkClosed(troco)) {
        return {
        status: 'CLOSED',
        change: cid
      }
  }

  if(!ret) {    

    let iniDispVal = checkDispVal(troco)

    if(!iniDispVal) {
      return {
        status: "INSUFFICIENT_FUNDS",
        change: []
      }
    }
    
    var objCal = calcVal(iniDispVal, troco)

    if(objCal.val > 0) {     
      incrementAgain(objCal)

      ret = {
        status: 'OPEN',
        change: retArr
      }
      
    }
    else {
      retArr.push(objCal.qtdCoins)

      ret = {
        status: 'OPEN',
        change: retArr
      }
    }    

  }

  return ret;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])