
const nickField = document.getElementById('floatingInput');
const passwordField = document.getElementById('floatingPassword');


$(form).submit( async e => {
    const nick = nickField.value
    const password = passwordField.value
    const data = {nick, password};

    
    let response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    let result = await response.json();
    console.log(result);
})