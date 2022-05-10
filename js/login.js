let email=$('#email'),
    password = $('#password'),
    loginBtn=$('#loginBtn');
let  userIndex,
    user = [];
let userIpAdd = "http://159.65.21.42:9000";



loginBtn.on('click', function () {
    let logInObj = {
        "email": email.val(),
        "password": password.val()
    };
    console.log(logInObj);

    
        $.ajax({
            type: 'POST',
            url: `${userIpAdd}/login`,
            data: logInObj,
            success: function (response) {
                // console.log(response)
                if (response.error) {
                    alert(`Login failed, ${response.error}`);
                } else {
                    alert(`Login successful, welcome back ${response.name}`);
                    window.location.href = 'addCart.html'
                }
            },
            error: function (err) {
                console.log(err.statusText);
            },
        });

});