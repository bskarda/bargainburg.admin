window.onload = function()
{
	$('#form').submit(function (e) {
		e.preventDefault();
		var form = this;

		var json = ConvertFormToJSON(form,false);
		$.ajax({
			url: 'http://api.bargainburg.co/v1/merchants/',
			type: 'POST',
			data.json,
			dataType: 'json',
			xhrFields:
				{withCredentials: true},
			crossDomain: true,
			success: function(result) {
				if (result != null)
				{
					var mid = result.merchant_id;
					window.location = 'http://admin.bargainburg.co/panel.html?id=' + mid;
				}
				return true;
			},
			error: function (result) {
				alert(result.responseText);
				return false;
			}
		});
	return false;
	});
}

function ConvertFormToJSON(form, isPatch) {
	var array = jQuery(form).serializeArray();
	var json = {};

	jQuery.each(array,function() {
		json[this.name] = this.value || '';
	});
	
	return json;
}
