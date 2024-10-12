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
};

const loadVideos = async (searchText = "") => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        const data = await res.json();
        displayVideos(data.videos);
    }
    catch (error) {
        console.log("Catch Error");
    }
};

const loadCatagoryVideo = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
        const data = await res.json();

        removeActiveClass();
        const activeBtn =document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active');
        displayVideos(data.category);
    }
    catch (error) {
        console.log("Catch Error");
    }
};

const vedioDetails = async (videoId) =>{
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
        const data = await res.json();
        vedioDisplayDetails(data.video);
    }
    catch (error) {
        console.log("Catch Error");
    }
    
}
const vedioDisplayDetails = async (video) =>{
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
    <img src = ${video.thumbnail}>
    <p class="">${video.description}</p>
    `
    //way1
    // document.getElementById('showModalData').click();
    //way2
    document.getElementById('customModel').showModal();

}

// create DisplayCategories
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <button id = "btn-${item.category_id}" onclick = "loadCatagoryVideo(${item.category_id})" class ="btn category-btn">${item.category}</button>
        `;
        categoriesContainer.appendChild(div);
    });
};
// create DisplayVideos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if(videos.length === 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class = "min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
            <img src = "../src/image/Icon.png">
            <h2 class = "text-center text-2xl font-bold">No Content in this Category</h2>
        </div>
        `
    }
    else{
        videoContainer.classList.add("grid");
    }

    videos.forEach((item) => {
        const card = document.createElement('div');
        card.classList = ("card card-compact bg-base-100");
        card.innerHTML = `
       <figure class = "h-[200px] relative">
            <img class = "h-full w-full object-cover"
            src=${item.thumbnail}
            alt="Shoes" />
            ${item.others?.posted_date?.length === 0 ? "" : `<span class = "absolute right-2 bottom-2 bg-gray-300 text-black font-semibold p-1 rounded-md">${getTimeSting(item.others?.posted_date)}</span>`
            }
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src= ${item.authors[0].profile_picture}>
            </div>
            <div>
                <h2 class ="font-bold">${item.title}</h2>
                <div class ="flex items-center space-x-1">
                    <p class = "text-gray-500 font-semibold">${item.authors[0].profile_name}</p>
                    ${item.authors[0].verified === true ? `<img class="w-4 h-4 rounded-full object-cover" src = "https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png">` : ''}
                </div>
                <p class="text-gray-400 text-sm">${item.others.views}</p>
                <p>
                    <button onclick = "vedioDetails('${item.video_id}')" class = "btn btn-error">details</button>
                </p>
            </div>
        </div>
       `;
        videoContainer.appendChild(card);
    });
};
function getTimeSting(time) {
    let year = parseInt(time / (86400 * 30 * 12));
    let remainMonth = time % (86400 * 30 * 12);
    let month = parseInt(remainMonth / (86400 * 30));
    let remaingDay = remainMonth % (86400 * 30);
    let day = parseInt(remaingDay / 86400);
    let remainghour = (remaingDay % 86400);
    let hour = parseInt(remainghour / 3600);
    let remaingminute = remainghour % 3600;
    let minute = parseInt(remaingminute / 60);
    let remaingSecond = remaingminute % 60;

    if (year > 0) {
        return `${year}Yr ${month}month ${day}day ${hour}hrs ${minute}min ${remaingSecond}sec ago`;
    }
    else if (year === 0 && month > 0) {
        return `${month}month ${day}day ${hour}hrs ${minute}min ${remaingSecond}sec ago`;
    }
    else if (month === 0 && day > 0) {
        return `${day}day ${hour}hrs ${minute}min ${remaingSecond}sec ago`;
    }
    else if (day === 0 && hour > 0) {
        return `${hour}hrs ${minute}min ${remaingSecond}sec ago`;
    }
    else if (hour === 0 && minute > 0) {
        return `${minute}min ${remaingSecond}sec ago`
    }
    else {
        return `${remaingSecond}sec ago`;
    }

};

const removeActiveClass = () =>{
    const button = document.getElementsByClassName('category-btn');
    for(let btn of button){
        btn.classList.remove('active');
    }
}
document.getElementById('search-input').addEventListener("keyup", (event)=>{
    loadVideos(event.target.value);
});

const sortVideos = (video) =>{
    console.log(video);
}
loadCatagories();
loadVideos();