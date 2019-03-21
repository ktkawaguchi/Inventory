// TODO: Add button for model name that doesn't exist will popup modal which will update DB
// TODO: Add more fields for relevant information
$(document).ready(function() {
	// $.getScript('assetValidation.js', function() {
	//     console.log('Script loaded but not necessarily executed.');
	// });
	var recordArray = new Array();
	var count = 0;
	var manData = [ 'HP', 'Dell', 'Apple' ];
	var modelDataHP = [
		'Z230',
		'Elitedesk 800',
		'Elitebook 850 G2',
		'Z220',
		'Z240',
		'Powerbook G1',
		'Elitebook 850 G1',
		'Elitedesk 900 sff',
		'Z250',
		'PB3432',
		'Envy 940',
		'LaserJet 220',
		'Photosmart 950',
		'LaserJet 4000',
		'LaserJet 5000',
		'PB2322',
		'All In One 9000',
		'All In One 8000',
		'Envy 800',
		'Envy 700',
		'Smartbook'
	];
	var modelDataDell = [ 'Inspiron 3000', 'Velicity 332', 'XPS 15', 'XPS 13', 'Alienware 15 R3' ];
	var modelDataApple = [ 'iMac', 'MacBook Pro', 'iPad', 'iPhone X', 'MacBook Air', 'iMac Pro' ];
	var headers = {
		ID: 'Record Row',
		AssetNumber: 'Asset Number',
		SerialNumber: 'Serial Number',
		Manufacturer: 'Manufacturer',
		Model: 'Model'
	};

	//creates the manufacturers radio buttons dynamically
	for (var i = 0; i < manData.length; i++) {
		var label = $('<label class="btn btn-info"></label>');
		label.attr('id', 'Manu_' + manData[i]).text(manData[i]).appendTo('#manufacturerGroup');

		var manRadio = $('<input name="manufacturers" autocomplete="off" type="radio">');
		manRadio.attr('id', 'radio_' + manData[i]).attr('value', manData[i]).appendTo('#Manu_' + manData[i]);

		//adding event to radio buttons to add model data
		$('#radio_' + manData[i]).change(function() {
			$('#modelGroup').css('opacity', 0).empty();
			createModelGroup(this.value);
		});
	}

	//setting up the click events on the buttons
	$('#btnAssetNumber').on('click', function() {
		$('#assetNumber').focus();
	});
	$('#btnSerialNumber').on('click', function() {
		$('#serialNumber').focus();
	});
	$('#btnClear').on('click', function() {
		$('form input:radio').each(function() {
			$(this).prop('checked', false);
		});
		$(this).closest('form').find('input[type=text], textarea').val('');
		$('#modelGroup').css('opacity', 0).empty();
		$('#assetNumber').focus();
	});
	$('#btnExport').on('click', function() {
		exportToCSV(headers, recordArray, 'New Inventory');
	});

	//create a new JSON object with entered data add it to array of records
	$('#btnSubmit').on('click', function() {
		var valAssetNum = $('#assetNumber').val();
		var valManufacturer = $("input:radio[name ='manufacturers']:checked").val();
		var valSerialNum = $('#serialNumber').val();
		var valModel = $("input:radio[name ='models']:checked").val();
		var valString = valAssetNum + '  ' + valSerialNum + '  ' + valManufacturer + ' ' + valModel;
		console.log(valString);

		//validate data
		if (validateFields(valAssetNum, valSerialNum)) {
			createJSON(valAssetNum, valSerialNum, valManufacturer, valModel);
			console.log(recordArray);

			//reset text input fields
			$(this).closest('form').find('input[type=text], textarea').val('');
			$('#assetNumber').focus();
		}
	});

	//adding selcted manufacturers models to the form
	function createModelGroup(manuValue) {
		var selectedManu;
		$('#modelGroup').css('opacity', 1);
		if (manuValue === 'HP') {
			selectedManu = modelDataHP;
		} else if (manuValue === 'Dell') {
			selectedManu = modelDataDell;
		} else if (manuValue === 'Apple') {
			selectedManu = modelDataApple;
		}

		for (var i = 0; i < selectedManu.length; i++) {
			var labelModel = $('<label class="btn btn-secondary"></label>');
			labelModel.attr('id', 'Model_' + i).text(selectedManu[i]).appendTo('#modelGroup');
			var modelRadio = $('<input name="models" autocomplete="off" type="radio">');
			modelRadio.attr('id', 'radio_' + i).attr('value', selectedManu[i]).appendTo('#Model_' + i);
		}
	}

	function createJSON(asset, serial, manufacturer, model) {
		var record = {
			ID: count,
			AssetNumber: asset,
			SerialNumber: serial,
			Manufacturer: manufacturer,
			Model: model
		};
		count++;
		updateTable(record);
		recordArray.push(record);
	}

	function updateTable(recordUpdate) {
		$('<tr></tr>').attr('id', 'recordRow' + recordUpdate.ID).appendTo('#recordBody');
		$('<td></td>').attr('id', 'recordBtn' + recordUpdate.ID).appendTo('#recordRow' + recordUpdate.ID);
		$('<button type="button" class="btn btn-primary">Delete</button>')
			.attr('id', 'btn' + recordUpdate.ID)
			.appendTo('#recordBtn' + recordUpdate.ID);
		$('<td></td>').text(recordUpdate.AssetNumber).attr('class', 'tdAsset').appendTo('#recordRow' + recordUpdate.ID);
		$('<td></td>').text(recordUpdate.Manufacturer).appendTo('#recordRow' + recordUpdate.ID);
		$('<td></td>').text(recordUpdate.Model).appendTo('#recordRow' + recordUpdate.ID);
		$('<td></td>')
			.text(recordUpdate.SerialNumber)
			.attr('class', 'tdSerial')
			.appendTo('#recordRow' + recordUpdate.ID);

		//button functionality to delete row
		$('#btn' + recordUpdate.ID).on('click', function() {
			$('#recordRow' + recordUpdate.ID).remove();
		});
	}

	function validateFields(assetNum, serialNum) {
		var isValid = true;
		// Make sure AN and SN are not empty
		$('.tdAsset').each(function() {
			var test = $(this).text();
			if (test === assetNum) {
				console.log('Asset matched on table alerady!!');
				isValid = false;
			}
		});
		$('.tdSerial').each(function() {
			var test = $(this).text();
			if (serialNum === test) {
				alert($(this).html());
				console.log('This serial already exists!!');
				isValid = false;
			}
		});
		if (assetNum === '') {
			console.log('Empty asset number');
			isValid = false;
		}
		if (serialNum === '') {
			console.log('Empty serial number');
			isValid = false;
		}
		return isValid;
	}

	function convertToCSV(objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';

		for (var i = 0; i < array.length; i++) {
			var line = '';
			for (var index in array[i]) {
				if (line != '') line += ',';

				line += array[i][index];
			}

			str += line + '\r\n';
		}
		return str;
	}

	function exportToCSV(headers, items, fileTitle) {
		if (headers && items[0].ID !== 'Record Row') {
			items.unshift(headers);
		}

		// Convert Object to JSON
		var jsonObject = JSON.stringify(items);
		var csv = convertToCSV(jsonObject);

		var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

		var blob = new Blob([ csv ], { type: 'text/csv;charset=utf-8;' });
		if (navigator.msSaveBlob) {
			// IE 10+
			navigator.msSaveBlob(blob, exportedFilenmae);
		} else {
			var link = document.createElement('a');
			if (link.download !== undefined) {
				// feature detection
				// browsers that support HTML5 download attribute
				var url = URL.createObjectURL(blob);
				link.setAttribute('href', url);
				link.setAttribute('download', exportedFilenmae);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	}
});
