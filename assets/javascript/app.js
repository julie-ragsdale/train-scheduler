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

    // References the database
    var database = firebase.database();
    
    // Capture button click
    $('#add-train').on('click', function(event) {
        event.preventDefault();
        
        // Grabs user input
        var trainName = $('#trainName-input').val().trim();
        var destination = $('#destination-input').val().trim();
        var frequency = $('#frequency-input').val().trim();
        var firstTrain = $('#firstTrain-input').val().trim();
        
        // writeTrainData(trainName, destination, firstTrain, frequency);

        // Creates local temp object to hold train data
        database.ref().push({
            name: trainName,
            destination: destination,
            frequency: frequency,
            firstTrain: firstTrain,
        });

        // Uploads train data to the database
        // function writeTrainData(trainName, destination, firstTrain, frequency) {
        //     firebase.database().ref('train-scheduler-e1c4c/' + newTrain).set({
        //         trainName: trainName,
        //         destination: destination,
        //         frequency: frequency,
        //         firstTrain: firstTrain
        //     });
        // }
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.firstTrain);

        alert('train successfully added');

        // Clears form
        $('#trainName-input').val('');
        $('#destination-input').val('');
        $('#frequency-input').val('');
        $('#firstName-input').val('');
    });

    // Creates Firebase event for adding new train to database and adding new row to html
    database.ref().on('child_added', function(childSnapshot) {
        console.log(childSnapshot.val());

        // Assign Firebase variables to snapshots
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var firebaseFrequency = childSnapshot.val().frequency;
        var nextTrain = childSnapshot.val().nextTrain;
        var minAway = childSnapshot.val().minAway;

        var diffTime = moment().diff(moment, 'minutes');
        var timeRemainder = moment().diff(moment, 'minutes') % firebaseFrequency;
        var minutes = firebaseFrequency - timeRemainder;

        // Train info
        console.log(minutes);
        console.log(nextTrain);
        console.log(moment().format('HH:mm'));
        console.log(nextTrain);
        console.log(moment().format('X'));

        // console.log(destination);
        // console.log(firstTrain);
        // console.log(frequency);
        // console.log(minAway);
        
// ---------------------------------------------
        // Moment js
        var currentTime = moment();
        console.log(currentTime);

        // Use Frequency and time of first train to determine the train's next arrival and how many minutes away it is
        // Will likely need to parse input from HH:mm to minutes for the calculations, then convert back to HH:mm

        // Next Arrival
        // First train + Frequency = Next arrival

        // Minutes Away
        // Current time + Frequency - Next arrival? = Minutes away

        // Maybe do a for loop to go through each 

// ---------------------------------------------

        // Creates new row
        var newRow = $('<tr>').append(
            $('<td>').text(trainName),
            $('<td>').text(destination),
            $('<td>').text(frequency),
            $('<td>').text(nextTrain),
            $('<td>').text(minAway)
        );
            
        // Appends new row to table
        $('#train-table > tbody').append(newRow);

        }, function(errorObject) {
            console.log('Error: ' + errorObject.code);
    });


    // function writeTrainData(trainName, destination, firstTrain, frequency) {
    //     firebase.database().ref('train-scheduler-e1c4c/' + trainName).set({
    //       destination: destination,
    //       frequency: frequency,
    //       firstTrain: firstTrain
    //     });
    // }

// End document ready
});

// Fun extras
// Make minutes away turn red when <5 min away; maybe make it flash when 5 seconds left