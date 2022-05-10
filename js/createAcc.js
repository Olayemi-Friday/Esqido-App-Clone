let  fname=$('#fname'),
    email=$('#email'),
    phone=$('#phone'),
    password = $('#password'),
    updateContainerForm = $('#updateContainerForm'),
    crtAccBtn=$('#crtAccBtn');
let  userIndex,
    user = [];
let userIpAdd = "http://159.65.21.42:9000";


// updateContainerForm.hide()
// GetLoginDetails();
crtAccBtn.on('click', function () {
    let dataobj = {
        "name": fname.val(),
        "email": email.val(),
        "phone": phone.val(),
        "password": password.val()
    };
    console.log(dataobj);

    if (userIndex == null) {
        $.ajax({
            type: 'POST',
            url: `${userIpAdd}/register`,
            data: dataobj,
            success: function (response) {
                console.log(response)
                if (response.error) {
                    alert(`Registration failed, ${response.error}`);
                } else {
                    console.log(response);
                    alert(`Registration successful, welcome ${response.name}`);
                    window.location.href = 'addCart.html'
                }
            },
            error: function (err) {
                console.log(err);
            },
        })
    } else {
        window.location.href ='create.html'
    };
})


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
                console.log(response)
                if (response.error) {
                    alert(`Login failed, ${response.error}`);
                } else {
                    console.log(response);
                    alert(`Login successful, welcome back ${response.name}`);
                    window.location.href = 'addCart.html'
                }
            },
            error: function (err) {
                console.log(err.statusText);
            },
        });

});