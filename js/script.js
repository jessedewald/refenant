var constants = {
    numNonnudeLandscape: 10,
    numNudeLandscape: 10,
    numNonnudePortrait: 10,
    numNudePortrait: 10 //playcode.io
};
var settings = {};
var session = {};
window.addEventListener("load",initSetup);

function initSetup() {
	// populates page with controls for settings and adds event listeners to respond to input

	// initalize settings
	settings.nude = false;
	settings.portrait = false;
	settings.minutes = 5;
	settings.seconds = 0;
	settings.delay = 5*60

	// load setup page content and add event listeners to buttons
	$("#nav").load("content/navSetup.html");
	$("#content").load("content/contentSetup.html", function() {
		document.getElementById("non-nude").addEventListener("click", function () {settingHandler(0,0);});
		document.getElementById("nude").addEventListener("click", function () {settingHandler(0,1);});
		document.getElementById("landscape").addEventListener("click", function () {settingHandler(1,0);});
		document.getElementById("portrait").addEventListener("click", function () {settingHandler(1,1);});
		document.getElementById("begin").addEventListener("click", initSlideshow);
	});
};

function initSlideshow() {
	// gets integer setting values and begins slideshow

	// finalizing settings values
	settings.minutes = parseInt(document.getElementById("minutes").value);
	settings.seconds = parseInt(document.getElementById("seconds").value);
	settings.delay = settings.minutes * 60 + settings.seconds


    // initialize session values
    session.index = 0
    if (settings.nude) {
        if (settings.portrait) session.queue = newQueue(constants.numNudePortrait);
        else session.queue = newQueue(constants.numNudeLandscape);
    }
    else {
        if (settings.portrait) session.queue = newQueue(constants.numNonnudePortrait);
        else session.queue = newQueue(constants.numNonnudeLandscape);
    }

    // load slideshow content and add event listeners
	$("#nav").load("content/navSession.html");
	$("#content").load("content/contentSession.html", function() {
		loadNextImage();
		document.getElementById("forward").addEventListener("click",forward);
		document.getElementById("backward").addEventListener("click",backward);
	});
};

function settingHandler(type, value) {
	// updates setting values and changes view in response to user input

	if (type == 0) {
		(value) ? nude() : nonNude();
	}
	else {
		(value) ? portrait() : landscape();
	}

	function nude() {
		settings.nude = true;
		document.getElementById("non-nude").classList.add("btn-secondary");
		document.getElementById("non-nude").classList.remove("btn-primary");
		document.getElementById("nude").classList.add("btn-primary");
		document.getElementById("nude").classList.remove("btn-secondary");
	}

	function nonNude() {
		settings.nude = false;
		document.getElementById("non-nude").classList.add("btn-primary");
		document.getElementById("non-nude").classList.remove("btn-secondary");
		document.getElementById("nude").classList.add("btn-secondary");
		document.getElementById("nude").classList.remove("btn-primary");
	}

	function portrait() {
		settings.portrait = true;
		document.getElementById("landscape").classList.add("btn-secondary");
		document.getElementById("landscape").classList.remove("btn-primary");
		document.getElementById("portrait").classList.add("btn-primary");
		document.getElementById("portrait").classList.remove("btn-secondary");
	}

	function landscape() {
		settings.portrait = false;
		document.getElementById("landscape").classList.add("btn-primary");
		document.getElementById("landscape").classList.remove("btn-secondary");
		document.getElementById("portrait").classList.add("btn-secondary");
		document.getElementById("portrait").classList.remove("btn-primary");
	}
};

function newQueue(length) {
	// creates a randomized queue (array) of image IDs
	var queue = [];
	for (var i = 1; i <= length; i++) {
		queue[queue.length] = i;
	}
	for (i = length-1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = queue[i];
		queue[i] = queue[j];
		queue[j] = temp;
	}
	return queue;
}

function loadNextImage() {
	// set time remaining to user-chosen delay
	session.time = settings.delay;
	// inital render
	console.log("image index: " + session.index);
	console.log(session.time);
	var imgstr = "img/00/" + session.queue[session.index] + ".jpg";
	$("#imgContent").attr("src",imgstr);
	// begin clock ticking
	session.timer = setInterval(tick,1000);
}

function tick() {
	if (session.time > 0) { // if time is left on image
		console.log(--session.time); // decrement and rerender
	}
	else { // (timer ran out)
		forward();
	}
}

function forward() {
	clearInterval(session.timer); // end current timer
	session.index++; // increment index
	loadNextImage(); // refresh
}

function backward() {
	clearInterval(session.timer); // end current timer
	session.index--; // decrement index
	loadNextImage(); // refresh
}

function pause() {
	clearInterval(session.timer);
}

function resume() {
	session.timer = setInterval(tick,1000);
}