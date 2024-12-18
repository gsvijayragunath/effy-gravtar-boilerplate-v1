let client;

init();

async function init() {
  client = await app.initialized();
  client.events.on("app.activated", renderText);
  client.events.on("app.activated", generateHash);
}

async function renderText() {
  const userName = document.getElementById('userName')
  const userEmail= document.getElementById('userEmail')
  const contactData = await client.data.get("loggedInUser");
  const {
    loggedInUser: {
      contact: { name,email },
    },
  } = contactData;

  userName.innerHTML = `
  <span style="color:black; font-weight: bold;font-size:15px"  >Name:</span> 
  <span style="color: green; font-style: bold;">${name}</span>
`;
  userEmail.innerHTML = `<span style="color:black;font-weight:bold;font-size:15px">Email:</span>
  <span style="color: green; font-style: bold;">${email}</span>`

}

async function generateHash() {
  const imageSize = 200;
  const userImage = document.getElementById('userImage')
  const contactData = await client.data.get("loggedInUser");
  console.log(contactData)
  const {
    loggedInUser: {
      contact: { email },
    },
  } = contactData;


  const normalizedEmail = email.trim().toLowerCase();
  const hash = CryptoJS.MD5(normalizedEmail).toString();
  console.log("The hashed Email",hash);
  userImage.src = `https://www.gravatar.com/avatar/${hash}?s=${imageSize}&d=mp`
}
