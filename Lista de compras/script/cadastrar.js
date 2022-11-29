const btnCadastrar = document.getElementById('btnCadastrar');
const txtNome = document.getElementById('txtNome');
const txtPreco = document.getElementById('txtPreco');
const txtQtd = document.getElementById('txtQtd');
const modal = document.getElementById('modal')
const btnAdd = document.getElementById('btnAdd');

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
    document.getElementById('user').innerText = `Adicionando um item a lista de compras do(a) ${getUserOnline()}`
})
btnCadastrar.addEventListener('click', (e) =>{
   if (txtNome.value != '' && txtPreco.value != '' && txtQtd.value != '') {
        e.preventDefault();
        AddItem(getUserOnline(), txtNome.value, txtPreco.value, txtQtd.value);
        modal.style.display = 'block'
   } else {
    
   }
  
});
btnAdd.addEventListener('click', () =>{
    modal.style.display = 'none';
    txtNome.value = '';
    txtPreco.value = ''
    txtQtd.value = '';

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

function AddItem(listaOwner, nproduto, pproduto, qtdp) {
    let lcprodutos = localStorage.getItem(listaOwner);
    let produtos = []
    let produto = {
        Nome: nproduto,
        Preco: Number(pproduto),
        Quantidade: Number(qtdp)
    }
    if (!(lcprodutos == null)) {
        produtos = [...JSON.parse(lcprodutos)]
        produtos.push(produto)
    } else {
        produtos.push(produto)
    }
    const produtoJSON = JSON.stringify(produtos.filter(element => element != null))
    localStorage.setItem(listaOwner, produtoJSON);
}