$(document).ready(function() {
    var sampleData = {
        "assetNumber" : "0333444",
        "manufacturer": "HP",
        "serialNumber":"2U3X12TE2"
    }
    var manData = ['HP','Dell','Apple'];

    for (var i=0; i < manData.length; i++) {

        //creates a label for the manufactuerer and adds to form
        var label = $('<label class="btn btn-secondary"></label>');
        label.attr('id','Manu_'+manData[i]).text(manData[i]).appendTo('#manufacturerGroup');

        //creates the actual input radio and adds to the form
        var manRadio = $('<input name="options" autocomplete="off" type="radio" value="checkedValue">');
        manRadio.attr('id','radio_'+manData[i]).attr('value',manData[i]).appendTo('#Manu_'+manData[i]);
    }

    //setting up the events on the buttons
    $('#btnAssetNumber').on('click',function(){
        $('#assetNumber').focus();
    });

    $('#btnSerialNumber').on('click',function(){
        $('#serialNumber').focus();
    });

    //set up validation of fields

    //create a new JSON object with entered data add it to array of records
    var recordArray = new Array();
    $('#btnSubmit').on('click',function(){
        var valAssetNum = $('#assetNumber').val();
        var valManufacturer = $("input:radio[name ='options']:checked").val();
        var valSerialNum = $('#serialNumber').val();
        console.log(valAssetNum + "  " + valSerialNum + "  " + valManufacturer);
        createJSON(valAssetNum,valSerialNum,valManufacturer);
        console.log(recordArray);

        //reset fields
        $(this).closest('form').find("input[type=text], textarea").val("");
    });

    function createJSON (asset, serial, manufacturer) {
        var record = {
            "AssetNumber" : asset,
            "SerialNumber" : serial,
            "Manufacturer" : manufacturer
        }
        recordArray.push(record);
    }


});