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

document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el botón
    const submitButton = document.querySelector(".con");

    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita que la página se recargue

        // Selecciona los inputs
        const nameInput = document.getElementById("text");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        // Limpia los campos
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        // Muestra el mensaje de agradecimiento
        alert("¡Gracias por tu mensaje!");
    });
});

function search() {
    const searchTerm = document.getElementById("search").value.trim().toLowerCase();  // Obtener el término de búsqueda y limpiar espacios
    const resultsDiv = document.getElementById("results");

    // Si el input está vacío, ocultamos los resultados y salimos de la función
    if (!searchTerm) {
        resultsDiv.innerHTML = "";
        resultsDiv.style.display = "none";
        return;
    }

    fetch('travelRecommendation.json')
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = "";  // Limpiar los resultados anteriores
            let found = false;  // Variable para saber si encontramos algo

            // Si el término coincide con una lista completa
            if (data[searchTerm]) {
                found = true;
                const sectionData = data[searchTerm];
                const sectionDiv = document.createElement("div");

                sectionData.forEach(item => {
                    sectionDiv.innerHTML += `
                        <div class="result-item">
                            <img src="${item.imageUrl}" alt="${item.name}" class="result-image">
                            <div class="result-text">
                                <strong>${item.name}</strong>
                                <p>${item.description || "Sin descripción"}</p>
                            </div>
                        </div>
                    `;
                });

                resultsDiv.appendChild(sectionDiv);
            } else {
                // Buscar dentro de cada lista si hay coincidencia con el input
                Object.keys(data).forEach(category => {
                    data[category].forEach(item => {
                        if (item.name.toLowerCase().includes(searchTerm)) {
                            found = true;
                            const itemDiv = document.createElement("div");
                            itemDiv.classList.add("result-item");

                            itemDiv.innerHTML = `
                                <img src="${item.imageUrl}" alt="${item.name}" class="result-image">
                                <div class="result-text">
                                    <strong>${item.name}</strong>
                                    <p>${item.description || "Sin descripción"}</p>
                                </div>
                            `;

                            resultsDiv.appendChild(itemDiv);
                        }
                    });
                });
            }

            // Mostrar u ocultar resultados dependiendo de si encontramos coincidencias
            if (found) {
                resultsDiv.style.display = "grid";
            } else {
                resultsDiv.innerHTML = "<p>No se encontró ninguna coincidencia.</p>";
                resultsDiv.style.display = "block";
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            resultsDiv.style.display = "none"; // Ocultar en caso de error
        });
}
