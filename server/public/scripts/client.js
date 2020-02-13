
$('Document').ready(onReady);

function onReady(){
    console.log('JS');
    getSongs();
    $('#addSongButton').on('click', addSong)
    $('#output').on('click', '.delete', deleteSongs)
    $('#output').on('click', '.upVote', upVoteSong)
    $('#output').on('click', '.downVote', downVoteSong)
}

function deleteSongs (){
    let selectedId = $(this).parent().data('id')
        $.ajax({
            type: 'DELETE',
            url: `/songs/${selectedId}`
        }).then(function (response) {
            console.log('back from the DELETE with', response);
            getSongs(response);
        }).catch(function (err) {
            console.log(err);
            alert('houston we have a problem');
        })
}

function displaySongs(input) {
    $('#output').empty();
    for (let i = 0; i < input.length; i++) {
        $('#output').append(`<li data-id=${input[i].id}>
        ${input[i].rank} ${input[i].track}: 
        ${input[i].artist} on 
        ${input[i].published.substring(0, 10)}
        <button class="delete">Delete</button>
        <button class="upVote">UP</button>
        <button class="downVote">DOWN</button>
        </li>`); 
    }
}

function getSongs(){
    //ajax request to GET songs from sever (from db)
$.ajax({
    type: 'GET',
    url: '/songs'
}).then (function (response) {
    console.log('back from the GET with', response);
    displaySongs(response);
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

function upVoteSong (){
    let selectedId = $(this).parent().data('id');
   console.log(selectedId);
   $.ajax({
       type: 'PUT',
       url: `/songs/${selectedId}`,
       data: {
           voteDirection: 'up'
       }
   }).then(function (response) {
       console.log('back from the upVoteSong with', response);
       getSongs();
   }).catch(function (err) {
       console.log(err);
       alert('houston we have a problem');
   })
}

function downVoteSong(){
    let selectedId = $(this).parent().data('id');
    console.log(selectedId);
    $.ajax({
        type: 'PUT',
        url: `/songs/${selectedId}`,
        data: {
            voteDirection: 'down'
        }
    }).then(function (response) {
        console.log('back from the downVoteSong with', response);
        getSongs();
    }).catch(function (err) {
        console.log(err);
        alert('houston we have a problem');
    })
}