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
}