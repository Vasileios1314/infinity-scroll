const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash api
const count = 30;
const apiKey = "HHvRL0xrdklE6_iVORqnhONsYuznI7uJMcN_y-9pODM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if img were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// helper function to set attributes on dom els
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}



// create elements for link,photos & add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
//    run function  for each obj in photo array
photosArray.forEach((photo) => {
    // create <a> to link unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
        href: photo.links.html,
        target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    // event listener , check finished loading
    img.addEventListener("load", imageLoaded)
    // put <img> inside <a>, then put both inside imgcontainer
    item.appendChild(img);
    imageContainer.appendChild(item);
});
}

// get photos from api
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        // catch error.
    } 
}

// load more photos
window.addEventListener("scroll", () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    } 
});



// on load
getPhotos();
