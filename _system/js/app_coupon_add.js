/**
 * DOCUMENT READY EVENT HANDLER
 * initialize the page
 */
$(document).ready(function() {

	// CHECK LOGIN COOKIE
	// redirect user to login upon login failure
	if($.cookie("mid") == null) {
		BB_Log("[MERCHANT COOKIE]: FAILED");
		window.location.href="../../";
	}

	/**
	 * HANDLE SUBMIT BUTTON
	 * attempt to create coupon
	 */
	$("#form-coupon-add").bind("submit", function(e) {
		// STOP DEFAULT BEHAVIOR
		e.preventDefault();
		e.stopPropagation();

		// FORM LOADING SCREEN
		BB_disableForm("#form-coupon-add");

		// ATTEMPT SUMBISSION
		BB_Log("[Add Coupon > From > Submit]: STARTED");
		var form_data  = ConvertFormToJSON(this, false);
		$.ajax({
    			url: $.cookie("api_url")+'coupons/',
				type: 'POST',
				data: form_data,
				dataType: 'json',
				xhrFields: {withCredentials: true},
				crossDomain: true,
	 			success: function(result) {
	 				BB_Log("[Add Coupon > From > Submit]: SUCCESS");
	 				console.log(result);
	 				var success = '<div class="alert alert-success"><strong>Success!</strong> The coupon has been created.</div><a href="../../" class="btn btn-default"><i class="icon-dashboard"></i> Return to the Dashboard</a>'; 
	 				$("#form-wrapper").html(success); 		
				},
				error: function(result) {
					BB_Log("[Add Coupon > From > Submit]: FAILED");
					BB_Log("[Add Coupon > From > Submit]: Result");
					BB_Log(result);
					// ERROR 
					if(result.status == 404) {
						BB_Error("#form-coupon-add-error", "The server is currently unavailable.");
					}
					else {
						BB_Error("#form-coupon-add-error", result.responseJSON);
					}
					BB_enableForm("#form-coupon-add");
				}
			});	

	});

	/**
	 * HANDLE CANCEL BUTTON
	 * ask user if they are sure & redirect to dashboard if they are
	 */
	$("#form-coupon-add").bind("reset", function(e) {
		BB_Log("[Add Coupon > Form > Cancel]: TRIGGERED");
		e.preventDefault();
		e.stopPropagation();
		var sure = confirm("Are You sure You want to Cancel?");
		if(sure) {
			BB_Log("[Add Coupon > Form > Cancel]: CONFIRMED BY USER");
			window.location.href = "../../";
		}
		else {
			BB_Log("[Add Coupon > Form > Cancel]: STOPPED BY USER");
		}
	});

});