let workingTimeValue = parseInt($('#setWorkingTime').text());
let breakTimeValue = parseInt($('#setBreakTime').text());

// Increase and Decrease workingTime
$('#increaseWorkingTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.workingTimeSet++;
		$('#setWorkingTime').text(clock.workingTimeSet);
	}
});
$('#decreaseWorkingTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.workingTimeSet--;
		$('#setWorkingTime').text(clock.workingTimeSet);
	}
});

// Increase and Decrease breakTime
$('#increaseBreakTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.breakTimeSet++;
		$('#setBreakTime').text(clock.breakTimeSet);
	}
});
$('#decreaseBreakTime').on('click', function () {
	if (clock.timerStarted === false) {
		clock.breakTimeSet--;
		$('#setBreakTime').text(clock.breakTimeSet);
	}
});

let clock = {
	timerStarted: false,
	workingTimeSet: workingTimeValue, // This is the value of the #setWorkingTime Element
	workingTime: 25, // workingTimeSet should be the value
	breakTimeSet: breakTimeValue, // This is the value of the #BreakTime Element
	breakTime: 5 // breakTimeSet should be the value
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
	clock.workingTime = clock.workingTimeSet;
	clock.breakTime = clock.breakTimeSet;
	$('#playAndStop').html('<i class="fas fa-play"></i>');
}

function countdown() {
	if (clock.workingTime < 0) { // Start the breakTime countdown
		if (clock.breakTime < 0) {
			// Sound Signalization when break ends
			console.log('Commencing workingTime!');
			// Reset the workingTime and breakTime and Start the WorkingTime countdown
			clock.workingTime = clock.workingTimeSet;
			clock.breakTime = clock.breakTimeSet;
		} else {
			// Sound Signalization when break starts
			if (clock.breakTime === clock.breakTimeSet) {
				console.log('Commencing breakTime!');
			}
			console.log(clock.breakTime);
			clock.breakTime -= 1;
		}
	} else { // Start the workingTime countdown
		console.log(clock.workingTime);
		clock.workingTime -= 1;
	}
}

$(document).ready(function () {
	window.specialVar = 'You accessed me!';
	console.log("ready!");
});

// VALJALO BI DA NA KRAJU SVE UBACIM U JEDNU $document.ready funkciju
// SREDITI STVARI SA JQUERRY-jem, AKO KORISTIM JQUERRY, DRZIM SE JQUERRYJA, NPR NEMA STAVLJANJA ONIH ONCLICKOVA U HTML-U