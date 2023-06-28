/*
- MILESTONE 2 :
  - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed
                //-------------------------------/
Ragionamento base milestone 2
1. creare un ciclo che percorre l'intero array 
2. prendere l'html statico 
    - inserirlo in una variabile 
    - sostituire le parti dinamiche con delle variabili 
    - inserire la variabile (che contiene l'html) nell'contenitore che lo conderrà
                //-------------------------------/
- MILESTONE 3 :
  - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
  - Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

Ragionamento base milestone 3
1. aggiungere un event-listener a ogni pulsante like
    - dato il button ha un data-postid="id" possiamo verificare il valore di questo attributo castom e prenderlo come indice dell'arrei (questo ritornerà l'oggetto intero )
2. prendere il valore dei like dell'oggetto e incrementarlo  
3. dopo di che inserisco nell'elemento specifico il nuovo valore 
                //-------------------------------/
- BONUS 
  - 1. Formattare le date in formato italiano (gg/mm/aaaa)
  - 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
  - 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

ragionamento base bonus
- 1 nell'creare l'html  creiamo una funzione che prende la data corrende e la slitta restituendola con ordine differente (quindi da 2021-06-25 a 25-06-2021)
*/

/*-------------
Data
--------------*/
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
/*-------------
global variables
--------------*/
const postsContainer = document.getElementById('container');
/*-----------
functions
-----------*/
const createHTML = (currentObject) => {
    const authorInitials = formatCurrentName(currentObject)
    const createdFormated = formatDate(currentObject.created)
    const elementHtml =  `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${
                            currentObject.author.image != null ? `
                            <img class="profile-pic" 
                            src="${currentObject.author.image}"
                            alt="${currentObject.author.name}"
                            > 
                            ` 
                            :
                            authorInitials.toUpperCase()                
                        }
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">
                        ${currentObject.author.name}
                        </div>
                        <div class="post-meta__time">
                        ${createdFormated}
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">
                ${currentObject.content}
            </div>
            <div class="post__image">
                <img src="${currentObject.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${currentObject.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${currentObject.id}" class="js-likes-counter">${currentObject.likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
    `
    return elementHtml;
};

const formatCurrentName = (currentObject) => {
    const fullNameSplitted = currentObject.author.name.split(' ')
    const currentName = fullNameSplitted[0]
    const currentLastname = fullNameSplitted[1]
    const authorInitials = currentName[0] + currentLastname[0]
    return authorInitials
};

const formatDate = (currentCreated) => {
    splittedDate = currentCreated.split('-')
    const formattedDate = splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0]
    return formattedDate
}

const incrementLikes = (cuttentButton)=> {
    const likeCounterElement = document.getElementById(`like-counter-${cuttentButton.getAttribute( "data-postid")}`)
    cuttentButton.classList.add('like-button--liked')
    let currentLikes = posts[cuttentButton.getAttribute( "data-postid") - 1].likes
    currentLikes++
    likeCounterElement.innerHTML = currentLikes
};

const appStart = () => {
    posts.forEach(currentPost => {
        const postHtml = createHTML(currentPost);
        postsContainer.innerHTML += postHtml;
    });
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {
        button.addEventListener('click', (e)=> {
            e.preventDefault()
            incrementLikes(button)
        })
    })
};


appStart();