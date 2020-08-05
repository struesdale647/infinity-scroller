const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = 'gYByS3vTlc5dlyF5ZeESoxg2VFZSZmbng8A8Iuoz0bE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages){
		ready = true;
		loader.hidden = true;
	}
}

//Helper Function to set attributes to dom elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key])
	}
}

function displayPhotosArray() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	photosArray.forEach((photo) =>{
//Create <a> to link to Unsplash
		const item = document.createElement('a'); //Create a blank anchor element
		setAttributes(item, { //Populate each individual part of the element
			href: photo.links.html,
			target: '_blank',
		});
//Create <img> for photo
		const img = document.createElement('img');//Create a blank image element
		setAttributes(img, { //Populate each individual part of the element
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
//Event listener, check when each if finished loading
		img.addEventListener('load', imageLoaded);	
//Put <img> inside <a>, then both inside imageContainer element.
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

async function getPhotosFromApi() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotosArray();
	} catch (error){

	}
}

//Check to see if near bottom of the page, load more photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotosFromApi();
	}
});

//On load
getPhotosFromApi();