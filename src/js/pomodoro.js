let workingTimeValue = parseInt($('#setWorkingTime').text());
let breakTimeValue = parseInt($('#setBreakTime').text());

// Increase and Decrease workingTime
$('#increaseWorkingTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.workingTimeSet++;
		resetWorkAndBreakTime();
		$('#setWorkingTime').text(clock.workingTimeSet);
	}
});
$('#decreaseWorkingTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.workingTimeSet--;
		resetWorkAndBreakTime();
		$('#setWorkingTime').text(clock.workingTimeSet);
	}
});

// Increase and Decrease breakTime
$('#increaseBreakTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.breakTimeSet++;
		resetWorkAndBreakTime();
		$('#setBreakTime').text(clock.breakTimeSet);
	}
});
$('#decreaseBreakTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.breakTimeSet--;
		resetWorkAndBreakTime();
		$('#setBreakTime').text(clock.breakTimeSet);
	}
});

let clock = {
	timerStarted: false,
	workingTimeSet: workingTimeValue, // This is the value of the #setWorkingTime Element
	breakTimeSet: breakTimeValue, // This is the value of the #BreakTime Element
	timer: {
		minutes: 25, // workingTimeSet should be assigned here
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
	if (clock.timer.minutes < 0) { // Start the breakTime countdown 
		if (clock.timer.breakMinutes < 0) { // breakTime ends
			// Sound Signalization when break ends
			// Reset the workingTime and breakTime before starting the workingTime countdown
			resetWorkAndBreakTime();
		} else { // breakTime running
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
		}
	} else { // Start the workingTime countdown

		if (clock.timer.seconds === 0) {
			clock.timer.minutes--;
			clock.timer.seconds = 60;
			$('#timeLeft').text(clock.timer.minutes);
		}
		clock.timer.seconds--;
		console.log(clock.timer); // This is the movement of the hand on the clock
	}
}

function resetWorkAndBreakTime() { // I should set other things in this function
	clock.timer.minutes = clock.workingTimeSet;
	clock.timer.seconds = 0;
	clock.timer.breakMinutes = clock.breakTimeSet;
	clock.timer.breakSeconds = 0;
	$('#timeLeftText').text('Time until break:');
	$('#timeLeft').text(clock.timer.minutes);
}

// VALJALO BI DA NA KRAJU SVE UBACIM U JEDNU $document.ready funkciju
// SREDITI STVARI SA JQUERRY-jem, AKO KORISTIM JQUERRY, DRZIM SE JQUERRYJA, NPR NEMA STAVLJANJA ONIH ONCLICKOVA U HTML-U