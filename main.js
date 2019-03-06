let audio;
$('#pause').hide();

playAudio($('.playlist li:first-child'));
function playAudio(el){
    let song = el.attr('song');
    let title = el.text();
    let artist = el.attr('artist');
    let cover = el.attr('cover');

    audio = new Audio('media/' + song);

    if(!audio.currentTime){
        $('.duration').html('0.00');
    }
    $('.audio-player .title').text(title);
    $('.audio-player .artist').text(artist);
    $('img.cover').attr('src', 'photos/covers/' + cover);
    $('.playlist li').removeClass('active');
    el.addClass('active');
}