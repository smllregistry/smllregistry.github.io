
const copy= (self) => {
  var copyText = self.innerText;
  navigator.clipboard.writeText(copyText);
  // alert("Copied the text: " + copyText);
  let x = document.getElementById("snackbar");
  x.className = "show";
  x.innerText = `Text copied`
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

}
