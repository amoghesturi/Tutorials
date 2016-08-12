exports.rgbToHex = function(red, green, blue) {

  var redHex = red.toString(16); // number.toString(radix) gives binary if radix = 2,
  // octal if 8 and hexadecimal value if 16. The number has to be an integer between 2 and 36
  var greenHex = green.toString(16);
  var blueHex = blue.toString(16);

  return pad(redHex) + pad(greenHex) + pad(blueHex);
}

/**
*
*/
function pad(hex) {
  if (hex.length === 1)
    return '0' + hex;
  else
   return hex;
}


exports.hexToRgb = function(hex) {
  var red   = parseInt(hex.substring(0, 2), 16);
  var green = parseInt(hex.substring(2, 4), 16);
  var blue  = parseInt(hex.substring(4, 6), 16);

  return [red, green, blue];
}
