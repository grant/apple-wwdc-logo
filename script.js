$(function () {

  var numCols = 50;
  var numRows = 30;

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

  // Text area (make sure this is the same as the css)
  var textArea = {
    x: [0.3, 0.7],
    y: [0.4, 0.6]
  };

  // Creates the background in the .background div
  function createBackground () {
    $background = $('.background');
    $newBackground = $('<div/>');

    // Create white space start points
    var whiteSpaceRange = [];
    var whiteSpacePaddingRange = 0.15; // 0 to 1
    var sizeGradientRange = 0.15; // 0 to 1
    var sizeGradientBlocks = Math.floor(numRows * sizeGradientRange); // num blocks for the gradient
    for (var xPos = 0; xPos < numCols; ++xPos) {
      var topYPercent = Math.random() * whiteSpacePaddingRange;
      var bottomYPercent = 1 - Math.random() * whiteSpacePaddingRange;

      // taper out the edges
      var xPercent = xPos/(numCols - 1);
      var extraWeight = 1 - Math.cos(Math.abs(xPercent - 0.5));
      topYPercent = topYPercent + extraWeight;
      bottomYPercent = bottomYPercent - extraWeight;

      var topY = Math.floor(numRows * topYPercent);
      var bottomY = Math.floor(numRows * bottomYPercent);
      whiteSpaceRange[xPos] = [topY, bottomY];
    }

    function getBlockWidth (x, y) {
      var range = whiteSpaceRange[x];
      var top = range[0];
      var bot = range[1];
      var xPercent = x/(numCols - 1);
      var yPercent = y/(numRows - 1);

      // In text area
      if (xPercent > textArea.x[0] && xPercent < textArea.x[1] &&
        yPercent > textArea.y[0] && yPercent < textArea.y[1]) {
        return 0;
      }

      // In legal area
      if (y < top || y > bot) {
        return 0;
      } else {
        // in between top and bottom
        if (y - top < sizeGradientBlocks) {
          return 90 * (y - top) / sizeGradientBlocks + 5;
        } else if (bot - y < sizeGradientBlocks) {
          return 90 * (bot - y) / sizeGradientBlocks + 5;
        } else {
          return 90;
        }
      }
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
        var blockWidth = getBlockWidth(x, y);
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
  $('.title').fitText(0.36);
  // $(window).on('resize.title orientationchange.title', function () {
  //   console.log('hi');
  // });
});