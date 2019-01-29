$(document).ready(function() {

    // Initialize Firebase
    var config = {
    apiKey: 'AIzaSyAJ7GkfZbJOOhvb2rlEyNu6-BryD5-eIFw',
    authDomain: 'train-scheduler-e1c4c.firebaseapp.com',
    databaseURL: 'https://train-scheduler-e1c4c.firebaseio.com',
    projectId: 'train-scheduler-e1c4c',
    storageBucket: 'train-scheduler-e1c4c.appspot.com',
    messagingSenderId: '715656521055'
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial values
    var trainName;
    var destination;
    var frequency;
    var firstTrain;
    var nextTrain;
    var minAway;

    database.ref().on("child_added", function(snapshot) {
        trainName = snapshot.val().trainName;
        destination = snapshot.val().destination;
        firstTrain = snapshot.val().firstTrain;
        frequency = snapshot.val().frequency;
        nextTrain = snapshot.val().nextTrain;
        minAway = snapshot.val().minAway;

    }, function(errorObject) {
        console.log("Error: " + errorObject.code);
    });

    // Capture Button Click
    $('#add-train').on('click', function(event) {
        event.preventDefault();
        
        trainName = $('<div class="col-1">').val().trim();
        destination = $('<div class="col-2">').val().trim();
        frequency = $('<div class="col-3">').val().trim();
        firstTrain;

    });

// End document ready
});