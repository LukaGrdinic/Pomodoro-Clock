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

let workingTimeValue = parseInt($('#setWorkingTime').text());
let breakTimeValue = parseInt($('#setBreakTime').text());

let clock = {
	timerStarted: false,
	workingTimeSet: workingTimeValue, // This is the value of the #setWorkingTime Element
	breakTimeSet: breakTimeValue, // This is the value of the #setBreakTime Element
	timer: {
		minutes: 25,
		seconds: 0,
		breakMinutes: 5,
		breakSeconds: 0
	}
}

let interval;

function toggleTimer() {
	if (clock.timerStarted) {
		clearInterval(interval);
		clock.timerStarted = false;
		$('#playAndStop').html('<i class="fas fa-play"></i>');
	} else {
		interval = setInterval(countdown, 1000);
		clock.timerStarted = true;
		$('#playAndStop').html('<i class="fas fa-pause"></i>');
	}
}

function resetTimer() {
	clearInterval(interval);
	clock.timerStarted = false;
	resetWorkAndBreakTime();
	$('#playAndStop').html('<i class="fas fa-play"></i>');
}

function countdown() {
	if (clock.timer.minutes === 0 && clock.timer.seconds === 0) { // Start the breakTime countdown 
		if (clock.timer.breakMinutes === 0 && clock.timer.breakSeconds === 1) { // when breakTime ends,adding one second because the next interval invokes countdown after 1 second
			// Sound Signalization when break ends
			resetWorkAndBreakTime(); // Reset the workingTime and breakTime before starting the workingTime countdown
		} else { // while breakTime is running
			// Sound Signalization when break starts
			if (clock.timer.breakMinutes === clock.breakTimeSet && clock.timer.breakSeconds === 0) {
				$('#timeLeftText').text('Break Time!');
			}
			if (clock.timer.breakSeconds === 0) {
				clock.timer.breakMinutes--;
				clock.timer.breakSeconds = 60;
				$('#timeLeft').text(clock.timer.breakMinutes);
			}
			clock.timer.breakSeconds--;
			console.log(clock.timer); // This is the movement of the hand on the clock
			moveHand();
		}
	} else { // Start the workingTime countdown

		if (clock.timer.seconds === 0) {
			clock.timer.minutes--;
			clock.timer.seconds = 60;
			$('#timeLeft').text(clock.timer.minutes);
		}
		clock.timer.seconds--;
		console.log(clock.timer); // This is the movement of the hand on the clock
		moveHand();
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
	if (clock.timer.minutes === 0 && clock.timer.seconds === 0) { 	// If breakTime is running
		observedSeconds = clock.timer.breakSeconds;
	} else { // If workingTime is running
		observedSeconds = clock.timer.seconds;
	}
	var secondsTodegres = -(observedSeconds * 6); // 6 = 360deg/60s and turning it clockwise
	$('.seconds').css('transform', `rotate(${secondsTodegres}deg)`); // using template literals - backticks ``
}

// MAKE SURE THERE ARE SOUND EFFECTS
// ADD SOME ANIMATIONS TO #TIMELEFT ELEMENT (MAYBE TO #SETWORKINGTIME AND #SETBREAKTIME ALSO)
// DO SOME REFACTORING (USE CLOSURE TRICKS IF POSSIBLE) - MAYBE DIVIDE FUNCTIONS IN OBJECTS, LIKE WITH JAVASCRIPT CALCULATOR
// MAKE SURE THE MOVEMENT OF THE HAND IS A BIT SMOOTHER, IF POSSIBLE TO FIX WITH JAVASCRIPT
// ADD SOME KEYCODE EVENTS, BY PRESSING ENTER, TOGGLE THE TOGGLETIMER FUNCTION
// ADD A FEATURE - WHEN 10S BEFORE BREAK, SET SOME VISUAL AND/OR SOUND SIGNALIZATION

// VALJALO BI DA NA KRAJU SVE UBACIM U JEDNU $document.ready funkciju
// SREDITI STVARI SA JQUERRY-jem, AKO KORISTIM JQUERRY, DRZIM SE JQUERRYJA, NPR NEMA STAVLJANJA ONIH ONCLICKOVA U HTML-U