

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  let search = urlParams.get('search');

  if (search == null || search == undefined)
    search = "*";

  if (search != "*" ) {
    let a = `SMLL Registry | ${search}`
    document.title = a 
  } else {
    let a = `SMLL Registry | Packages`;
    document.title = a 
  }
  
    let url = "https://raw.githubusercontent.com/smllregistry/registry/main/.register"; 
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response);
    }
    return response.text();
  }).then(data => {
    let json = JSON.parse(data);
    json = json .sort(compare)
    for (data of json) {
      make_component(data, search)
    }
  }).catch(error => {
    console.error('Error loading file:', error);
  });
}


function compare( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}


const make_component = (data, search) => {
  let name = data.name
  let url = data.url 
  let author = data.author
  let about = data.about
  let version = data.version
  // console.log(data)

  if (search != '*')
  if (name.indexOf(search) == -1 
    && url.indexOf(search) == -1  
    && author.indexOf(search) == -1  
    && about.indexOf(search) == -1  
    && version.indexOf(search) == -1  
  ) return;


  let component = `
    <div class="Card">
      <h3 class="Header">${name}</h3> 
      <div class="CardInner">
      <label><i class="fa-regular fa-user"></i>${author}</label>
      <label><i class="fa-brands fa-git-alt"></i> <a href="${url}"> Project Repo </a> </label>
        <label>
          <i class="fa-solid fa-copy fa-bounce"></i> 
          <code>${name} = "${version}"</code>
        </label>
        <label><i class="fa-solid fa-circle-info"></i>${about}</label>
       </div>
    </div>`

  document.body.innerHTML += component
}

