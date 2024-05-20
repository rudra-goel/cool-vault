
export function stringToBinary(str) {
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
  return binaryArray.join(' ');
}


console.log(stringToBinary("6565Southwaco!"))


