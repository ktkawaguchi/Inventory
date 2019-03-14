$(document).ready(function() {

    var manData = ['hp','dell','apple'];
    function hello (hello) {
        $('#new').append(hello);
    }

    for (var i=0; i < manData.length; i++) {
    //     <label class="btn btn-secondary active">
    //     <input type="radio" name="options" id="" value="checkedValue"> Display value
    //   </label>

        //creates a label for the manufactuerer and adds to form
        var label = $('<label class="btn btn-secondary"></label>');
        label.attr('id','Manu_'+manData[i]).text(manData[i]).appendTo('#manufacturerGroup');

        //creates the actual input radio and adds to the form
        var manRadio = $('<input name="options" autocomplete="off" type="radio" value="checkedValue">');
        manRadio.attr('id','radio_'+manData[i]).appendTo('#Manu_'+manData[i]);
    }

    //setting up the events on the buttons
    $('#btnAssetNumber').on('click',function(){
        $('#assetNumber').focus();
    });

    $('#btnSerialNumber').on('click',function(){
        $('#serialNumber').focus();
    });

});