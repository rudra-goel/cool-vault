export { encryptString, decryptString };


function stringToBinary(str) {
  // Initialize an empty array to store binary representations
  var binaryArray = [];

  // Loop through each character in the string
  for (var i = 0; i < str.length; i++) {
    // Get the Unicode value of the character
    var unicodeValue = str.charCodeAt(i);
    
    // Convert the Unicode value to binary and pad with zeros to ensure it's 8 bits long
    var binaryRepresentation = unicodeValue.toString(2).padStart(8, '0');
    
    // Push the binary representation to the array
    binaryArray.push(binaryRepresentation);
  }

  // Join the binary representations into a single string and return
  return binaryArray;
}

/**
 * 
 * @param { Array } binaryArr An array of Strings where each element is the binary representation of a character
 */
function binaryToString(binaryArr) {
  let textChars = []

  for(let i = 0; i < binaryArr.length; i++) {
    textChars.push(String.fromCharCode(parseInt(binaryArr[i], 2)))
  }

  return textChars.join('')
}




/**
 * This function, in the context of my encryption algorithm is meant to take two parameters
 * 
 * The second parameter is meant to be a String of the name of the password record
 * @param { String } stringToEncrypt the String to encrypt
 * @param { String } preSeedString the initial string that will later be converted to the LFSR seed
 */
 const encryptString = (stringToEncrypt, preSeedString) => {
  // First generate the LFSR Seed via the preSeedString
  const seed = generateSeed(preSeedString)

  console.log(seed)

  //next use the seed generated in the LFSR to generate the secret (Private Key)
  const privateKey = generateKeyTwoTaps(8, seed, 3, 7)

  console.log(privateKey)

  //now do a bitwise XOR for every character against the Private Key 
  let encryptedString = []

  let unEncryptedArr = stringToBinary(stringToEncrypt)

  unEncryptedArr.map((element, index) => {
    encryptedString.push(binaryXOR(element, privateKey))
  })

  

  return binaryToString(encryptedString)
}

const decryptString = (stringToDecrypt, preSeedString) => {
  return encryptString(stringToDecrypt, preSeedString)
}



/**
 * This function is meant to generate the private key in the encryption algorithm via the LFSR with a XOR feedback function on taps arg3 and arg4
 * 
 * @param {int} keyLength the length that the key should be, i.e. the number of shifts during the LFSR sequence
 * @param {String} seed the binary seed that first starts the LSFR
 * @param {int} tapIndexOne first tap
 * @param {int} tapIndexTwo second tap
 */
const generateKeyTwoTaps = (keyLength, seed, tapIndexOne, tapIndexTwo) => {
  
  let key = []

  let currentRegister = seed

  key.push(binaryXOR(currentRegister[tapIndexOne],currentRegister[tapIndexTwo]))
  
  for(let i = 0; i < keyLength-1; i++) {
    currentRegister = shiftRegisterByOneToRight(currentRegister, key[i])
    
    key.push(binaryXOR(currentRegister[tapIndexOne],currentRegister[tapIndexTwo]))
  }

  return key.join('')
}

const shiftRegisterByOneToRight = (arrToShift, prependedElement) => {

  let newArr = [prependedElement]

  for(let i = 0; i < arrToShift.length - 1; i++) {
    newArr.push(arrToShift[i])
  }

  return newArr
}


/**
 * This function generates a seed from the preSeedString to be used as the LFSR captain
 * 
 * @param { String } preSeedString the initial string that will be converted and used as the seed for the LFSR
 */
 const generateSeed = (preSeedString) => {
  //get the 8-bit binary representation of each character within the initial seed
  const binaryArr = stringToBinary(preSeedString)

  //XOR every character to obtain the seed
  let binSeed = ""

  //two cases
  //1 - name is only length 1
  
  if(binaryArr.length == 1) {
    binSeed = binaryArr[0]
    return binSeed
  }

  binSeed = binaryArr[0]

  for(let i = 1; i < binaryArr.length; i++) {
    binSeed = binaryXOR(binSeed, binaryArr[i])
  }

  return binSeed

  
}


/**
 * This function computes the logical XOR on two characters via their binary representation in 8-bit unicode
 * 
 * @param { String } binaryStr1 string of length 8 for the binary representation of a character
 * @param { String } binaryStr2 string of length 8 for the binary representation of a character
 */
const binaryXOR = (binaryStr1, binaryStr2) => {

  const arr1 = binaryStr1.split('')
  const arr2 = binaryStr2.split('')

  let answer = [];

  for (let i = 0; i < arr1.length; i++) {
    const bool1 = arr1[i] == "1" ? true : false
    const bool2 = arr2[i] == "1" ? true : false

    answer.push( (( bool1 && !bool2 ) || ( !bool1 && bool2 )) ? "1" : "0")
    
  }

  return answer.join('')

}

