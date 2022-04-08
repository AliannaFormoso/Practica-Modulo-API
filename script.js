function revisarAPIsoporte() {
  if (window.File && window.FileReader && window.FileList) {
    alert("Todas las APIs son soportadas por su navegador");
  } else {
    alert("La API de File no es soportada por este navegador");
  }
}

window.onload = revisarAPIsoporte;

function handleFileSelect(evt) {
  var files = evt.target.files; // Objeto de tipo FileList

  // Recorra FileList y muestra archivos de video.
  for (var i = 0, f = 0; (f = files[i]); i++) {
    // Si no es un archivo de tipo video sáltate esa vuelta de bucle
    if (!f.type.match("video.*")) {
      continue;
    }

    // Recorre el bucle e inserta  los videos en la página
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        var span = document.createElement("span");
        span.innerHTML = [
          '<video class="thumb" id="video" controls  src="',
          e.target.result,
          '" title="',
          escape(theFile.name),
          '"/>'
        ].join("");

        /*- Quita la div anterior, insertBefore Inserta un nuevo elemento antes del primer 
              elemento secundario de un elemento, y despliega los botones */
        document.getElementById("apertura").style.display = "none";
        document.getElementById("list").insertBefore(span, null);
        document.getElementById("buttons").style.display = "flex";
      };
    })(f);

    reader.readAsDataURL(f);
  }

  alert(" :) Cargando video(s) :D ");
}

document
  .getElementById("files")
  .addEventListener("change", handleFileSelect, false);
