import axios from 'axios';
/*import { gsap } from "gsap";*/

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
const container = document.querySelector('.cards')

axios.get("https://api.github.com/users/hillinm")
                          .then((r) => {
                            container.prepend(gitCard(r.data));
                          })
                          .catch ((err) => console.log(err));



/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['ajablanco', 'james-coulter', 'tippitytapp', 'richardmachado', 'ChadDiaz'];

console.log(followersArray)

followersArray.forEach(element => {
  console.log(element)
  axios.get(`https://api.github.com/users/${element}`).then((r) => {
    container.appendChild(gitCard(r.data))
  })
  .catch ((err) => console.log(err));
})

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function gitCard(obj) {
  const card = document.createElement('div');
  const cardImage = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const a = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');
  const button = document.createElement('button');
  const content = document.createElement('div');
  const company = document.createElement('p');
  const nodeId = document.createElement('p');
  const blog = document.createElement('p');
  const repos = document.createElement('p');

  
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');
  a.classList.add('address');
  cardInfo.classList.add('button');
  content.classList.add('content')

  card.appendChild(cardImage)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name);
  cardInfo.appendChild(username)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  cardInfo.appendChild(button);
  cardInfo.appendChild(content);
  content.appendChild(company);
  content.appendChild(nodeId);
  content.appendChild(blog);
  content.appendChild(repos);

  cardImage.src = obj.avatar_url;
  name.textContent = obj.name;
  username.textContent = obj.login
  location.textContent = `Location: ${obj.location}`;
  profile.textContent = "Profile: ";
  a.textContent = obj.html_url;
  followers.textContent = `Followers: ${obj.followers}`
  following.textContent = `Following: ${obj.following}`
  bio.textContent = `Bio: ${obj.bio}`;
  profile.appendChild(a);
  button.textContent = "Click to Information"
  button.addEventListener('click', () => {
    cardInfo.classList.toggle("info-open");
    button.textContent = cardInfo.classList.contains("info-open")
    ? "Click to Close"
    : "Click to Information";
    if (cardInfo.classList.contains("info-open")) {
      company.textContent = `Employer: ${obj.company}`;
      nodeId.textContent = `Node ID: ${obj.node_id}`;
      blog.textContent = `Blog Site: ${obj.blog}`;
      repos.textContent = `Number of Repos: ${obj.public_repos}`;
    } else {
      company.textContent = "";
      nodeId.textContent = "";
      blog.textContent = "";
      repos.textContent = "";
    }
  })
  

  name.style.color = "#ba1434";
  username.style.color = "#ba1434";
  location.style.color = "#ba1434";
  profile.style.color = "#ba1434";
  followers.style.color = "#ba1434";
  following.style.color = "#ba1434";
  bio.style.color = "#ba1434";
  cardImage.style.border = "5px solid";
  cardImage.style.borderColor = "#ba1434";
  cardImage.style.borderRadius = "50%";
  button.style.color = "#ba1434";
  button.style.backgroundColor = "White";
  button.style.borderColor = "#ba1434";
  company.style.color = "#ba1434";
  nodeId.style.color = "#ba1434";
  blog.style.color = "#ba1434";
  repos.style.color = "#ba1434";
  GitHubCalendar(content, obj.login, { responsive: true });

  return card
}
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

axios.get("https://api.github.com/users/hillinm/followers")
                            .then((response) => {
                             response.data.forEach((person) => {
                               axios.get(`https://api.github.com/users/${person.login}`).then((r) => {
                                 container.appendChild(gitCard(r.data))
                               })
                            })
                          })
                            .catch ((err) => console.log(err));
