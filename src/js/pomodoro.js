/* EVENT HANDLERS */

// Increase and Decrease workingTimeSet
$('#increaseWorkingTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.workingTimeSet++;
		resetWorkAndBreakTime();
		$('#setWorkingTime').text(clock.workingTimeSet);
	}
});
$('#decreaseWorkingTime').on('click', function () {
	if (clock.timerStarted === false && clock.workingTimeSet > 1) {
		clock.workingTimeSet--;
		resetWorkAndBreakTime();
		$('#setWorkingTime').text(clock.workingTimeSet);
	}
});

// Increase and Decrease breakTimeSet
$('#increaseBreakTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.breakTimeSet++;
		resetWorkAndBreakTime();
		$('#setBreakTime').text(clock.breakTimeSet);
	}
});
$('#decreaseBreakTime').on('click', function () {
	if (clock.timerStarted === false && clock.breakTimeSet > 1) {
		clock.breakTimeSet--;
		resetWorkAndBreakTime();
		$('#setBreakTime').text(clock.breakTimeSet);
	}
});

// Toggle Timer

$('#playAndStop').on('click', function() {
	if (clock.timerStarted) {
		clearInterval(interval);
		clock.timerStarted = false;
		$('#playAndStop').html('<i class="fas fa-play"></i>');
	} else {
		interval = setInterval(countdown, 1000);
		clock.timerStarted = true;
		$('#playAndStop').html('<i class="fas fa-pause"></i>');
	}
});

// Reset Timer

$('#resetTimer').on('click', function() {
	clearInterval(interval);
	clock.timerStarted = false;
	resetWorkAndBreakTime();
	$('#playAndStop').html('<i class="fas fa-play"></i>');
});

/* MAIN FUNCTIONS AND VARIABLES */

let interval;
let alarmSound = new Audio();
alarmSound.src = 'sounds/MP3/Alert/Alert-09.mp3';

let clock = {
	timerStarted: false,
	workingTimeSet: parseInt($('#setWorkingTime').text()), // Value of the #setWorkingTime Element
	breakTimeSet: parseInt($('#setBreakTime').text()), // Value of the #setBreakTime Element
	timer: {
		minutes: 25,
		seconds: 0,
		breakMinutes: 5,
		breakSeconds: 0
	}
}

function countdown() {
	if (clock.timer.minutes === 0 && clock.timer.seconds === 0) { // Start the breakTime countdown
		if (clock.timer.breakMinutes === 0 && clock.timer.breakSeconds === 1) { // when breakTime ends
			alarmSound.play(); // Sound Signalization when break ends
			resetWorkAndBreakTime(); // Reset the workingTime and breakTime before starting the workingTime countdown
		} else { // while breakTime is running	
			if (clock.timer.breakMinutes === clock.breakTimeSet && clock.timer.breakSeconds === 0) {
				$('#timeLeftText').text('Break Time!');
				alarmSound.play(); 	// Sound Signalization when break starts
			}
			if (clock.timer.breakSeconds === 0) {
				clock.timer.breakMinutes--;
				clock.timer.breakSeconds = 60;
				// Using Animate.css to make the numbers fade in and out
				$('#timeLeft').addClass('fadeOutUp').on('animationend webkitAnimationEnd', function () {
					$(this).removeClass('fadeOutUp');
					$('#timeLeft').text(clock.timer.breakMinutes);
					$('#timeLeft').addClass('fadeInUp').on('animationend webkitAnimationEnd', function () {
						$(this).removeClass('fadeInUp');
					});
				});
				// end Animate.css
			}
			clock.timer.breakSeconds--;
			moveHand(); // This is the movement of the hand on the clock
		}
	} else { // Start the workingTime countdown
		if (clock.timer.seconds === 0) {
			clock.timer.minutes--;
			clock.timer.seconds = 60;
			// Using Animate.css to make the numbers fade in and out
			$('#timeLeft').addClass('fadeOutUp').on('animationend webkitAnimationEnd', function () {
				$(this).removeClass('fadeOutUp');
				$('#timeLeft').text(clock.timer.minutes);
				$('#timeLeft').addClass('fadeInUp').on('animationend webkitAnimationEnd', function () {
					$(this).removeClass('fadeInUp');
				});
			});
			// end Animate.css
		}
		clock.timer.seconds--;
		moveHand(); // This is the movement of the hand on the clock
	}
}

function resetWorkAndBreakTime() { // I should set other things in this function
	clock.timer.minutes = clock.workingTimeSet;
	clock.timer.seconds = 0;
	clock.timer.breakMinutes = clock.breakTimeSet;
	clock.timer.breakSeconds = 0;
	$('#timeLeftText').text('Time until break:');
	$('#timeLeft').text(clock.timer.minutes);
	moveHand(); // reset the hand on the clock
}

/* MOVEMENT OF THE HAND ON THE CLOCK */

function moveHand() {
	var observedSeconds;
	if (clock.timer.minutes === 0 && clock.timer.seconds === 0) { // If breakTime is running
		observedSeconds = clock.timer.breakSeconds;
	} else { // If workingTime is running
		observedSeconds = clock.timer.seconds;
	}
	var secondsTodegres = -(observedSeconds * 6); // 6 = 360deg/60s and turning it clockwise
	$('.seconds').css('transform', `rotate(${secondsTodegres}deg)`); // using template literals - backticks ``
}

/* ROUTER SETUP */

var router = new Router().init();

router.on('/reset', function () {
	resetWorkAndBreakTime();
	console.log('It is reset!');
});

// DO SOME REFACTORING (USE CLOSURE TRICKS IF POSSIBLE) - MAYBE DIVIDE FUNCTIONS IN OBJECTS, LIKE WITH JAVASCRIPT CALCULATOR
// ADD DIRECTOR.JS FUNCTIONALITY : WHEN URL IS #RESET , THEN RESET THE TIMER

// MAKE SURE THE MOVEMENT OF THE HAND IS A BIT SMOOTHER, IF POSSIBLE TO FIX WITH JAVASCRIPT
// ADD A FEATURE - WHEN 10S BEFORE BREAK, SET SOME VISUAL AND/OR SOUND SIGNALIZATION
