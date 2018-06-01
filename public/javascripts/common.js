
$(document).ready(function () {

    $("#checkButton").click(function (event) {

        var account = document.getElementById('inputAccount').value;
        console.log(account);

        $.ajax({
            url: "registerCheck",
            type: "POST",
            dataType: "text",
            data: 'account='+account,

            complete: function () {
                // alert("complete函数");
            },

            success: function (result) {
                // console.log(result);
                // console.log("success");
                alert("用户名"+result);
            },

            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText);
                console.log(jqXHR.responseText);
                console.log(jqXHR.status);
                console.log(jqXHR.readyState);
                alert(textStatus);
                // alert(errorThrown);
            },
        });
    });
});