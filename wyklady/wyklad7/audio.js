const aAudio = new Audio();
const avAudio =
[
["audio/ogg", "audio/song.ogg"],
["audio/mpeg", "audio/song.mpeg"],
["audio/mp3", "audio/song.mp3"],
["audio/mp4", "audio/song.mp4"],
["audio/wav", "audio/song.wav"]
];

for (let i = 0, n = avAudio.length; i<n; j++)
{
    const astrResult = aAudio.canPLayType(avAudio[i][0])
}

if(("probably" === astrResult) || ("maybe" === astrResult))
{
    console.log(`${astrResult}:${avAudio[i][1]}`);
}
else
{
    console.log(`No:${avAudio[i][1]}`)
}

