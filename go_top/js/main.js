$(function () {

	// Show/hide the footer button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 300) {
			$('.go-top').fadeIn(200);
		} else {
			$('.go-top').fadeOut(200);
		}
	});

	// Animate scrolling
	$('.go-top').click(function(e) {
		e.preventDefault();		
		$('html, body').animate({scrollTop: 0}, 500, 'easeOutQuart');
	});
	
});
