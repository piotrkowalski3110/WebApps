const canvas = document.getElementById('initials');
const initials = canvas.getContext('2d');
initials.lineWidth = 15;
initials.lineCap = 'round';

//gradient litery P
var gradientP = initials.createLinearGradient(20,480,480,20);
gradientP.addColorStop(0, "red");
gradientP.addColorStop(0.5, "purple");
gradientP.addColorStop(1, "blue");
initials.strokeStyle = gradientP;


// Litera P
initials.beginPath();
initials.moveTo(20, 20);
initials.lineTo(20, 480);
initials.stroke();

initials.beginPath();
initials.moveTo(20, 20);
initials.lineTo(220, 20);
initials.stroke();

initials.beginPath();
initials.moveTo(220, 20);
initials.lineTo(220, 210);
initials.stroke();

initials.beginPath();
initials.moveTo(220, 210);
initials.lineTo(20, 210);
initials.stroke();

// Litera K
initials.beginPath();
initials.moveTo(240, 20);
initials.lineTo(240, 480);
initials.stroke();

initials.beginPath();
initials.moveTo(240, 250);
initials.lineTo(480, 480);
initials.stroke();

initials.beginPath();
initials.moveTo(240, 250);
initials.lineTo(480, 20);
initials.stroke();