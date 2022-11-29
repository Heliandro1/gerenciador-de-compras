const btnNewUser = document.getElementById('btnNewUser');
const txtUserName = document.getElementById('txtUserName');
const modal = document.getElementById('modal');

let bkgimg = ['url(imgs/IMG-20221103-WA0007.jpg)', 'url(imgs/IMG-20221103-WA0008.jpg)', 'url(imgs/IMG-20221103-WA0009.jpg)',
              'url(imgs/IMG-20221103-WA0010.jpg)', 'url(imgs/IMG-20221103-WA0011.jpg)', 'url(imgs/IMG-20221103-WA0013.jpg)'];
let ver = 0;

setInterval(() => {
    document.body.style.backgroundImage = bkgimg[ver];
    ver++;
    if(ver == bkgimg.length)
        ver = 0;
}, 2000);

btnNewUser.addEventListener('click', (e) =>{
    if (!(txtUserName.value.trim() == '') && txtUserName.value.length >= 5) {
        e.preventDefault();
        addUser(txtUserName.value.trim())
        modal.style.display = 'flex';
    }
    else{
        txtUserName.focus();
    }
});

function addUser(username) {
    try {
        let userc = localStorage.getItem('Users');
    let newuser = [];
    if (!(userc == null)) {
        newuser = [...JSON.parse(userc)];
        newuser.push(username);
    }
    else{
        newuser.push(username);
    }
    let usersJSON = JSON.stringify(newuser.filter(el => el != null));
    localStorage.setItem('Users', usersJSON);
    return true;
    } catch (error) {
        return false;
    } 
}