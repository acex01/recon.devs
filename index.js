var inv = document.getElementById('next');
var btn = document.getElementById('next1');
function getUserChoice() {
    var user_sol = document.getElementById("sol").value;
    // var yodo = user_sol.toString();
    console.log(user_sol);
    // fun11();
    
}

// Load the Bing Maps module


window.onload = function() {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(51.5074, -0.1278),
        zoom: 10
    });
   

    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
        var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
        // Set Route Mode to walking
        directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.walking });
        var waypoint1 = new Microsoft.Maps.Directions.Waypoint({ address: 'uttam nager' });
        var waypoint2 = new Microsoft.Maps.Directions.Waypoint({ address: 'nawada' });
        directionsManager.addWaypoint(waypoint1);
        directionsManager.addWaypoint(waypoint2);
        // Set the element in which the itinerary will be rendered
        directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
        directionsManager.calculateDirections();
    });


    // Getting the coordinates from location
    navigator.geolocation.getCurrentPosition(locationHandler);

    function locationHandler(dangerZone) {
        var lat = dangerZone.coords.latitude;
        var lng = dangerZone.coords.longitude;
        
        // Red zone are
        redArea = 3.14*((lat + 100)^2 + (lng + 100)^2);
    } 
    
};

// route --------------------------------------
function getLocationsBetweenPlaces(waypoint1, waypoint2) {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});
    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
        var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
        directionsManager.addWaypoint(waypoint1);
        directionsManager.addWaypoint(waypoint2);
        directionsManager.calculateDirections();

        Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', function () {
            var route = directionsManager.getCurrentRoute();
            for (var i = 0; i < route.routeLegs.length; i++) {
                var leg = route.routeLegs[i];
                for (var j = 0; j < leg.itineraryItems.length; j++) {
                    var item = leg.itineraryItems[j];
                    console.log(item.maneuverPoint.coordinates);  // This is the location of the step
                }
            }
        });
    });
}

Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});

    // Create the DirectionsManager
    var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

    // Create waypoints
    var waypoint1 = new Microsoft.Maps.Directions.Waypoint({ address: 'Seattle, WA' });
    var waypoint2 = new Microsoft.Maps.Directions.Waypoint({ address: 'San Francisco, CA' });

    // Add the waypoints to the DirectionsManager
    directionsManager.addWaypoint(waypoint1);
    directionsManager.addWaypoint(waypoint2);

    // Calculate the route
    directionsManager.calculateDirections();
    // getLocationsBetweenPlaces(waypoint1,waypoint2);
});


  