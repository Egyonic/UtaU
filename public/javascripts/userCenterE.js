$(document).ready(function () {

    if( sessionStorage.getItem("account")){
        // var account = sessionStorage.getItem("account");
        // window.location = 'http://localhost:3000/userCenter?account='+account;
    }
    else{
        alert("未登录，请先登录");
    }

    setTimeout(function () {
        location.reload(true);
    },1000*60*10);
});
