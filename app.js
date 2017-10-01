//*---Step 1 Define Global Variables--*//
let myQuestions = [
    //question 1
    {
        questionText: 'Who is the current franchise owner for the Dallas Cowboys; and how long has he been owner of the Dallas Cowboys?',
        questionChoices: ['Jerry Jones; 30 years', 'Tom Landry; 12 years', 'Jerry Jones; 28 years', 'Jerry Jones; 29 years'],
        questionCorrectAnswer: 2,
        correctDetails: 'Jerry Jones purchased the Dallas Cowboys on February 25th, 1989 from H.R. "Bum" Bright for $140 million dollars. 28 years later, the Cowboys are now the most valuable franchise in all of sports, worth $4.2 billion dollars.'

    },

    //question 2
    {
        questionText: 'Which year(s) did the Dallas Cowboys win a Super Bowl Championship?',
        questionChoices: ['The Dallas Cowboys have not won a Super Bowl', '1990, 1991, 1992, and 1993', '1972, 1978, 1993, 1994, and 1996', '1972, 1978, 1991, 1994, and 1999'],
        questionCorrectAnswer: 2,
        correctDetails: 'The Dallas Cowboys won the Super Bowl in 1972, 1978, 1993, 1994, and 1996. They are tied for second for most Super Bowl wins by a franchise.'

    },

    //question 3
    {
        questionText: 'What year did the Dallas Cowboy join the NFL?',
        questionChoices: ['1960', '1945', '2012', '1971'],
        questionCorrectAnswer: 0,
        correctDetails: 'The Dallas Cowboys joined the NFL as an expansion team in 1960.'

    },

    //question 4
    {
        questionText: 'What city do the Dallas Cowboys play in?',
        questionChoices: ['Dallas, TX', 'Arlington, TX', 'Little Rock, AR', 'Fort Worth, TX'],
        questionCorrectAnswer: 1,
        correctDetails: 'The Dallas Cowboys moved from Irving, TX into their new stadium in Arlington, TX on May 27th, 2009.'

    },

    //question 5
    {
        questionText: 'Who is the Dallas Cowboys Single-Season Rushing Leader?',
        questionChoices: ['Ezekiel Elliot', 'Tony Dorsett', 'Emmitt Smith', 'Demarco Murray'],
        questionCorrectAnswer: 3,
        correctDetails: 'Demarco Murray set the Dallas Cowboys single-season rushing record on December 28th, 2014, passing Emmit Smith for most rushing yards gained in one season.'

    }
];



let currentQuestionNumber = 0;
let totalAmountOfQuestions = myQuestions.length;
let totalNumberOfCorrectAnswers = 0;


//*--Step 2 Define Functions--*//
function updateQuestion() {
    //1 - update the question text
    $('#question').text(myQuestions[currentQuestionNumber].questionText);
    //2 - display what are the choices for the current question
    //2.1 - first delete all exisiting choices before populating it with new ones
    $('.options').empty();
    //2.2 - get the total number of choices for the current question
    let totalChoices = myQuestions[currentQuestionNumber].questionChoices.length;
    console.log(totalChoices);
    //2.3 - loop through all the choices and append them to the choices container
    for (var i = 0; i < totalChoices; i++) {
        //2.3.1 - loop through the answer choices and create a dynamically generated row for eaach of them
        let buildEachChoice = "<input class='answers' name='q1' type='radio' value=" + i + ">" + myQuestions[currentQuestionNumber].questionChoices[i] + "<br>";
        //2.3.2 - append that row to the choices container in html
        $('.options').append(buildEachChoice);
    }
    //3 - displays the number of the current question
    $('.footer').text("Question" + (currentQuestionNumber + 1) + "of" + totalAmountOfQuestions);


    // display current score
    $('.right').text("Current Score: " + totalNumberOfCorrectAnswers + "/" + totalAmountOfQuestions);

}

//*--Step 3 Use Functions--*//
$(document).ready(function () {



    //*--- Hide quiz and result section on load ---*//
    $('.quiz-section').hide();
    $('.results-section').hide();

    //*--- On start quiz ---*//
    $('#startQuizButton').click(function () {
        $('.results-section').hide();
        $('.start-section').hide();
        $('.quiz-section').show();
        //*--- empty result container
        $('#result_msg').empty();
        updateQuestion();
    });
    //*--- Show quiz questions ---*//
    $('.quiz-section').on('click', '.answers', function () {
        //get the question answer from the user
        let userInput = $("input[class='answers']:checked").val();
        //get the correct answer from the myQuestions above
        let correctInput = myQuestions[currentQuestionNumber].questionCorrectAnswer;
        //compare the user answer with the correct answer
        if (userInput == correctInput) {
            //if the answer was correct increment the total number of correct answers
            totalNumberOfCorrectAnswers++;
        } //console.log(totalNumberOfCorrectAnswers);
        $('#result_msg').append("<h3>Q: " + myQuestions[currentQuestionNumber].questionText + "</h3>");
        $('#result_msg').append("<h4>A: " + myQuestions[currentQuestionNumber].correctDetails + "</h4>");
        //if quiz if finished, show results-section
        if ((currentQuestionNumber + 1) == totalAmountOfQuestions) {
            //show the final score
            $('#finalScore').text(totalNumberOfCorrectAnswers + "/" + totalAmountOfQuestions);
            //hide other containers
            $('.quiz-section').hide();
            $('.start-section').hide();
            $('.results-section').show();
            // display current score
            $('.right').text("Current Score: " + totalNumberOfCorrectAnswers + "/" + totalAmountOfQuestions);

        }
        //else continue to next question
        else {
            //increment the current question number
            currentQuestionNumber++
            //display the following question
            updateQuestion();
        }
    });


    //*--- Load the start section from the result section ---*//
    $('.results-section').on('click', '#tryagain', function () {
        $('.start-section').show();
        $('.quiz-section').hide();
        $('.results-section').hide();

        //reset variables to start quiz again
        currentQuestionNumber = 0;
        totalNumberOfCorrectAnswers = 0;
    });
});
