function contactus() {
    window.location.href = "contactus.html";
}

document.getElementById("contactusBtn").addEventListener("click", contactus);

function home() {
    window.location.href = "travelRecommendation.html";
}

document.getElementById("homeBtn").addEventListener("click", home);

function aboutus() {
    window.location.href = "about_us.html";
}

document.getElementById("aboutusBtn").addEventListener("click", aboutus);

function search() {
    const searchTerm = document.getElementById("search").value.toLowerCase();  // Obtener el término de búsqueda y ponerlo en minúsculas.

    fetch('travelRecommendation.json')  // Cargar el archivo JSON
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";  // Limpiar los resultados anteriores

            // Verificar si el término ingresado es "countries", "temples" o "beaches"
            if (searchTerm === "countries" || searchTerm === "temples" || searchTerm === "beaches") {
                const sectionData = data[searchTerm];  // Obtener la sección correspondiente del JSON
                const sectionDiv = document.createElement("div");

                sectionData.forEach(item => {
                    sectionDiv.innerHTML += `<p><strong>${item.name}</strong>: ${item.description}</p>`;
                });

                resultsDiv.appendChild(sectionDiv);  // Mostrar los resultados en el div
            } else {
                resultsDiv.innerHTML = "<p>No se encontró ninguna coincidencia.</p>";
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}