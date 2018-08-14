var session = {};
window.addEventListener("load",initSetup);

function initSetup() {
	// populates page with controls for settings and adds event listeners to respond to input

	// initalize settings
	session.nude = false;
	session.portrait = false;
	session.minutes = 5;
	session.seconds = 0;

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
	//  gets integer setting values and begins slideshow

	session.minutes = parseInt(document.getElementById("minutes").value);
	session.seconds = parseInt(document.getElementById("seconds").value);

	$("#nav").load("content/navSession.html");
	$("#content").load("content/contentSession.html");
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
		session.nude = true;
		document.getElementById("non-nude").classList.add("btn-secondary");
		document.getElementById("non-nude").classList.remove("btn-primary");
		document.getElementById("nude").classList.add("btn-primary");
		document.getElementById("nude").classList.remove("btn-secondary");
	}

	function nonNude() {
		session.nude = false;
		document.getElementById("non-nude").classList.add("btn-primary");
		document.getElementById("non-nude").classList.remove("btn-secondary");
		document.getElementById("nude").classList.add("btn-secondary");
		document.getElementById("nude").classList.remove("btn-primary");
	}

	function portrait() {
		session.portrait = true;
		document.getElementById("landscape").classList.add("btn-secondary");
		document.getElementById("landscape").classList.remove("btn-primary");
		document.getElementById("portrait").classList.add("btn-primary");
		document.getElementById("portrait").classList.remove("btn-secondary");
	}

	function landscape() {
		session.portrait = false;
		document.getElementById("landscape").classList.add("btn-primary");
		document.getElementById("landscape").classList.remove("btn-secondary");
		document.getElementById("portrait").classList.add("btn-secondary");
		document.getElementById("portrait").classList.remove("btn-primary");
	}
};