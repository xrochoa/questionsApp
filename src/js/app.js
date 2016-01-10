$(document).ready(function() {

    var allQuestions, question, answer;
    var allQuestionsInitialLength;


    $.getJSON('/api', function(data) {
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
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


    //Creates a new question
    function newQuestion() {

        if (allQuestions.length !== 0) {

            var random = getRandomInt(allQuestions.length);

            /*
            FOR KEY VALUE
            for (var key in allQuestions[random]) {
                question = key;
                answer = allQuestions[random][key];
            }
            */
            //QUESTION OPTIONS
            var option = getRandomInt(6);
            switch (option) {
                case 0:
                    question = 'What is the property that ' + allQuestions[random]['Description'].toLowerCase() + '?';
                    answer = allQuestions[random]['Property'];
                    console.log(answer);
                    break;
                case 1:
                    question = 'What is the syntax for ' + allQuestions[random]['Property'] + '?';
                    answer = allQuestions[random]['Syntax'];
                    console.log(answer);
                    break;
                case 2:
                    question = 'In what CSS version was ' + allQuestions[random]['Property'] + ' specified?';
                    answer = allQuestions[random]['CSS'];
                    console.log(answer);
                    break;
                case 3:
                    question = 'Is ' + allQuestions[random]['Property'] + ' animatable?';
                    answer = allQuestions[random]['Animatable'];
                    console.log(answer);
                    break;
                case 4:
                    question = 'Write an example for the ' + allQuestions[random]['Property'] + ' property';
                    answer = allQuestions[random]['Example'];
                    console.log(answer);
                    break;
                case 5:
                    question = 'What type of property is ' + allQuestions[random]['Property'] + '?';
                    answer = allQuestions[random]['Type'];
                    console.log(answer);
                    break;
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

        if (string == answer) {
            newQuestion();
        } else {
            $('#message').html('<span id="warning">Wrong answer!</span>').hide().fadeIn().fadeOut();
        }


    }

});