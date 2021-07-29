function buildHexGrid(opts) {
  if (!(this instanceof buildHexGrid)) {
    return new buildHexGrid(opts);
  }

  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      this.opts[key] = opts[key];
    }
  }

  this.instance = Math.round(Math.random() * 2000);

  return this.createSVG();
}

buildHexGrid.prototype = {
  opts: {
    cols: 6,
    rows: 6,
    spacing: 0,
    size: 100,
    offsetX: 0,
    offsetY: 0
  },

  createPolygon: function(size, sides) {

    sides = sides || 6;
    size = size || 140;

    size = size * 0.52;

    var i = sides,
      points = [];

    while (i--) {
      points.push(
        Math.round(size + size * Math.sin(i * (Math.PI * 2) / sides)) + ',' +
        Math.round(size + size * Math.cos(i * (Math.PI * 2) / sides))
      );
    }

    return '<polygon id="hex' + this.instance + '" points="' + points.join(' ') + '"></polygon>';
  },

  createGrid: function() {
    
    var hex = '<use x="{{x}}" y="{{y}}" fill="{{fill}}" class="hex{{css}} hexitem" xlink:href="#hex' + this.instance + '" />',
      odd = false,
      size = this.opts.size + this.opts.spacing,
      grid = '',
      count = 0,
      x, y, i, j, fill;
    
    for (i = 0; i < this.opts.rows; i++) {
      odd = i % 2;
      y = i * (size * 0.87) + this.opts.offsetY;
      for (j = 0; j < this.opts.cols + (odd ? 1 : 0); j++) {
        x = j * size + (odd ? -size / 2 : 0) + this.opts.offsetX;
        count++;
        
        //Random starting colors. Set to #FFF for blank starter.
        var fill = '#fff';
        //var colors = ['#eef2f6','#dee3e7','#9199a6','#9199a6'];
        //var fill = colors[Math.floor(Math.random() * colors.length)]; 
        
        grid += hex.replace('{{x}}', x).replace('{{y}}', y).replace('{{fill}}', fill).replace('{{css}}', count);
      }
    }

    return grid;
  },

  /*createSVG: function() {
    var div = document.createElement('div'),
        size = this.opts.size + this.opts.spacing,
        total = this.opts.cols * this.opts.rows * 1.50;
    
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' 
      + (size * this.opts.cols) + ' ' + (size * this.opts.rows * 1.50) + '">'       
      + '<defs>' + this.createPolygon(this.opts.size) + '</defs>' 
      + this.createGrid()
      + '</svg>';

    return div.children[0];
  },

  createAnimation: function(total){
    console.log(total);
    for (i = 1; i < total; i++) {
      return '.hex'+i+'{animation: pulse-blue 3s 140ms infinite linear alternate;}';
    }
  }*/
};

document.body.appendChild(buildHexGrid({
  cols: 16,
  rows: 20,
  size: 20,
  spacing: -2.2,
  offsetX: -1.2, //58,
}));