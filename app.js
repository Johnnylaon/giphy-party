const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const gifContainer = document.getElementById("gifContainer");
const removeImagesButton = document.getElementById("remove");

searchForm.addEventListener("submit", async function (event) {
	event.preventDefault();
	const searchTerm = searchInput.value.trim();
	if (searchTerm !== "") {
		try {
			const gifData = await getData(searchTerm);
			appendGifToPage(gifData);
		} catch (error) {
			console.error("Error fetching data from Giphy API:", error);
		}
	}
});

removeImagesButton.addEventListener("click", function () {
	gifContainer.innerHTML = "";
});

async function getData(searchTerm) {
	const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
		params: {
			q: searchTerm,
			api_key: "1l35KL70QuF1ra2st1j9X5TpQVksHATN",
		},
	});

	const gifData = response.data.data;
	return gifData;
}

function appendGifToPage(gifData) {
	let numResults = gifData.length;
	if (numResults) {
		let randomIdx = Math.floor(Math.random() * numResults);
		let newCol = document.createElement("div");
		newCol.className = "col";
		let newGif = document.createElement("img");
		newGif.src = gifData[randomIdx].images.original.url;
		newCol.appendChild(newGif);
		gifContainer.appendChild(newCol);
	}
}
