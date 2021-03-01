async function searchPic(page) {
    let clientId = 'iIaBH2QMP4Qx92SE6q--oAk8s-JZv360YAa5jGax8_4';
    let query = document.getElementById('get').value;
    let url = 'https://api.unsplash.com/search/photos?per_page=30&query=' + query + '&client_id=' + clientId + '&page=' + page;
    
    const response = await fetch(url);

    const item = await response.json();
    console.log(item);

    return item;
}

document.querySelector('#btn').addEventListener('click', async () => {
    try {
        let item = await searchPic();
        if (!item.results.length) {
            throw new Error("Could not find what you are looking for!");
        } else {
            item = item.results; 
    
            let output = `<h2>Searh Results</h2>`;
                item.forEach(photo => {
                  let image = photo.urls.thumb;
                  let description = photo.alt_description;
                    
                   output += `
                   <div class = "imgStyle">
                    <img src ="${image}" alt = "${description}"/>
                   </div>
                   `;
                    document.querySelector('#output').innerHTML = output;
                });
        
                let showPage = document.querySelector('#pageD');
                showPage.style.display = 'block';
        }

    } catch (error) {
        let err = error.message;
        let errorOutput = `<h2>Error</h2>`;
        errorOutput += `<p>"${err}"</p>`;
        
        document.querySelectorAll('.error')[0].innerHTML = errorOutput;
        console.log(err);
    }
});

for (let i = 0; i < document.querySelectorAll('.pageN').length; i++) {
    document.querySelectorAll('.pageN')[i].addEventListener('click', async () => {
        let pageT = document.querySelectorAll('.pageN')[i].innerText; 
        let item = await searchPic(pageT);
        item = item.results;
        
        let output = `<h2>Searh Results</h2>`;
        item.forEach(photo => {
          let image = photo.urls.thumb;
          let description = photo.alt_description;
            
           output += `
           <div class = "imgStyle">
            <img src ="${image}" alt = "${description}"/>
           </div>
           `;
            document.querySelector('#output').innerHTML = output;
        });
    });
}