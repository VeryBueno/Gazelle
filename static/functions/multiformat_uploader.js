(function ($) {
	var count = 1;
	var MAX_EXTRAS = 5;
	var FORMATS = [ 'MP3', 'FLAC', 'AAC', 'AC3', 'DTS' ];
	var BITRATES = [ '192', 'APS (VBR)', 'V2 (VBR)', 'V1 (VBR)', '256', 'APX (VBR)', 'V0 (VBR)', '320', 'Lossless', '24bit Lossless'];
	var filenames = new Array();
	$(document).ready(function () {
		$("#add_format").click(function () {
			createRow();
		});

		$("#remove_format").click(function () {
			removeRow();
		});
	});

	function createRow() {
		if (count >= 1) {
			$("#remove_format").show();
		}
		if (count == MAX_EXTRAS) {
			$("#add_format").hide();
		}
		var after = count > 1 ? "#extra_format_row_" + (count - 1) : '#placeholder_row_top';
		var master = $(document.createElement("tr")).attr({
			id:'extra_format_row_' + count
		}).insertAfter(after);

		$(document.createElement("td")).addClass('label').html("Extra format " + count + ":").appendTo(master);
		var row = $(document.createElement("td")).appendTo(master);
		addFile(row);
		addFormats(row);
		addBitrates(row);
		addReleaseDescription(row);
		count++;
	}

	function addFile(row) {
		var id = count;
		$(document.createElement("input")).attr({
			id:"extra_file_" + count,
			type:'file',
			name:"extra_file_" + count,
			size:'30'
		}).appendTo(row);

	}

	function addFormats(row) {
		$(document.createElement("span")).html("&nbsp;&nbsp;&nbsp;&nbsp;Format: ").appendTo(row);
		$(document.createElement("select")).attr({
			id:"format_" + count,
			name:'extra_format[]'
		}).html(createDropDownOptions(FORMATS)).appendTo(row);
	}

	function addBitrates(row) {
		$(document.createElement("span")).html("&nbsp;&nbsp;&nbsp;&nbsp;Bitrate: ").appendTo(row);
		$(document.createElement("select")).attr({
			id:"bitrate_" + count,
			name:'extra_bitrate[]'
		}).html(createDropDownOptions(BITRATES)).appendTo(row);
		/*change(
		 function () {
		 var id = $(this).attr('id');
		 if ($(this).val() == 'Other') {
		 $(this).after(
		 '<span id="other_bitrate_span_' + id
		 + '" class=""> <input type="text" name="extra_other_bitrate[]" size="5" id="other_bitrate_' + id
		 + '"><input type="checkbox" id="vbr_' + id + '" name="extra_vbr[]"><label for="vbr_' + id
		 + '"> (VBR)</label> </span>');
		 } else {
		 $("#other_bitrate_span_" + id).remove();
		 }
		 });*/
	}

	function addReleaseDescription(row) {
		var id = count;
		var desc_row = $(document.createElement("tr")).attr({ id:"desc_row"}).css('cursor', 'pointer').appendTo(row);
		$(document.createElement("a")).html("&nbsp;&nbsp;[Add Release Description]").css('marginLeft', '-5px').appendTo(desc_row).click(function () {
			$("#extra_release_desc_" + id).toggle(300);
		});
		$(document.createElement("textarea")).attr({
			id:"extra_release_desc_" + id,
			name:"extra_release_desc[]",
			cols:60,
			rows:4,
			style:'display:none;  margin-left: 5px; margin-top: 10px; margin-bottom: 10px;'
		}).appendTo(desc_row);
	}

	function createDropDownOptions(array) {
		s = "<option value='0'>---</option>";
		for (var i in array) {
			s += ("<option value=\"" + array[i] + "\">" + array[i] + "</option>");
		}
		return s;
	}

	function removeRow() {
		if (count > 1) {
			$("#placeholder_row_bottom").prev().remove();
			$("#add_format").show();
			filenames.pop();
			count--;
		}
		if (count == 1) {
			$("#remove_format").hide();
		}

	}

})(jQuery);
