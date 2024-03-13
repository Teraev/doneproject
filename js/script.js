import movies from "./db.js";

const ul = document.querySelector('.promo__interactive-list')
const ul_genres = document.querySelector('.promo__menu-list ul')


// let genres = movies.map(item => item.Genre)

// genres = new Set(genres)

// genres = [...genres]


let genres = ['All', ...new Set(movies.map(item => item.Genre))]

function reload(arr) {
    ul.innerHTML = ""

    for (let item of arr) {
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.classList.add("promo__interactive-item")
        del.classList.add("delete")

        li.innerHTML = item.Title

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            k.select()
        }

    }
}
reload(movies)
let idx = 0


for (let genre of genres) {
    let li = document.createElement('li')
    let a = document.createElement('a')


    if (genres.indexOf(genre) === idx) {
        a.classList.add('promo__menu-item_active')
    }

    a.classList.add('promo__menu-item')

    a.href = "#"
    a.innerText = genre

    li.onclick = () => {
        selected = true
    }

    li.append(a)
    ul_genres.append(li)

    li.onclick = () => {
        idx = genres.indexOf(genre)
        ul_genres.querySelector('.promo__menu-item_active').classList.remove('promo__menu-item_active')
        a.classList.add('promo__menu-item_active')

        filterMovieList(genre)
    }
}



function filterMovieList(genre = "All") {

    if (genre === "All") {
        reload(movies)
        return
    }

    const filtered = movies.filter(movie => {
        if (movie.Genre === genre) {
            return movie
        }
    })

    reload(filtered);
}

let search = document.querySelector('.search')
search.onkeyup = () => {
    let value = search.value.toLowerCase()

    let filtered = movies.filter(item =>
        item.Title.toLowerCase().includes(value)
    )

    reload(filtered)
}


let modal_window = document.querySelector('#modal')
let closebutton = document.querySelector('.close')
let list = document.querySelector('.promo__interactive-list')
let modal_genre = document.querySelector('.modal_genre')
let modal_pl = document.querySelector('.modal_pl')
let modal_img = document.querySelector('#modal img')
let iframe = document.querySelector('.iframe')
let one  = document.querySelector('.promo__genre')
let two = document.querySelector('.promo__title')
let three = document.querySelector('.promo__descr')
let four = document.querySelector('.promo__ratings')
let bg = document.querySelector('.promo__bg')

function replay(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let idx = arr.indexOf(item)
        let li = document.createElement('li')

        li.classList.add('promo__interactive-item')
        li.innerHTML = `${idx + 1}. ${item.Title}`


        li.ondblclick = () => {
            modal_window.style.display = 'flex'
            modal_img.src = item.Poster
            modal_genre.innerHTML = item.Genre
            modal_pl.innerHTML = item.Plot

            closebutton.onclick = () => {
                modal_window.style.display = 'none'
            }
        }

        li.onclick = () => {
            iframe.src = item.Trailer + "?autoplay=1" 
            one.style.display= ' none'   
            two.style.display= ' none'   
            three.style.display= ' none'   
            four.style.display= ' none'   
            bg.style.padding = '0'
            iframe.style.display = 'flex'

        }

        place.append(li)
    }
}

replay(movies, list)