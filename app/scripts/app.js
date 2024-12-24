let client;

init();

async function init() {
  client = await app.initialized();
  client.instance.resize({ height: "350px" });
  client.events.on("app.activated", () => {
    renderText(), generateHash();
  });
}

async function renderText() {
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const designation = document.getElementById("designation");
  const userIsActive = document.getElementById("active");
  const contactData = await client.data.get("contact");
  const {
    contact: { name, email, active, job_title },
  } = contactData;

  userName.innerHTML = `
  <span class="user-label">Name</span> 
  <span class="user-value">${name}</span>
`;

  userEmail.innerHTML = `
  <span class="user-label">Email</span>
  <span class="user-value email">${email}</span>
`;

  userIsActive.innerHTML = `
  <span class="user-label">Status</span>
  <span class="user-value" style="color: ${active ? "green" : "red"};">
    ${active ? "Active" : "Inactive"}
  </span>
`;
  if (job_title !== null) {
    designation.innerHTML = `
    <span class="user-label">Designation</span>
    <span class="user-value ">${job_title}</span>
  `;
  } else {
    designation.style.display = "none";
  }
}

async function generateHash() {
  const imageSize = 200;
  const userImage = document.getElementById("userImage");
  const contactData = await client.data.get("contact");
  console.log(contactData);
  const {
    contact: { email },
  } = contactData;

  const normalizedEmail = email.trim().toLowerCase();
  const hash = CryptoJS.MD5(normalizedEmail).toString();
  console.log("The hashed Email", hash);
  userImage.src = `https://www.gravatar.com/avatar/${hash}?s=${imageSize}&d=mp`;
}
