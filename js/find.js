
function find() {
  let search = document.getElementById("searchbox").value
  if (search.length == 0)
    search = '*'

  let url = "./all.html?search=" + encodeURIComponent(search); 
  document.location.href = url
}


