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
    
    function writeTrainData(trainName, destination, firstTrain, frequency) {
        firebase.database().ref('train-scheduler-e1c4c/' + trainName).set({
          destination: destination,
          frequency: frequency,
          firstTrain: firstTrain
        });
    }
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

    // Capture button click
    $('#add-train').on('click', function(event) {
        event.preventDefault();
        
        // This is where the code is messing up with jQuery 
        // Not grabbing the right info, so it isnt even hitting firebase
        var trainName = $('<div class="col-1">').val().trim();
        var destination = $('<div class="col-2">').val().trim();
        var frequency = $('<div class="col-3">').val().trim();
        var firstTrain = '1';
        var nextTrain = 'a';
        var minAway = '6';
        
        writeTrainData(trainName, destination, firstTrain, frequency);
    });

// End document ready
});