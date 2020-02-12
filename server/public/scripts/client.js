
$('Document').ready(onReady);

function onReady(){
    console.log('JS');
    getSongs();
    $('#addSongButton').on('click', addSong)
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

function addSong(){
    console.log('in addSong');
    let songToSend= {
        rank: $('#rankIn').val(),
        artist: $('#artistIn').val(),
        track: $('#trackIn').val(),
        published: $('#publishedIn').val()
    }
    console.log(songToSend);
    
    $.ajax({
        type: 'POST',
        url: '/songs',
        data: songToSend
    }).then (function (response){
        console.log('back from POST with', response);
        getSongs();
    }).catch( function(err){
        console.log(err);
     alert('issue adding song');
    })
}
