/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close"),
      /*  OVERVIEW  */    
      overView = document.getElementById("movie-detail"),
      ovClose = document.getElementById("ov-close");
      
/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener("click", () =>{
        navMenu.classList.add("show-menu");
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener("click", () =>{
        navMenu.classList.remove("show-menu");
    })
}


/* TMDB API */
const API_KEY = "api_key=f099b3088922e72dcec59a7c66b4c35a&language=pl-PL",
      BASE_URL = "https://api.themoviedb.org/3/",
      API_URL = BASE_URL + "movie/now_playing?" + API_KEY,
      IMG_URL = 'https://image.tmdb.org/t/p/w780',
      searchURL = BASE_URL + 'search/movie?'+API_KEY,
      /*IMG_URL = 'https://image.tmdb.org/t/p/original';*/
      main = document.getElementById('main'),
      form = document.getElementById('search-form'),
      search = document.getElementById('s-inp');


getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        //console.log(data);
        showMovies(data.results);
    })
}



function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, release_date, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('home_container#home');
        movieEl.innerHTML = 
        `
        <div class="swiper home-swiper">
            <div class="swiper-wrapp">
                <div class="swiper-slide">
                    <div class="home_content grid">
                        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}" class="img-home" id="img_home${id}">
                        <div class="home_details">
                            <h1 class="home_details-title">${title}</h1>
                            <h2 class="home_details-year" id="movie-year"> ${release_date} </h2>
                            <div class="r-round ${getColor(vote_average)}"> 
                                <h2 class="rate"> ${vote_average} </h2>
                            </div>
                        </div>

                        <div class="home_overview" id="home-ov">
                            <h1> Click IMG for more </h1>
                        </div>
                    </div>
                </div>  
            </div>   
        </div>
        <div class="movie_detail" id="movie-dt${id}">
            <div class="ov_close" id="ov-close${id}">
                <i class="material-icons-outlined ico">close</i>
            </div>
            <h1 class="home_discription1"> About ${title} </h1>
            <h2 class="home_discription2"> ${overview}</h2>
            <a href="#" class="btn-view" id="${id}"> View More </a>
        </div>
        `
        main.appendChild(movieEl);
        const btnIMG = document.getElementById('img_home'+id);
        const overV = document.getElementById("movie-dt"+id)
            btnIMG.addEventListener('click', () => {
                overV.classList.add("mdBlock");
            })
        const closeV = document.getElementById("ov-close"+id)
            closeV.addEventListener('click', () => {
                overV.classList.remove("mdBlock");
            })
    })

/*
    data.forEach(movie1 => {
        const {title, overview, id} = movie1;
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie_detail');
        movieInfo.innerHTML = 
        `  
            <div class="ov_close" id="ov-close${id}">
                <i class="material-icons-outlined ico">close</i>
            </div>
            <h2 class="home_discription1"> About ${title} <h2>
            <h4 class="home_discription2"> ${overview}</h4>
        `

        main.appendChild(movieInfo);
        const overV = document.getElementById("movie-dt"+id)
            document.getElementById(id).addEventListener('click', () => {
                overV.classList.add("mdBlock");
            })
        const closeV = document.getElementById("ov-close"+id)
            closeV.addEventListener('click', () => {
                overV.classList.remove("mdBlock");
            })
    })

*/
}

function getColor(vote) {
    if(vote >= 7) {
        return 'rGreen'
    }else if (vote >=5){
        return 'rOrange'
    } else {
        return 'rRed'
    }
} 

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const searchDump = search.value;
    console.log(search.value);
    if (searchDump) {
        getMovies(searchURL+'&query='+searchDump);
    } else {
        getMovies(API_URL);
    }
})
