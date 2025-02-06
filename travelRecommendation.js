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
    const searchTerm = document.getElementById("search").value.toLowerCase();  // Obtener el término de búsqueda y ponerlo en minúsculas
    fetch('travelRecommendation.json')  // Cargar el archivo JSON
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";  // Limpiar los resultados anteriores

            if (searchTerm === "countries" || searchTerm === "temples" || searchTerm === "beaches") {
                const sectionData = data[searchTerm];  // Obtener la sección correspondiente del JSON
                const sectionDiv = document.createElement("div");

                // Si buscamos "countries", necesitamos acceder a las ciudades dentro de cada país
                if (searchTerm === "countries") {
                    sectionData.forEach(country => {
                        // Iterar sobre las ciudades de cada país
                        country.cities.forEach(city => {
                            sectionDiv.innerHTML += `
                                <div class="result-item">
                                    <img src="${city.imageUrl}" alt="${city.name}" class="result-image">
                                    <p><strong>${city.name}, ${country.name}</strong>: ${city.description}</p>
                                </div>
                            `;
                        });
                    });
                } else {
                    // Para "temples" y "beaches", acceder directamente a los elementos
                    sectionData.forEach(item => {
                        sectionDiv.innerHTML += `
                            <div class="result-item">
                                <img src="${item.imageUrl}" alt="${item.name}" class="result-image">
                                <p><strong>${item.name}</strong>: ${item.description}</p>
                            </div>
                        `;
                    });
                }

                resultsDiv.appendChild(sectionDiv);
                resultsDiv.style.display = "block"; // Mostrar resultados
            } else {
                resultsDiv.innerHTML = "<p>No se encontró ninguna coincidencia.</p>";
                resultsDiv.style.display = "block"; // Mostrar mensaje de error
            }

            // Si después de todo, sigue vacío, lo ocultamos
            if (resultsDiv.innerHTML.trim() === "") {
                resultsDiv.style.display = "none";
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            resultsDiv.style.display = "none"; // Ocultar en caso de error
        });
}
