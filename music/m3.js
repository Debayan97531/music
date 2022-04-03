let previous=document.getElementById('pre');
let play=document.getElementById('play');
let next=document.getElementById('next');
let title=document.getElementById('title');
let recent_volume=document.getElementById('volume');
let volume_show=document.getElementById('volume_show');
let slider=document.getElementById('duration_slider');
let show_duration=document.getElementById('show_duration');
let track_image=document.getElementById('track_image');
let auto_play=document.getElementById('auto');
let present=document.getElementById('present');
let total=document.getElementById('total');
let artist=document.getElementById('artist');

let timer;
let autoplay=0;

let index_no=0;
let Playing_song=false;

//create audio element
let track=document.createElement('audio');
 
//all song list

let All_song=[
    {
        name:"Srivalli",
        path:"1.mp3.mp3",
        img:"img1.jpg",
        singer:"From Pushpa"
    },
    {
        name:"Lagan Lagi Re",
        path:"2.mp3.mp3",
        img:"img2.jpg",
        singer:"Kavitha Seth,Shreya Ghosal"
    },
    {
        name:"Nayan",
        path:"3.mp3.mp3",
        img:"img3.png",
        singer:"Dhwani Bhanushali"
    },
    {
        name:"O Bolle",
        path:"4.mp3.mp3",
        img:"img5.jpg",
        singer:"Kanika Kapoor"
    }, 
    {
        name:"Tu Aake Dekhle",
        path:"5.mp3.mp3",
        img:"img4.jpg",
        singer:"King"
    }
];

//all functions
//function load the track
function load_track(index_no){
    clearInterval(timer);
    reset_slider();

    track.src=All_song[index_no].path;
    title.innerHTML=All_song[index_no].name;
    track_image.src=All_song[index_no].img;
    artist.innerHTML=All_song[index_no].singer;
    track.load();

    timer=setInterval(range_slider,1000);
    total.innerHTML=All_song.length;
    present.innerHTML=index_no+1;
}
load_track(index_no);

//mute sound function
function mute_sound(){
    track.volume=0;
    volume.value=0;
    volume_show.innerHTML=0;
}
//checking song is playing or not
function justplay(){
    if(Playing_song==false)
    {
        playsong();
    }
    else{
        pausesong();
    }
}
//play song
function playsong(){
    track.play();
    Playing_song=true;
    play.innerHTML='<i class="fas fa-pause"></i>';
}
//pause song
function pausesong(){
    track.pause();
    Playing_song=false;
    play.innerHTML='<i class="fas fa-play"></i>';
}
//next song
function next_song(){
    if(index_no<All_song.length-1){
        index_no+=1;
        load_track(index_no);
        playsong();
    }
    else{
        index_no=0;
        load_track(index_no);
        playsong();
    }
}
//previous song 
function previous_song(){
    if(index_no>0)
    {
        index_no-=1;
        load_track(index_no);
        playsong();
    }
    else{
        index_no=All_song.length;
        load_track(index_no);
        playsong();
    }
}
//change volume
function volume_change(){
    volume_show.innerHTML=recent_volume.value;
    track.volume=recent_volume.value / 100;
}
//autoplay function
function autoplay_switch(){
    if(autoplay==1)
    {
        autoplay=0;
        auto_play.style.background="rgba(255,255,255,.2)";
    }
    else
    {
        autoplay=1;
        auto_play.style.background="#FF8A65";
    }
}
//reset song slider
function reset_slider(){
    slider.value=0;
}
//change slider position
function change_duration(){
    slider_position=track.duration*(slider.value/100);
    track.currentTime=slider_position;
}
function range_slider(){
    let position=0;

    //update slider position
    if(!isNaN(track.duration)){
        position=track.currentTime*(100/track.duration);
        slider.value=position;
    }

    //function will run when track is ended
    if(track.ended){
        play.innerHTML='<i class="fas fa-play"></i>';
        if(autoplay==1)
        {
            index_no+=1;
            load_track(index_no);
            playsong();
        }
    }
}