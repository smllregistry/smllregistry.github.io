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

    let found = 0
    for (data of json) {
      if (make_component(data, search))
        found += 1  
    }
    if (found == 0) {
      document.body.innerHTML = 
      `<div class='container container-dark p-y-md'>
        <div>
          <p>No packages found for search: <b>${search}</b></p>
        </div>
      </div>`
      return 
    }

    document.body.innerHTML += `<div id="snackbar">To Be Replaced</div>`
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
  ) return false;


  let component = `
    <div class='container container-dark p-y-md'>
      <div>
        <h1>${name}</h1>
        <p><i class="fa-regular fa-user"></i>${author}</p>
        <p><i class="fa-brands fa-github"></i> <a href="${url}">Package location</a> </p>
        <p>
          <i class="fa-solid fa-copy fa-bounce"></i> 
          <code onclick="copy(this)">${name} = "${version}"</code>
        </p>
        <p><i class="fa-solid fa-circle-info"></i>${about}</p>
      </div>
    </div>
`

  document.body.innerHTML += component
  return true
}

