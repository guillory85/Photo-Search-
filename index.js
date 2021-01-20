async function searchPic() {
    let clientId = 'iIaBH2QMP4Qx92SE6q--oAk8s-JZv360YAa5jGax8_4';
    let query = document.getElementById('get').value;
    let url = 'https://api.unsplash.com/search/photos?per_page=30&query=' + query + '&client_id=' + clientId;

    const response = await fetch(url);

    const item = await response.json();

    console.log(url);

    return item;
}

document.querySelector('#btn').addEventListener('click', async () => {
   
        let item = await searchPic();
        item = item.results;

        let output = `<h2>Searh Results</h2>`;

        item.forEach(photo => {
            let image = photo.urls.thumb;
            
           output += `<img src ="${image}"/>`;
            document.querySelector('#output').innerHTML = output;

        });
});
