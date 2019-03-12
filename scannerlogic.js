var testdata = ['hp','dell','apple'];
function hello (hello) {
    $('#new').append(hello);
}

for (var i=0; i < testdata.length; i++) {
    var radiobtn = $('<input type=radio name=' + testdata[i] + '></>');
    radiobtn.appendTo('#new');
}