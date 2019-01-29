$( document ).ready(function() {

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
    var runTime;

    database.ref().on("child_added", function(snapshot) {
        trainName = snapshot.val().trainName;
        runTime = snapshot.val().runTime;
    });

    // Capture Button Click
    $('#add-user').on('click', function(event) {
        event.preventDefault();
        
    });

// End document ready
});