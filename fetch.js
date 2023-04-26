const SearchButton = document.querySelector('.Search')
SearchButton.addEventListener('click', async function () {
  const Input = document.querySelector('.input')
  const getData = await Search(Input.value)
  Ui(getData)
})

const Search = (key) => {
  return fetch('http://www.omdbapi.com/?apikey=8fc9fa1f&s=' + key)
    .then(j => j.json())
    .then(res => res.Search)
}


const Ui = (Data) => {
  let f = ''
  Data.forEach(e => f += cardto(e))
  const container = document.querySelector('.Movie-container')
  container.innerHTML = f
}

document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('modal-detail-button')) {
    const im = e.target.dataset.imdbid
    const movi = await getmovie(im)
    update(movi)
  }
});

const getmovie = (i) => {
  return fetch('http://www.omdbapi.com/?apikey=8fc9fa1f&i=' + i)
    .then(j => j.json())
    .then(m => m)
    .catch(err => err.message)
}

const update = (j) => {
  const detail = det(j)
  const modalbody = document.querySelector('.modal-body')
  modalbody.innerHTML = detail
}

const cardto = function (e) {
  return ` <div class="col-md-4 my-5">
    <div class="card">
      <img src="${e.Poster}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${e.Title}</h5>
        <p class="card-text">${e.Year}</p>
        <a href="#" id="kon" class="btn btn-primary modal-detail-button"  data-toggle="modal" 
        data-target="#moviemod" data-imdbid="${e.imdbID}">show details</a>
      </div>
    </div>
  </div>
  </div>`
}

const det = function (mm) {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${mm.Poster}" class="img-fluid">
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item">
          <h4>${mm.Title} (${mm.Year})</h4>
          </li>
          <li class="list-group-item"><strong>Direcktor : </strong>${mm.Director}</li>
          <li class="list-group-item"><strong>Actros : </strong>${mm.Actors}</li>
          <li class="list-group-item"><strong>Write : </strong>${mm.Writer}</li>
          <li class="list-group-item"><strong>Plot : </strong><br>${mm.Plot}</li>
        </ul>
      </div>
    </div>
  </div>`
}
