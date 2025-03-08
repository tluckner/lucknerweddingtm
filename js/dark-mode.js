// dark-mode.js
document.addEventListener("DOMContentLoaded", () => {
	// Create dark mode toggle button
	const toggleButton = document.createElement("button");
	toggleButton.classList.add("dark-mode-toggle");
	toggleButton.innerHTML = '<i class="fa fa-moon-o"></i>';
	document.body.appendChild(toggleButton);

	// Check for saved preference
	const isDarkMode = localStorage.getItem("darkMode") === "true";

	// Apply dark mode if saved preference exists
	if (isDarkMode) {
		document.body.classList.add("dark-mode");
		toggleButton.innerHTML = '<i class="fa fa-sun-o"></i>';
	}

	// Toggle dark mode on button click
	toggleButton.addEventListener("click", () => {
		document.body.classList.toggle("dark-mode");

		// Save preference to localStorage
		const isDark = document.body.classList.contains("dark-mode");
		localStorage.setItem("darkMode", isDark);

		// Update button icon
		if (isDark) {
			toggleButton.innerHTML = '<i class="fa fa-sun-o"></i>';
		} else {
			toggleButton.innerHTML = '<i class="fa fa-moon-o"></i>';
		}
	});

	// Check for system preference
	if (
		!localStorage.getItem("darkMode") &&
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		document.body.classList.add("dark-mode");
		toggleButton.innerHTML = '<i class="fa fa-sun-o"></i>';
		localStorage.setItem("darkMode", "true");
	}

	// Listen for system preference changes
	if (window.matchMedia) {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (e) => {
				// Only apply if user hasn't manually set a preference
				if (!localStorage.getItem("darkMode")) {
					if (e.matches) {
						document.body.classList.add("dark-mode");
						toggleButton.innerHTML = '<i class="fa fa-sun-o"></i>';
					} else {
						document.body.classList.remove("dark-mode");
						toggleButton.innerHTML = '<i class="fa fa-moon-o"></i>';
					}
				}
			});
	}
});
