const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const segments = [
  "หูฟัง", "เมาส์", "คีย์บอร์ด", "จอ", "เก้าอี้", 
  "Nitro", "ไมค์", "พัดลม RGB", "จอย", "โต๊ะ"
];
const colors = ["#ff3b3b", "#ff7f50", "#ff3b3b", "#ff7f50", "#ff3b3b", "#ff7f50", "#ff3b3b", "#ff7f50", "#ff3b3b", "#ff7f50"];

let angle = 0;
let spinning = false;

function drawWheel() {
  const anglePerSegment = 2 * Math.PI / segments.length;
  for (let i = 0; i < segments.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 240, anglePerSegment * i, anglePerSegment * (i + 1));
    ctx.lineTo(250, 250);
    ctx.fill();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(anglePerSegment * i + anglePerSegment / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "18px Orbitron";
    ctx.fillText(segments[i], 230, 10);
    ctx.restore();
  }
}

function easeOutCubic(t) {
  return (--t) * t * t + 1;
}

function drawRotated(rotAngle) {
  ctx.clearRect(0, 0, 500, 500);
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate((rotAngle * Math.PI) / 180);
  ctx.translate(-250, -250);
  drawWheel();
  ctx.restore();
}

function spinWheel() {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    Swal.fire("กรุณากรอกชื่อก่อนหมุน!", "", "warning");
    return;
  }

  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${today.getMonth() + 1}`;

  checkIfUserSpun(username, currentMonth).then((alreadySpun) => {
    if (alreadySpun) {
      Swal.fire("คุณหมุนไปแล้วในเดือนนี้!", "กลับมาหมุนใหม่เดือนหน้า", "info");
      return;
    }

    if (today.getDate() !== 1) {
      Swal.fire({
        icon: 'warning',
        title: 'ยังหมุนไม่ได้!',
        text: 'สามารถหมุนได้เฉพาะวันที่ 1 ของเดือนเท่านั้น',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    if (spinning) return;
    spinning = true;

    let spinAngle = Math.floor(3600 + Math.random() * 1000);
    let duration = 4000;

    const start = Date.now();
    const animate = () => {
      let now = Date.now();
      let time = now - start;
      let progress = time / duration;
      if (progress < 1) {
        angle = (spinAngle * easeOutCubic(progress)) % 360;
        drawRotated(angle);
        requestAnimationFrame(animate);
      } else {
        let degrees = angle % 360;
        let segmentIndex = Math.floor(segments.length - (degrees / 360) * segments.length) % segments.length;
        const prize = segments[segmentIndex];
        document.getElementById("result").innerText = `คุณได้รับ: ${prize}`;
        saveResultToFirebase(username, prize, currentMonth);
        loadWinners();
        spinning = false;
      }
    };
    animate();
  });
}

drawWheel();
document.getElementById("spin").addEventListener("click", spinWheel);
