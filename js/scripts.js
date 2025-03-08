$(document).ready(() => {
	/***************** Waypoints ******************/

	$(".wp1").waypoint(
		() => {
			$(".wp1").addClass("animated fadeInLeft");
		},
		{
			offset: "75%",
		},
	);
	$(".wp2").waypoint(
		() => {
			$(".wp2").addClass("animated fadeInRight");
		},
		{
			offset: "75%",
		},
	);
	$(".wp3").waypoint(
		() => {
			$(".wp3").addClass("animated fadeInLeft");
		},
		{
			offset: "75%",
		},
	);
	$(".wp4").waypoint(
		() => {
			$(".wp4").addClass("animated fadeInRight");
		},
		{
			offset: "75%",
		},
	);
	$(".wp5").waypoint(
		() => {
			$(".wp5").addClass("animated fadeInLeft");
		},
		{
			offset: "75%",
		},
	);
	$(".wp6").waypoint(
		() => {
			$(".wp6").addClass("animated fadeInRight");
		},
		{
			offset: "75%",
		},
	);
	$(".wp7").waypoint(
		() => {
			$(".wp7").addClass("animated fadeInUp");
		},
		{
			offset: "75%",
		},
	);
	$(".wp8").waypoint(
		() => {
			$(".wp8").addClass("animated fadeInLeft");
		},
		{
			offset: "75%",
		},
	);
	$(".wp9").waypoint(
		() => {
			$(".wp9").addClass("animated fadeInRight");
		},
		{
			offset: "75%",
		},
	);

	/***************** Initiate Flexslider ******************/
	$(".flexslider").flexslider({
		animation: "slide",
	});

	/***************** Initiate Fancybox ******************/

	$(".single_image").fancybox({
		padding: 4,
	});

	$(".fancybox").fancybox({
		padding: 4,
		width: 1000,
		height: 800,
	});

	/***************** Tooltips ******************/
	$('[data-toggle="tooltip"]').tooltip();

	/***************** Nav Transformicon ******************/

	/* When user clicks the Icon */
	$(".nav-toggle").click(function (event) {
		$(this).toggleClass("active");
		$(".header-nav").toggleClass("open");
		event.preventDefault();
	});
	/* When user clicks a link */
	$(".header-nav li a").click(() => {
		$(".nav-toggle").toggleClass("active");
		$(".header-nav").toggleClass("open");
	});

	/***************** Header BG Scroll ******************/
	$(() => {
		$(window).scroll(() => {
			const scroll = $(window).scrollTop();

			if (scroll >= 20) {
				$("section.navigation").addClass("fixed");
				$("header").css({
					"border-bottom": "none",
					padding: "35px 0",
				});
				$("header .member-actions").css({
					top: "26px",
				});
				$("header .navicon").css({
					top: "34px",
				});
			} else {
				$("section.navigation").removeClass("fixed");
				$("header").css({
					"border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
					padding: "50px 0",
				});
				$("header .member-actions").css({
					top: "41px",
				});
				$("header .navicon").css({
					top: "48px",
				});
			}
		});
	});

	/***************** Smooth Scrolling ******************/
	$(() => {
		$("a[href*=#]:not([href=#])").click(function () {
			if (
				location.pathname.replace(/^\//, "") ===
					this.pathname.replace(/^\//, "") &&
				location.hostname === this.hostname
			) {
				let target = $(this.hash);
				target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
				if (target.length) {
					$("html,body").animate(
						{
							scrollTop: target.offset().top - 90,
						},
						2000,
					);
					return false;
				}
			}
		});
	});

	/********************** Embed youtube video *********************/
    $('.player').YTPlayer();

	/********************** Toggle Map Content **********************/
	$("#btn-show-map").click(() => {
		$("#map-content").toggleClass("toggle-map-content");
		$("#btn-show-content").toggleClass("toggle-map-content");
	});
	$("#btn-show-content").click(() => {
		$("#map-content").toggleClass("toggle-map-content");
		$("#btn-show-content").toggleClass("toggle-map-content");
	});

	/********************** Add to Calendar **********************/
	const myCalendar = createCalendar({
		options: {
			class: "",
			// You can pass an ID. If you don't, one will be generated for you
			id: "",
		},
		data: {
			// Event title
			title: "Merrilee and Rami's Wedding",

			// Event start date
			start: new Date("Aug 28, 2025 16:00"),

			// Event duration (IN MINUTES)
			// duration: 120,

			// You can also choose to set an end time
			// If an end time is set, this will take precedence over duration
			end: new Date("Aug 28, 2025 11:59"),

			// Event Address
			address: "Seattle, WA, USA",

			// Event Description
			description:
				"We can't wait to see you on our big day. For any queries or issues, please contact Merrilee.",
		},
	});

	$("#add-to-cal").html(myCalendar);

	/********************** RSVP **********************/
	$("#rsvp-form").on("submit", function (e) {
		e.preventDefault();
		const data = $(this).serialize();

		$("#alert-wrapper").html(
			alert_markup(
				"info",
				"<strong>Just a sec!</strong> We are saving your details.",
			),
		);

		if (MD5($("#invite_code").val()) !== "0aface3e62ae854e0fd40b1124ec1e85") {
			$("#alert-wrapper").html(
				alert_markup(
					"danger",
					"<strong>Sorry!</strong> Your invite code is incorrect.",
				),
			);
		} else {
			$.post(
				"https://script.google.com/macros/s/AKfycbzfdMEWDRQ2k2eDY2qR6uLRsVA5Q5CQkIjNDT564O8Vi7-4yXN9pwg58gCeBallVIBsbA/exec",
				data,
			)
				.done((data) => {
					console.log(data);
					if (data.result === "error") {
						$("#alert-wrapper").html(alert_markup("danger", data.message));
					} else {
						$("#alert-wrapper").html("");
						$("#rsvp-modal").modal("show");
					}
				})
				.fail((data) => {
					console.log(data);
					$("#alert-wrapper").html(
						alert_markup(
							"danger",
							"<strong>Sorry!</strong> There is some issue with the server. ",
						),
					);
				});
		}
	});
});

function MD5(r) {
	let o;
	let e;
	let n;
	const f = [
		-680876936, -389564586, 606105819, -1044525330, -176418897, 1200080426,
		-1473231341, -45705983, 1770035416, -1958414417, -42063, -1990404162,
		1804603682, -40341101, -1502002290, 1236535329, -165796510, -1069501632,
		643717713, -373897302, -701558691, 38016083, -660478335, -405537848,
		568446438, -1019803690, -187363961, 1163531501, -1444681467, -51403784,
		1735328473, -1926607734, -378558, -2022574463, 1839030562, -35309556,
		-1530992060, 1272893353, -155497632, -1094730640, 681279174, -358537222,
		-722521979, 76029189, -640364487, -421815835, 530742520, -995338651,
		-198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606,
		-1051523, -2054922799, 1873313359, -30611744, -1560198380, 1309151649,
		-145523070, -1120210379, 718787259, -343485551,
	];
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	const t = [(o = 1732584193), (e = 4023233417), ~o, ~e];
	const c = [];
	let a = `${unescape(encodeURI(r))}\u0080`;
	let d = a.length;

	// biome-ignore lint/style/noParameterAssign: <explanation>
	for (r = (--d / 4 + 2) | 15, c[--r] = 8 * d; ~d; )
		c[d >> 2] |= a.charCodeAt(d) << (8 * d--);
	for (i = a = 0; i < r; i += 16) {
		for (
			d = t;
			64 > a;
			d = [
				// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
				(n = d[3]),
				o +
					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
					(((n =
						d[0] +
						[(o & e) | (~o & n), (n & o) | (~n & e), o ^ e ^ n, e ^ (o | ~n)][
							// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
							(d = a >> 4)
						] +
						f[a] +
						~~c[i | (15 & [a, 5 * a + 1, 3 * a + 5, 7 * a][d])]) <<
						// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
						(d = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][
							4 * d + (a++ % 4)
						])) |
						(n >>> -d)),
				o,
				e,
			]
		)
			// biome-ignore lint/style/noCommaOperator: <explanation>
			(o = 0 | d[1]), (e = d[2]);
		for (a = 4; a; ) t[--a] += d[a];
	}

	// biome-ignore lint/style/noParameterAssign: <explanation>
	for (r = ""; 32 > a; )
		// biome-ignore lint/style/noParameterAssign: <explanation>
		r += ((t[a >> 3] >> (4 * (1 ^ a++))) & 15).toString(16);
	return r;
}

/********************** Extras **********************/

// Google map
async function initMap() {
	const location = { lat: 47.6518, lng: -122.3553 };
	const map = new google.maps.Map(document.getElementById("map-canvas"), {
		zoom: 15,
		center: location,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapId: "DEMO_MAP_ID",
	});

	// TODO: Create MapID for wedding site
	const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
	new AdvancedMarkerElement({
		position: location,
		map: map,
	});
}

// alert_markup
function alert_markup(alert_type, msg) {
	return `<div class="alert alert-${alert_type}" role="alert">${msg}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>`;
}
