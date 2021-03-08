async function searchPic(page) {
    let clientId = 'iIaBH2QMP4Qx92SE6q--oAk8s-JZv360YAa5jGax8_4';
    let query = document.getElementById('get').value;
    let url = 'https://api.unsplash.com/search/photos?per_page=30&query=' + query + '&client_id=' + clientId + '&page=' + page;
    
    const response = await fetch(url);

    const item = await response.json();

    return item;
}

document.querySelector('#btn').addEventListener('click', async () => {
    try {
        let item = await searchPic();
        if (!item.results.length) {
            throw new Error("Could not find what you are looking for!");
        } else {
            item = item.results;
                item.forEach(photo => {
                  let image = photo.urls.thumb;
                  let description = photo.alt_description;
                  let divTag = document.createElement('div');
                  divTag.setAttribute('class', 'imgStyle');  
                  let imgTag = document.createElement('img');
                  Object.assign(imgTag, {
                      src: image,
                      alt: description,
                    });
                    divTag.appendChild(imgTag);
                    
                  document.querySelector('#output').appendChild(divTag);
                });
        
                let showPage = document.querySelector('#pageD');
                showPage.style.display = 'block';
        }

    } catch (error) {
        let err = error.message;
        let textNode = document.createTextNode(err);
        let par = document.createElement('p');
        par.appendChild(textNode);
        document.querySelector('#output').appendChild(par);
    }
});

for (let i = 0; i < document.querySelectorAll('.pageN').length; i++) {
    document.querySelectorAll('.pageN')[i].addEventListener('click', async () => {
        let pageT = document.querySelectorAll('.pageN')[i].innerText; 
        let item = await searchPic(pageT);
        item = item.results;
        item.forEach(photo => {
          let image = photo.urls.thumb;
          let description = photo.alt_description;
          let divTag = document.createElement('div');
          divTag.setAttribute('class', 'imgStyle');  
          let imgTag = document.createElement('img');
          Object.assign(imgTag, {
              src: image,
              alt: description,
            });
            divTag.appendChild(imgTag);
            
          document.querySelector('#output').appendChild(divTag);
        });
    });
}