var testdata = ['hp','dell','apple'];
function hello (hello) {
    $('#new').append(hello);
}

for (var i=0; i < testdata.length; i++) {
    
    var labelbtn = $('<span>' + testdata[i] + '</span>');
    labelbtn.appendTo('#new');

    var radiobtn = $('<input type=radio name=' + testdata[i] + '></>');
    radiobtn.attr('id',testdata[i]);
    radiobtn.appendTo('#new');

    //creates a label for the manufactuerer and adds to form
    var label = $('<label class="form-check-label"></label>');
    label.attr('id','Manu_'+testdata[i]).text(testdata[i]);;
    label.appendTo('#manufacturer');

    //creates the actual input radio and adds to the form
    var manRadio = $('<input class="form-check-input" type="radio" value="checkedValue">');
    console.log(manRadio);
    manRadio.attr('id','radio_'+testdata[i]);
    manRadio.appendTo('#Manu_'+testdata[i]);
}


{/* <label class="form-check-label">
<input class="form-check-input" type="radio" name="" id="" value="checkedValue"> Display value
</label> */}