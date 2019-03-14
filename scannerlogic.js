var manData = ['hp','dell','apple'];
function hello (hello) {
    $('#new').append(hello);
}

for (var i=0; i < manData.length; i++) {

    //creates a label for the manufactuerer and adds to form
    var label = $('<label class="form-check-label"></label>');
    label.attr('id','Manu_'+manData[i]).text(manData[i]).appendTo('#manufacturerGroup');

    //creates the actual input radio and adds to the form
    var manRadio = $('<input class="form-check-input" type="radio" value="checkedValue">');
    manRadio.attr('id','radio_'+manData[i]).appendTo('#Manu_'+manData[i]);
}