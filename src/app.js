var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    
    var description = data.Parkings11.parkings[i].description;
    var number = data.Parkings11.parkings[i].name;
    var available = data.Parkings11.parkings[i].availableCapacity;

    // Always upper-case first letter of description
    description = number + " : " + description.charAt(0).toUpperCase() + description.substring(1);

    // Add to menu items array
    items.push({
      title:description,
      subtitle:available
    });
  }

  // Finally return whole array
  return items;
};

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Park in Ghent',
  font:'GOTHIC_28_BOLD',
  color:'white',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'black'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

// Make request to openweathermap.org
ajax(
  {
    url:'http://datatank.gent.be/Mobiliteitsbedrijf/Parkings11.json',
    type:'json'
  },
  function(data) {
    // Create an array of Menu items
    var menuItems = parseFeed(data, 6);

    // Construct Menu to show to user
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'Park in Ghent',
        items: menuItems
      }]
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    splashWindow.hide();
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);


