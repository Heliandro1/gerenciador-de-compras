const ul = document.getElementById('items');

let items = getItems(getUserOnline());

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
    document.getElementById('titulo').innerText = `Lista de compras do(a) ${getUserOnline()}`
    if (items.length >= 1) {
        items.forEach(element => {
            ul.appendChild(AddItem(element.Nome, element.Preco, element.Quantidade));
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
        removerItem(getUserOnline(), Array.prototype.indexOf.call(ul, el.parentElement))
        if (ul.children.length == 0) {
            document.getElementById('vazio').style.display = 'flex';
        }
    }
});

function getUserOnline() {
    let lc_item = localStorage.getItem('Online');
    let items = [];
    let saida = '';
    if (!(lc_item == null)) {
        items = [...JSON.parse(lc_item)];
    }
    items.forEach(element => {
        saida += element;
    });
    return saida;
}

function AddItem(_ptexto, _p1texto, _p2texto) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const btn = document.createElement('input');
    const div = document.createElement('div');
    btn.setAttribute('value', 'Apagar');
    btn.setAttribute('id', 'btnApagar');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'apagar');
    p.innerText = _ptexto
    p1.innerText = `${_p1texto} AKZ`;
    p2.innerText = `${_p2texto} Un`;
    div.append(p, p1, p2);
    div.appendChild(btn)
    li.appendChild(div);
    return li;
}
function removerItem(user, index) {
    items.splice(index, 1);
    localStorage.setItem(user, JSON.stringify(items));
}
function getItems(user) {
    let lc_item = localStorage.getItem(user);
    let items = [];
    if (!(lc_item == null)) {
        items = [...JSON.parse(lc_item)];
    }
    return items;
}
