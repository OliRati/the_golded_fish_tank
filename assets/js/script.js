let loggedIn = false;

/* Hamburger menu */

const hamburgericon = document.querySelector(".hamburgericon");
const menu = document.getElementById("hambmenu");
const menuLink = document.querySelectorAll(".menuItem");

hamburgericon.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

menuLink.forEach((link) => {
    link.addEventListener("click", () => {
        menu.style.display = "none";
    });
});

/* Contact form validation */

document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let errors = [];

    let username = document.getElementById('contactFormName').value;
    let usermail = document.getElementById('contactFormEmail').value;
    let userphone = document.getElementById('contactFormPhone').value;
    let usermessage = document.getElementById('contactFormMessage').value;
    let useterms = document.getElementById('contactFormTerms').checked;

    if (username === '') {
        errors.push('Vous devez saisir un Nom valide.');
    }

    if (usermail === '') {
        errors.push('Vous devez saisir un email valide.');
    }

    if (userphone === '') {
        errors.push('Vous devez saisir un numéro de téléphone valide.');
    }

    if (usermessage === '') {
        errors.push('Vous devez saisir un message.');
    }

    if (errors.length > 0) {
        document.getElementById('errorForm').innerHTML = '<p class="errormessage">' + errors.join('<br>') + '</p>';
    } else {
        // Send form to server
        fetch('./contact.php', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                usermail: usermail,
                userphone: userphone,
                usermessage: usermessage,
                useterms: useterms
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Reset form
                document.getElementById('contactFormName').value = '';
                document.getElementById('contactFormEmail').value = '';
                document.getElementById('contactFormPhone').value = '';
                document.getElementById('contactFormMessage').value = '';
                document.getElementById('contactFormTerms').checked = false;

                document.getElementById('errorForm').innerHTML = '<p>Votre message a bien été envoyé</p>';
                return response.text();
            })
            .catch(error => {
                document.getElementById('errorForm').innerHTML = '<p class="errormessage">Un problème est survenu, nous n\'avons pas pu envoyer votre message. Veuillez réessayer plus tard.</p>';
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
});

/* Json database functions */

let database = {};

let reviewsStartIndex = 0;
let forumStartIndex = 0;

function displayReviewData() {
    let reviews = database.reviews;
    let reviewsList = document.getElementById('reviewItemList');
    let added = 0;

    for (let i = reviewsStartIndex; i < Math.min(reviews.length, reviewsStartIndex + 3); i++) {
        let reviewItem = document.createElement('div');
        reviewItem.classList.add('article');
        reviewItem.classList.add('colorlightgray');
        reviewItem.innerHTML = '<div class="horodatage">Avis du ' + reviews[i].date + ' de ' + reviews[i].name + '</div><hr><div class="question">' + reviews[i].message + '</div><div class="response">' + reviews[i].response + '</div>';
        reviewsList.appendChild(reviewItem);
        added++;
    }

    reviewsStartIndex += added;

    if (reviewsStartIndex >= reviews.length) {
        moreReviews.style.display = 'none';
    }
}

const moreReviews = document.getElementById('moreReviews');
moreReviews.addEventListener('click', () => {
    displayReviewData();
});

function displayForumData() {
    let forum = database.forum;
    let forumList = document.getElementById('forumItemList');
    let added = 0;

    for (let i = forumStartIndex; i < Math.min(forum.length, forumStartIndex + 3); i++) {
        let forumItem = document.createElement('div');
        forumItem.classList.add('article');
        forumItem.classList.add('colorlightgray');
        forumItem.innerHTML = '<div class="horodatage">Demande du ' + forum[i].date + ' de ' + forum[i].name + '</div><hr><div class="question">' + forum[i].message + '</div><div class="response">' + forum[i].response + '</div>';
        forumList.appendChild(forumItem);
        added++;
    }

    forumStartIndex += added;

    if (forumStartIndex >= forum.length) {
        moreForum.style.display = 'none';
    }
}

const moreForum = document.getElementById('moreForum');
moreForum.addEventListener('click', () => {
    displayForumData();
});

function getJsonData() {
    fetch('./assets/json/database.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            database = data;
            displayReviewData();
            displayForumData();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

getJsonData();

/* Taking care of Forum */

function requestLogin() {
    const loginFrame = document.getElementById("loginFrame");
    loginFrame.style.display = "block";
    loginFrame.style.animation = "moveIn 0.5s forwards";

    document.getElementById('loginForm').addEventListener('reset', () => {
        loginFrame.style.animation = "moveOut 0.5s forwards";

        setTimeout( () => {
            loginFrame.style.display = "none";
            loginFrame.style.animation = "";
        }, 500);
    });
}

const addForum = document.getElementById('addForum');
addForum.addEventListener('click', () => {
    if (!loggedIn)
        requestLogin();
});

const addReview = document.getElementById("addReview");
addReview.addEventListener('click', () => {
    if (!loggedIn)
        requestLogin();
});