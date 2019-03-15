$(document).ready(function() {
    var recordArray = new Array();
    var count = 0;
    var manData = ['HP','Dell','Apple'];

    //setup for the radio controls
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

    //create a new JSON object with entered data add it to array of records
    $('#btnSubmit').on('click',function(){

        //need to set up validation of fields
        var valAssetNum = $('#assetNumber').val();
        var valManufacturer = $("input:radio[name ='options']:checked").val();
        var valSerialNum = $('#serialNumber').val();
        var valString = valAssetNum + "  " + valSerialNum + "  " + valManufacturer;
        console.log(valAssetNum + "  " + valSerialNum + "  " + valManufacturer);

        //update DOM to include new record using tables
        createJSON(valAssetNum,valSerialNum,valManufacturer);
        console.log(recordArray);

        //reset fields
        $(this).closest('form').find("input[type=text], textarea").val("");
    });

    function createJSON (asset, serial, manufacturer) {
        var record = {
            "ID" : count,
            "AssetNumber" : asset,
            "SerialNumber" : serial,
            "Manufacturer" : manufacturer
        }
        count++;
        updateDOM(record);
        recordArray.push(record);
    }

    function updateDOM (recordUpdate) {

        //need to add functionality for delete of records
        var tableRow = $('<tr></tr>').attr('id','recordRow'+recordUpdate.ID).appendTo('#recordBody');
        var td = $('<td></td>').html(function(){
            return "<button type=\"button\" id=\"btn\">Delete</button>"
        }).appendTo('#recordRow'+recordUpdate.ID);
        $('#btn'+recordUpdate.ID).attr('class','btn btn-primary');
        
        var td = $('<td></td>').text(recordUpdate.AssetNumber).appendTo('#recordRow'+recordUpdate.ID);
        var td = $('<td></td>').text(recordUpdate.SerialNumber).appendTo('#recordRow'+recordUpdate.ID);
        var td = $('<td></td>').text(recordUpdate.Manufacturer).appendTo('#recordRow'+recordUpdate.ID);
    }
});