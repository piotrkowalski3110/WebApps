const aAudio = document.getElementById("myAudio"),
aVolumeSlider = document.getElementById("myVolumeSlider"),
aVolumeDisplay = document.getElementById("myVolumeValue"),
aMute = document.getElementById("myMute"),
aLoop = document.getElementById("myLoop"),
aCurrentTimeDisplay = document.getElementById("myCurrentTime");

function volSlider()
{
    let adVolume = aVolumeSlider.value;
    adVolume = Math.max(0, adVolume);
    adVolume = Math.min(1, adVolume);
    aAudio.volume = adVolume;
}

aAudio.addEventListener("volumechange",  () => {aVolumeDisplay.innerHTML = "Current Volume: " + aAudio.volume*100})
aAudio.addEventListener("timeupdate", () => {
    const adDuration = aAudio.duration
    aCurrentTimeDisplay.innerHTML = (isFinite(adDuration) && (!isNaN(adDuration))) ? `Current time: ${aAudio.currentTime}s/${adDuration}s` : `${aAudio.currentTime}s`
})

aAudio.addEventListener("ended", () => console.log("ended"));
aAudio.addEventListener("pause", () => console.log("pause"));
aAudio.addEventListener("play", () => console.log("play"));

document.getElementById("myPlay").addEventListener("click", () => {aAudio.play()})
document.getElementById("myPause").addEventListener("click", () => {aAudio.pause()})
document.getElementById("myRewind").addEventListener("click", () => {aAudio.currentTime -= 1})
aMute.addEventListener("change", () => {aAudio.muted = aMute.checked})
aLoop.addEventListener("change", () => {aAudio.loop = aLoop.checked})

aVolumeSlider.addEventListener("change", volSlider)
