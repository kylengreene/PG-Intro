
$('Document').ready(onReady);

function onReady(){
    console.log('JS');
    getSongs();
}

function getSongs(){
    //ajax request to GET songs from sever (from db)
$.ajax({
    type: 'GET',
    url: '/songs'
}).then (function (response) {
    console.log('back from the GET with', response);
}).catch (function (err){
    console.log(err);
    alert('houston we have a problem');
})
}


