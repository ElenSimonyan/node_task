// function getAjax() {
//     var xml = null;
//
//     try { xml = new XMLHttpRequest();} catch(e) {}
//     try { xml = new ActiveXObject("Msxml2.XMLHTTP");} catch(e) {}
//     try { xml = new XMLHttpRequest("Microsoft.XMLHTTP");} catch(e) {}
//
//     return xml;
// }
//
// var xml = getAjax();
//
// xml.open("GET", "tweets.json", true);
// xml.onreadystatechange = function () {
//
//     console.log("hii",xml.responseText);
//
// };
//
//

( function () {

    var container = $.("#container");
    $.ajax({
        url: 'tweets.json'
    }).done(function (data) {
        console.log(data);

        var json = JSON.parse(data);
        var source   = $("#template").html();
        var template = Handlebars.compile(source);
        var html    = template(json);
        container.append(html)
    })

})()
