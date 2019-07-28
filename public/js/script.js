function getRecipes() {

    let ingredientName = document.getElementById('ingredient').value
    if(ingredientName === '') {
        return alert('Please enter an ingredient')
    }

    let recipesDiv = document.getElementById('recipes')
    recipesDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);
            for (let i = 0; i < response.count; i++) {
				recipesDiv.innerHTML += `
				<div class="recipe">
					<a href=${response.recipes[i].source_url} target="_blank">
						<img src=${response.recipes[i].image_url}>
						<h2>${response.recipes[i].title}</h2>
					</a>
				</div>`
			}
            
        }
    }

    xhr.open('GET', `/recipes?ingredient=${ingredientName}`, true);
    xhr.send();
}

//Attach Enter-key Handler
const ENTER=13
document.getElementById("ingredient")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});