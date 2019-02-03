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
    
    // Gets elements
    var trainObject = $('trains');

    // References the database
    var database = firebase.database().ref().child('trains');
    
    // Read from the database + draw table on page load
    database.on('value', snap => console.log(snap.val()));

    // CANCEL: Captures button click
    $('#button-cancel').on('click', function(event) {
        event.preventDefault();
        // Clears form
        $('#trainName-input').val('');
        $('#destination-input').val('');
        $('#frequency-input').val('');
        $('#firstTrain-input').val('');
    });

    // SUBMIT: Captures button click
    $('#button-submit').on('click', function(event) {
        event.preventDefault();
        
        // Grabs user input from form
        var trainName = $('#trainName-input').val().trim();
        var trainDest = $('#destination-input').val().trim();
        var firstTrain = $('#firstTrain-input').val().trim();
        var trainFreq = $('#frequency-input').val().trim();

        // Creates local temporary object to hold train data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            start: firstTrain,
            frequency: trainFreq,
        }

        // Uploads new train data to database
        database.push(newTrain);

        // Clears form
        $('#trainName-input').val('');
        $('#destination-input').val('');
        $('#frequency-input').val('');
        $('#firstName-input').val('');
    });
    
    // Creates Firebase event to add new train to database and new row to html
    database.on('child_added', function(childSnapshot) {
        console.log(childSnapshot.val());

        // Assign Firebase variables to snapshots
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;
        var nextTrain = childSnapshot.val().next;
        var minAway = childSnapshot.val().until;
        
        // Current Time
        console.log('MOMENT.JS: ');
        
        var currentTime = moment();
        console.log('Current Time: ' + moment(currentTime).format('hh:mm'));
        
        // Time is 3:30 AM
        var firstTime = firstTrain;
        
        // Assumptions
        var tFrequency = trainFreq;
        
        // First Time (pushed back 1 year to make sure it comes before current time)
        var convertedFirstTime = moment(firstTime, 'HH:mm').subtract(1, 'years');
        console.log(convertedFirstTime);
        
        // Difference between the times
        var diffTime = moment().diff(moment(convertedFirstTime), 'minutes');
        console.log('Difference in Time: ' + diffTime);
        
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        
        // Minute Until Train
        var minAway = tFrequency - tRemainder;
        console.log('Minutes Until Arrival: ' + minAway);
        
        // Next Train
        var nextTrain = moment().add(minAway, 'minutes');
        console.log('Arrival Time: ' + moment(nextTrain).format('hh:mm'));
        console.log('-------------------------');

        // Train info
        console.log('FIREBASE child_added:');
        console.log(trainName);
        console.log(trainDest);
        console.log(firstTrain);
        console.log(trainFreq);
        console.log(nextTrain);
        console.log(minAway);
        console.log('-------------------------');

        // Creates new row
        var newRow = $('<tr class="train_row">').append(
            $('<td class="table_train-name">').text(trainName),
            $('<td class="table_train-destination">').text(trainDest),
            $('<td class="table_train-frequency">').text(trainFreq),
            $('<td class="table_next-arrival">').text(nextTrain),
            $('<td class="table_min-away">').text(minAway)
        );
            
        // Appends new row to table
        $('#train_table > tbody').append(newRow);
        
    }, function(errorObject) {
        console.log('Error: ' + errorObject.code);
        
    });

// End document ready
});

// Fun extras
// Make minutes away turn red when <5 min away; maybe make it flash when 5 seconds left