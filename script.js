$(function () {

  var numCols = 40;
  var numRows = 20;

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

  function createBackground () {
    $background = $('.background');
    $newBackground = $('<div/>');

    // Create and style blocks
    for (var y = 0; y < numRows; ++y) {
      for (var x = 0; x < numCols; ++x) {
        // Calculate properties

        // add color distributed uniformly along x axis
        var color = rainbow[Math.floor((x/numCols) * rainbow.length)];
        var gridWidth = (100/numCols);
        var gridWidthString = gridWidth + '%';
        var blockWidth = 50;
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
          marginBottom: marginWidthString,
        });

        $blockArea.html($block);
        $newBackground.append($blockArea);
      }
    }

    $background.html($newBackground.html());
  }

  // Gets the color as a string in 'rgb(r,g,b)' format
  function getRGBString (rgb) {
    return 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
  }

  createBackground();
});