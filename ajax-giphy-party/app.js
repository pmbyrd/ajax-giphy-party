console.log("Let's get this party started!");
//get inputs from the page
const form = document.querySelector("#search-form")
const searchInput = document.querySelector("#search-input")
const searchBtn = document.querySelector("#search-button")
const deleteBtn = document.querySelector("#delete-button")
const giphyContainer = document.querySelector(".giphy-container")
// console.log(form, searchInput.value, deleteBtn, giphyContainer, searchBtn) //works
// Allow the user to search for a GIF and when the form is submitted, make an AJAX request to the Giphy API and return a single GIF
//get the AJAX request // the search param as the endpoint
function getGif(res) {
    let gifResults = res.data.length        //the results will be in an array
    if (gifResults) {
        let randomIdx = Math.floor(Math.random() * gifResults)  //this api is not random I need to make it random
        let newDiv = document.createElement("div")
        let newGif = document.createElement("img")
        newDiv.classList.add("gif-div")
        newGif.classList.add("gif-image")
        newGif.src = res.data[randomIdx].images.original.url //follow the nesting res.data.images.original.url
        newDiv.append(newGif)
        giphyContainer.append(newDiv)
        // console.log(newGif.src)
        newDiv.addEventListener("click", removeGifs)
    }
}
// Once the Giphy API has responded with data, append the GIF to the page
//add an event listener that // callback the AJAX request to parse the user query into the ajax search param
// Allow the user to search for as many GIFs as they would like and keep appending them to the page
form.addEventListener("submit", async function(e) {
    e.preventDefault()
    // console.log("submitted")
    let searchQuery = searchInput.value
    // console.log(searchInput.value)
   const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchQuery,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  })
    // console.log("submitted")
    getGif(response.data)
    // console.log(response.data)
    // searchInput.value = ""
})
// Allow the user to remove all of the GIFs by clicking a button
// use the delete button to clear the div
// target the div container and remove all it's children 
function removeGifs (e) {
  deleteBtn.addEventListener("click", function(e) {
    let target = e.target
    console.log("delete")
    if(target.classList.contains("gid-div")) {
      e.target.remove()
    }
  })
}


/* https://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym
take this link, the basepoint is until the first ?
"?q=" is where I can add in the params that will be the value extracted from the user input
the api_key value is needed as well for authentication
that is the the data for the params passed in the second argument in the async/await
*/