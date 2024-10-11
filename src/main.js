//1. fetch Load and show categories on html
//create loadCatagories
const loadCatagories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCategories(data.categories);
    }
    catch (error) {
        console.log("Catch Error");
    }
}

const loadVideos = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    displayVideos(data.videos);

}
// create DisplayCategories
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach((item) => {
        const button = document.createElement('button');
        button.classList.add("btn")
        button.innerText = item.category;
        categoriesContainer.appendChild(button);
    });
}

// create DisplayVideos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videos.forEach((item) => {
        const card = document.createElement('div');
        card.classList = ("card card-compact bg-base-100");
        card.innerHTML = `
       <figure>
            <img
            src=${item.thumbnail}
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
       `;
        videoContainer.appendChild(card);
    });
}
loadCatagories();
loadVideos();