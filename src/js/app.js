$(document).ready(function() {

    var allQuestions, question, answer;
    var allQuestionsInitialLength;


    $.getJSON('res/jquery.json', function(data) {
        allQuestions = data;
        console.log('data loaded');
        allQuestionsInitialLength = allQuestions.length;
    });

    $('#start').on("click", initialize);

    //button works with enter and input focuses on keypress
    $(document).keyup(function(event) {
        $("#string").focus();
        if (event.keyCode == 13) {
            $('#start').click();
        }
    });

    function initialize() {
        $('#start').off("click", initialize).text('Next');
        $('#start').on("click", stringComparison);
        newQuestion();
    }

    //Generates a random integer from allQuestions.length 
    function getRandomInt() {
        return Math.floor(Math.random() * allQuestions.length);
    }


    //Creates a new question
    function newQuestion() {

        if (allQuestions.length !== 0) {

            var random = getRandomInt();

            for (var key in allQuestions[random]) {
                question = key;
                answer = allQuestions[random][key];
            }
            //deletes the item from the array
            allQuestions.splice(random, 1);

            $('#question').text(question);
            $('#answer').html('<input id="string" type="text">');
            $('#message').text('Questions left: ' + allQuestions.length).hide().fadeIn(1000).fadeOut(1000);
            //input focuses
            $("#string").focus();

        } else {
            //the array is empty
            $('#content').text('Congratulations! You answered ' + allQuestionsInitialLength + ' questions').css("font-size", "2em");
        }

    }

    //compares the string
    function stringComparison() {

        var string = $('#string').val();

        if (string === answer) {
            newQuestion();
        } else {
            $('#message').html('<span id="warning">Wrong answer!</span>').hide().fadeIn().fadeOut();
        }


    }

});