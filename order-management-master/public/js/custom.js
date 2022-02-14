$( document ).ready(function() {

	$('#other_type_box').hide();
	$('#customer_type').change(function () {
		var opt = $('#customer_type option:selected').val();
		if (opt == 6) {
			$('#other_type_box').show();
		}else{
			$('#other_type_box').hide();
		}
	});
});