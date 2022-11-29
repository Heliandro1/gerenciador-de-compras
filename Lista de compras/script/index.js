const ul = document.getElementById('items');

let items = getItems('Users');
let bkgimg = ['url(imgs/IMG-20221103-WA0007.jpg)', 'url(imgs/IMG-20221103-WA0008.jpg)', 'url(imgs/IMG-20221103-WA0009.jpg)',
              'url(imgs/IMG-20221103-WA0010.jpg)', 'url(imgs/IMG-20221103-WA0011.jpg)', 'url(imgs/IMG-20221103-WA0013.jpg)'];
let ver = 0;

setInterval(() => {
    document.body.style.backgroundImage = bkgimg[ver];
    ver++;
    if(ver == bkgimg.length)
        ver = 0;
}, 2000);

window.addEventListener('load', ()=>{
    if (items.length >= 1) {
        items.forEach(element => {
            ul.appendChild(AddItem(element));
        });
    }
    else{
        document.getElementById('vazio').style.display = 'flex';
    }
});

document.addEventListener('click', (e)=>{
    const el = e.target.parentElement;
    if (e.target.classList.contains('apagar')) {
        el.parentElement.remove()
        removerItem('Users', Array.prototype.indexOf.call(ul, el.parentElement))
        if (ul.children.length == 0) {
            document.getElementById('vazio').style.display = 'flex';
        }
    }
    else if(e.target.classList.contains('show'))
    {
        setUserOnline(e.target.title);
    }
});

function setUserOnline(username) {
    let userJSON = JSON.stringify([...username]);
    localStorage.setItem('Online', userJSON);
}

function removerItem(user, index) {
    items.splice(index, 1);
    localStorage.setItem(user, JSON.stringify(items));
}

function AddItem(_ptexto) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const btnv = document.createElement('input');
    const btn = document.createElement('input');
    const div = document.createElement('div');
    const a = document.createElement('a');
    a.setAttribute('href', 'listat.html')
    a.appendChild(btnv);
    btn.setAttribute('value', 'Apagar');
    btn.setAttribute('id', 'btnApagar');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'apagar');
    btnv.setAttribute('value', 'Visualizar');
    btnv.setAttribute('type', 'button');
    btnv.setAttribute('class', 'show');
    btnv.setAttribute('title', _ptexto);
    p.innerText = _ptexto
    div.append(p, a, btn);
    li.appendChild(div);
    return li;
}

function getItems(user) {
    let lc_item = localStorage.getItem(user);
    let items = [];
    if (!(lc_item == null)) {
        items = [...JSON.parse(lc_item)];
    }
    return items;
}