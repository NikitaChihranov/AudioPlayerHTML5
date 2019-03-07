let audio;
$('#pause').hide();

playAudio($('.playlist li:first-child'));

function playAudio(el) {
    let song = el.attr('song');
    let title = el.text();
    let artist = el.attr('artist');
    let cover = el.attr('cover');

    audio = new Audio('media/' + song);

    if (!audio.currentTime) {
        $('.duration').html('0.00');
    }
    $('.audio-player .title').text(title);
    $('.audio-player .artist').text(artist);
    $('img.cover').attr('src', 'photos/covers/' + cover);
    $('.playlist li').removeClass('active');
    el.addClass('active');
}

$('#play').click(() => {
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('.duration').fadeIn(400);
    showDuration();
});
$('#pause').click(() => {
    audio.pause();
    $('#pause').hide();
    $('#play').show();
    showDuration();
});
$('#stop').click(() => {
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
    $('.duration').fadeOut(400);
});
$('#next').click(() => {
    audio.pause();
    let next = $('.playlist li.active').next();
    if(next.length == 0) {
        next = $('.playlist li:first-child');
    }
    playAudio(next);
    audio.play();
    showDuration();
});
$('#prev').click(() => {
        audio.pause();
        let prev = $('.playlist li.active').prev();
        if (prev.length == 0) {
            prev = $('.playlist li:last-child');
        }
        playAudio(prev);
        audio.play();
        showDuration();
});

function showDuration() {
    $(audio).bind('timeupdate', () => {
        let s = parseInt(audio.currentTime % 60);
        let m = parseInt((audio.currentTime / 60) % 60);
        if (s < 10) {
            s = '0' + s;
        }
        $('.duration').html(m + '.' + s);
        let v = 0;
        if(audio.currentTime>0){
            v = Math.floor((100/audio.duration) * audio.currentTime);
        }
        $('.progress').css('width',v+'%');
    })
}

$('#volume').change(function () {
    audio.volume = parseFloat(this.value / 10);
});

$('.playlist li').click( function () {
    audio.pause();
    playAudio($(this));
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    audio.play();
    showDuration();
});
