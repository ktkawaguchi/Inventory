$(document).ready(function() {
    var recordArray = new Array();
    var count = 0;
    var manData = ['HP','Dell','Apple'];
    var modelDataHP = ['Z230','Elitedesk 800 sff','Elitebook 850 G3'];
    var modelDataDell = ['Inspiron 3000','Velicity 332'];
    var modelDataApple = ['iMac','MacBook Pro','iPad'];

    //setup for the radio controls
    for (var i=0; i < manData.length; i++) {

        //creates a label for the manufactuerer and adds to form
        var label = $('<label class="btn btn-secondary"></label>');
        label.attr('id','Manu_'+manData[i]).text(manData[i]).appendTo('#manufacturerGroup');

        //creates the actual input radio and adds to the form
        var manRadio = $('<input name="manufacturers" autocomplete="off" type="radio">');
        manRadio.attr('id','radio_'+manData[i]).attr('value',manData[i]).appendTo('#Manu_'+manData[i]);

        //adding event to radio buttons to add model data
        $('#radio_'+manData[i]).change(function(){
            $('#modelGroup').empty();
            createModelGroup(this.value);
        });
    }

    //adding selcted manufacturers models to the form
    function createModelGroup(manuValue) {
        var selectedManu;
        $('#modelGroup').attr('style','');
        console.log(manuValue);
        if (manuValue==="HP"){
            selectedManu = modelDataHP;
        } else if (manuValue==="Dell") {
            selectedManu = modelDataDell;
        } else if (manuValue==="Apple") {
            selectedManu = modelDataApple;
        }
        
        for (var i=0;i<selectedManu.length;i++){

            //creates a label for the manufactuerer and adds to form
            var label = $('<label class="btn btn-secondary"></label>');
            label.attr('id','Model_'+i).text(selectedManu[i]).appendTo('#modelGroup');

            //creates the actual input radio and adds to the form
            var modelRadio = $('<input name="models" autocomplete="off" type="radio">');
            modelRadio.attr('id','radio_'+i).attr('value',selectedManu[i])
                .appendTo('#Model_'+i);
        }
    }

    //setting up the events on the buttons
    $('#btnAssetNumber').on('click',function(){$('#assetNumber').focus();});
    $('#btnSerialNumber').on('click',function(){$('#serialNumber').focus();});

    //create a new JSON object with entered data add it to array of records
    $('#btnSubmit').on('click',function(){

        //need to set up validation of fields
        var valAssetNum = $('#assetNumber').val();
        var valManufacturer = $("input:radio[name ='manufacturers']:checked").val();
        var valSerialNum = $('#serialNumber').val();
        var valModel = $("input:radio[name ='models']:checked").val();
        var valString = valAssetNum + "  " + valSerialNum + "  " + valManufacturer + " " + valModel;
        console.log(valString);

        //update DOM to include new record using tables
        createJSON(valAssetNum,valSerialNum,valManufacturer,valModel);
        console.log(recordArray);

        //reset text input fields
        $(this).closest('form').find("input[type=text], textarea").val("");
        $('#assetNumber').focus();
    });

    function createJSON (asset, serial, manufacturer, model) {
        var record = {
            "ID" : count,
            "AssetNumber" : asset,
            "SerialNumber" : serial,
            "Manufacturer" : manufacturer,
            "Model" : model
        }
        count++;
        updateDOM(record);
        recordArray.push(record);
    }

    function updateDOM (recordUpdate) {
        $('<tr></tr>').attr('id','recordRow'+recordUpdate.ID).appendTo('#recordBody');
        $('<td></td>').attr('id','recordBtn'+recordUpdate.ID).appendTo('#recordRow'+recordUpdate.ID);
        $('<button type="button" class="btn btn-primary">Delete</button>')
            .attr('id','btn'+recordUpdate.ID).appendTo('#recordBtn'+recordUpdate.ID);
        $('<td></td>').text(recordUpdate.AssetNumber).appendTo('#recordRow'+recordUpdate.ID);
        $('<td></td>').text(recordUpdate.Manufacturer).appendTo('#recordRow'+recordUpdate.ID);
        $('<td></td>').text(recordUpdate.Model).appendTo('#recordRow'+recordUpdate.ID);
        $('<td></td>').text(recordUpdate.SerialNumber).appendTo('#recordRow'+recordUpdate.ID);

        //button functionality to delete row
        $('#btn'+recordUpdate.ID).on('click',function(){
            $('#recordRow'+recordUpdate.ID).remove();
        });
    }
});