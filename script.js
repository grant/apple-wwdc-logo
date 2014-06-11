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
        var $block = $('<div>').addClass('block');

        // add color distributed uniformly along x axis
        var color = rainbow[Math.floor((x/numCols) * rainbow.length)];
        $block.css({
          backgroundColor: getRGBString(color)
        });

        $newBackground.append($block);
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