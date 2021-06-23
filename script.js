var telefoni;
window.onload = async function()
{
    telefoni = await (await fetch('http://localhost:9000/telefoni/')).json();
    if(location.href.indexOf("onama") > -1){
        navigacija();
    }
    else{
        if(location.href.indexOf("index") > -1){
            pocetna();
        }
        else{
            var telefon = new URLSearchParams(location.search);
            loadPage(telefoni.find(trenutni => trenutni.id == telefon.get("telefon")));
        }
    }
};
function navigacija(){
    $.each(telefoni,function(i,telefon){
        $(".dropdown-menu").append(`<li><a href="samsung.html?telefon=${telefon.id}">${telefon.basicData.model}</a></li> `);
    });
}
function pocetna(){
    navigacija();
    $("thead").empty();
    $("thead").append(`<tr>
        <th>Proizvodjac</th>
        <th>Naziv modela</th>
        <th>Fotografija</th>
        <th>Cena(u dinarima / evrima)</th>
        <th>Detalji</th>
    </tr>`);
    $("tbody").empty();
    $.each(telefoni,function(i,telefon){
        $("tbody").append(`<tr>
            <td>${telefon.basicData.brand}</td>
            <td>${telefon.basicData.model}</td>
            <td><img src="${telefon.basicData.phoneImage}" alt="${telefon.basicData.model}" class="img-rounded img-responsive" /></td>
            <td>${telefon.basicData.price}</td>
            <td><a href="samsung.html?telefon=${telefon.id}" class="btn btn-info">Detalji</a></td>
        </tr>`);
    });
}
function vrh(telefon){
    $("title").text(`${telefon.basicData.model}`);
    navigacija();
    $("nav").after(`<h2>${telefon.basicData.model}</h2>`);
    $("#specifikacije thead").append(`<tr>
        <th>Memorija</th>
        <th>Baterija</th>
        <th>Kamera</th>
    </tr>`);
    $("#specifikacije tbody").append(`<tr>
        <td>${telefon.specs.memory}</td>
        <td>${telefon.specs.battery}</td>
        <td>${telefon.specs.camera}</td>
    </tr>`);
}
function reviews(telefon){
    $.each(telefon.review,function(i,review){
        $("article:first").append(`<section class = "review"></section>`);
        $(".review:last").append(`<h3>${review.naziv}</h3>`);
        $(".review:last").append(`Autor: ${review.reviewauthor}
        <br />`);
        if(i != 2){
            $(".review:last").append(`<div id="review${i+1}" class="collapse in"></div>`);
            $.each(review.reviewtext, function(j,text){
                if(j % 2 == 0){
                    $(`#review${i+1}`).append(`<div class="row"></div>`);
                }
                if((j + 1) % 2 == 1 && (j + 1) == review.reviewtext.length){
                    $(".row:last").append(`<div class="col-sm-12 col-md-12 col-lg-12"></div>`);
                }
                else{
                    $(".row:last").append(`<div class="col-sm-6 col-md-6 col-lg-6"></div>`);
                }
                $("div div div:last").append(`<h4>${text.heading}</h4>`);
                $.each(text.text, function(k,textic){
                    $("div div div *:last").after(`<p>${textic}</p>`);
                });
                $("div div div p:last").after(`<figure>
                    <img src="${text.picture}" alt="${text.alt}" class="img-rounded" />
                    <figcaption>${text.caption}</figcaption>
                </figure>`);
            });
            $(".review:last").append(`<button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#review${i+1}">${review.dugme}</button>`);
        }
        else{
            $(".review:last").append(`<div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="${review.reviewurl}" allowfullscreen></iframe>
            </div>`);
        } 
    });
}
function komentari(telefon){
    var prosecna = 0;
    var iskustva = JSON.parse(JSON.stringify(telefon.experiences));
    iskustva = bubbleSort(iskustva);
    var indexi = indeksi(telefon.experiences,iskustva); //ne radi
    console.log(indexi);
    $.each(iskustva,function(i,x){
        $(".comments").append("Autor: " + x.authorname + "<br />");
        $(".comments").append("Ocena: " + x.rating + "<br />" + "<span>" + "Komentar: " +  x.text  + "</span>" + "<br />");
        prosecna += x.rating;
        if(x.likes > x.dislikes){
            $(".comments span:last").css("color", "blue");
        }
        else if(x.likes < x.dislikes){
            $(".comments span:last").css("color", "red");
        }
        else{
            $(".comments span:last").css("color", "white");
        }
        $(".comments").append(x.likes
        + `<input type='image' src = 'like.png' id='l${x.id}' onclick="lajkovanje('${telefon._id}','${indexi[i]}')"/>`
        + x.dislikes
        + `<input type='image' src = 'dislike.png' id='d${x.id}' onclick="dislajkovanje('${telefon._id}','${indexi[i]}')"/>`
        + "<br />"
        + `<button class='btn btn-primary' onclick="odgovori('${telefon._id}','${i}','${indexi[i]}')">Odgovorite</button>` + "<br />"
        + `<div class="divkom"></div>`);
        $.each(x.comments,function(j,y){
            if(j == 0){
                $(".comments").append("<section class='odgovori'>" + "<span style='font-size: 130%;color: green;'>ODGOVORI:</span>" + "<br />" + "</section>");
            }
            $(".odgovori:last").append("Autor: " + y.authorname + "<br />");
            $(".odgovori:last").append("Komentar: " +  y.text + "<br />");
        });
    })
    $("article section form").after("Prosecna ocena: " + prosecna / telefon.experiences.length);
}

function loadPage(telefon)
{
    vrh(telefon);
    reviews(telefon);
    komentari(telefon);
    $("#forma1").submit(async function(){
        await fetch(`http://localhost:9000/telefoni/${telefon._id}/submit`, 
        {
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ime: $("#ime").val(),
                komentar: $("#kom").val(),
                ocena: $("input:radio[name=ocena]:checked").val()
            })
        }
        );
        location.reload();
    });
}

async function lajkovanje(telefon, index){
    await fetch(`http://localhost:9000/telefoni/lajkovanje/${telefon}`,{
        method: "PATCH", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            indeks: index
        })
    });
    location.reload();
}

async function dislajkovanje(telefon, index){
    await fetch(`http://localhost:9000/telefoni/dislajkovanje/${telefon}`,{
        method: "PATCH", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            indeks: index
        })
    });
    location.reload();
}

function odgovori(id, index, indexx){
    $(".divkom").eq(index).html(`<br />
    <form method="post" id="forma2">
        <div class="form-group">
            <input type="text"  placeholder="Ime" class="form-control" id="naziv"/>
        </div>
        <div class="form-group">
            <textarea name="odgovorite" id="odg" cols="40" rows="2" placeholder="Odgovorite" id="odgovorite"></textarea>
        </div>
        <div class="form-group">
            <input type="submit" value="submit" class="btn btn-default" id="poslati"/>
        </div>
    </form>
    `);
    $("#forma2").submit(async function(){
        await fetch(`http://localhost:9000/telefoni/odg/${id}`,
        {
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                naziv: $("#naziv").val(),
                odgovor: $("#odg").val(),
                indeks: indexx
            })
        });
        location.reload();
    });
}

function bubbleSort(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
            if((arr[j + 1].likes + arr[j+1].dislikes) > (arr[j].likes + arr[j].dislikes)){
                [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
            }
        }
    };
    return arr;
};

function indeksi(arr,novi){
    var unos = new Array(arr.length);
    for(let i = 0;i < novi.length;++i)
    {
        for(let j = 0;j < arr.length;++j)
        {
            if(novi[i].id == arr[j].id)
            {
                unos[i] = j;
            }
        }
    }
    return unos;
};