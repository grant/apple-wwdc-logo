$(function () {

  var numCols = 40;
  var numRows = 20;

  // Colors from left to right
  var rainbow = [
    [87, 247, 70],
    [0, 215, 166],
    [0, 175, 223],
    [2, 136, 252],
    [101, 84, 247],
    [190, 50, 182],
    [254, 48, 95],
    [254, 95, 77],
    [254, 136, 59]
  ];

  // The points that are white
  var whitePoints = [
    [0.5, 0.5]
  ];

  var whitePointRadius = 0.1;

  // Creates the background in the .background div
  function createBackground () {
    $background = $('.background');
    $newBackground = $('<div/>');

    // Create white space start points
    var whiteSpaceRange = [];
    for (var xPos = 0; xPos < numCols; ++xPos) {

    }

    // Create and style blocks
    for (var y = 0; y < numRows; ++y) {
      for (var x = 0; x < numCols; ++x) {
        // Calculate properties

        // add color distributed uniformly along x axis
        var colorIndex = (x/numCols) * (rainbow.length - 1) + 0.001;
        var color = colorBlend(colorIndex);
        var gridWidth = (100/numCols);
        var gridWidthString = gridWidth + '%';
        var blockWidth = 90;
        var blockWidthString = blockWidth + '%';
        var marginWidth = (100 - blockWidth)/2;
        var marginWidthString = marginWidth + '%';
        
        // Create elements
        var $blockArea = $('<div>').addClass('blockArea');
        $blockArea.css({
          width: gridWidthString,
          paddingBottom: gridWidthString
        });

        var $block = $('<div>').addClass('block');

        $block.css({
          backgroundColor: getRGBString(color),
          width: blockWidthString,
          marginLeft: marginWidthString,
          marginTop: marginWidthString,
          marginBottom: marginWidthString
        });

        $blockArea.html($block);
        $newBackground.append($blockArea);
      }
    }

    $background.html($newBackground.html());
  }

  // Gets a blend of two colors based off of the rainbow
  // e.g. colorBlend(1.4) returns a weighted color mix between rainbow[1] and rainbow[2]
  function colorBlend (colorIndex) {
    var weight1 = colorIndex - Math.floor(colorIndex);
    var weight2 = 1 - weight1;
    var color1 = rainbow[Math.ceil(colorIndex)];
    var color2 = rainbow[Math.floor(colorIndex)];
    var newColor = color1.map(function(_, i) {
      return Math.round((color1[i] * weight1) + (color2[i] * weight2));
    });
    return newColor;
  }

  // Gets the color as a string in 'rgb(r,g,b)' format
  function getRGBString (rgb) {
    return 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
  }

  createBackground();
});