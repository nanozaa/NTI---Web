const form = document.querySelector("#user-form");
const userIdInput = document.querySelector("#user-id");
const statusMessage = document.querySelector("#status");
const profileCard = document.querySelector("#profile");
const avatar = document.querySelector("#avatar");
const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const submitButton = form.querySelector("button");

async function getUserProfile(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!response.ok) {
    throw new Error("User not found");
  }

  return response.json();
}

function displayUser(user) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  avatar.textContent = initials;
  userName.textContent = user.name;
  userEmail.textContent = user.email;
  profileCard.hidden = false;
}

async function handleSubmit(event) {
  event.preventDefault();
  const id = userIdInput.value;

  profileCard.hidden = true;
  statusMessage.className = "status";
  statusMessage.textContent = "Loading profile...";
  submitButton.disabled = true;

  try {
    const user = await getUserProfile(id);
    displayUser(user);
    statusMessage.textContent = "Profile loaded successfully.";
  } catch (error) {
    statusMessage.className = "status error";
    statusMessage.textContent = "Could not find that user. Please try another ID.";
  } finally {
    submitButton.disabled = false;
  }
}

form.addEventListener("submit", handleSubmit);