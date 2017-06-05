$("#input").on("keypress", function(e) {
    if (e.which == 13) {
        console.log('You pressed enter');
        getBeer();
    }
})

// ======================================


$("#button").on("click", function(e) {
    e.preventDefault();
    console.log("You pressed the button");
    getBeer();
});

// ======================================


function getBeer() {
    var url = location.origin;
    console.log(url);
    console.log($("#input").val());
    url = url + "/beers/" + $("#input").val();
    console.log(url);

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function(res) {
            console.log(res);

            for (var i = 0; 0 < 12; i++) {
                console.log(res[i]);
                var name = res[i].name;
                var abv = res[i].abv;
                var description = res[i].description;
                description = description.substring(0, 270);
                var label = res[i].labels.medium;

                // ==========================================

                var colDiv = $("<div class=\"col s12 m4\">");
                var cardDiv = $("<div class=\"card\">");
                var cardImg = $("<div class=\"card-image\">");
                var img = $("<img src=\"" + label + "\" />");
                var a = $("<a href=\"#\" class=\"btn-floating halfway-fab waves-effect waves-light red\"><i class=\"material-icons\">add</i></a>")
                var title = $("<span class=\"card-title\">" + abv + "</span>")
                var descDiv = $("<div class=\"card-content\">");
                var p = $("<p>" + description + "</p>");

                descDiv.append(p);
                cardImg.append(img);
                cardImg.append(title);
                cardImg.append(a);
                cardDiv.append(cardImg);
                cardDiv.append(descDiv);
                colDiv.append(cardDiv);
                $("#beerHolder").append(colDiv);

                $("#input").val("")
            }
            // console.log(res[i]);
            // var name = res[i].name;
            // var abv = res[i].abv;
            // var description = res[i].description;
            // description= description.substring(0,150);
            // var label = res[i].labels.medium;

            // // ==========================================

            // var colDiv = $("<div class=\"col s12 m4\">");
            // var cardDiv = $("<div class=\"card\">");
            // var cardImg = $("<div class=\"card-image\">");
            // var img = $("<img src=\"" + label + "\" />");
            // var a = $("<a href="login" class=\"btn-floating halfway-fab waves-effect waves-light red\"><i class=\"material-icons\">add</i></a>")
            // var title = $("<span class=\"card-title\">" + abv + "</span>")
            // var descDiv = $("<div class=\"card-content\">");
            // var p = $("<p>" + description + "</p>");

            // descDiv.append(p);
            // cardImg.append(img);
            // cardImg.append(title);
            // cardImg.append(a);
            // cardDiv.append(cardImg);
            // cardDiv.append(descDiv);
            // colDiv.append(cardDiv);
            // $("#beerHolder").append(colDiv);

            // $("#input").val("")

        }
    })
}
