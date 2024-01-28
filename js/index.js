///<reference types="../@types/jquery" />
"use strict";

let load = `
<div class="loading-wave">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>
`
//globle
let secondNav=$('.second-nav').innerWidth()
$('.container').css('cssText',`padding-left: ${secondNav+10}px`)
$(function () {
  $('#loading').fadeOut(1000)
  $('body').css('cssText','overflow: auto')
})

//nav
let widthli = $('#nav .slider').innerWidth();
$('#nav').animate({left:`-${widthli}`},0)
$('#nav .open').on('click', navToglle)
function navToglle() {
  if (this.classList.contains('fa-xmark')) {
    $(this).removeClass('fa-xmark')
    $(this).addClass('fa-bars')
    $('#nav').animate({ left: `-${widthli}` }, 500)
     for (let i = 0; i < 5; i++){
      $('#nav li').eq(4-i).animate({ top: '100%' }, (i+1)*100);
    }
  }
  else {
    $(this).removeClass('fa-bars')
    $(this).addClass('fa-xmark')
    $('#nav').animate({ left: `0` }, 500)
    for (let i = 0; i < 5; i++){
      $('#nav li').eq(i).animate({ top: '0' }, (i+1)*200);
    }
   
  }
}
function off() {
    $('#nav .open').removeClass('fa-xmark')
    $('#nav .open').addClass('fa-bars')
    $('#nav').animate({ left: `-${widthli}` }, 500)
  for (let i = 0; i < 5; i++) {
    $('#nav li').eq(4 - i).animate({ top: '100%' }, (i + 1) * 100);
  }
}
// home
async function home() {
  $('#contener-row').html(load)
  let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  let data = await response.json()
  displayHome(data.meals)
}
function displayHome(data) {
  let cartona=``
  for (let i = 0; i < data.length; i++){
    cartona += `<div class="col-md-3">
          <div onclick="detal('${data[i].idMeal}')" class="layer position-relative">
            <img src="${data[i].strMealThumb}" alt="${data[i].strMeal}" class="w-100">
            <div class="position-absolute">
              <h2>${data[i].strMeal}</h2>
            </div>
          </div>
        </div>`
  }
  document.getElementById('contener-row').innerHTML=`<div class="row g-4 pt-4 pb-4">${cartona}</div>`
}
home()

async function detal(id) {
    $('#home .searching').addClass('d-none')
  $('#contener-row').html(load)
  off()
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  let data = await response.json()
  console.log(data)
  displaydetal(data.meals[0])
}
function displaydetal(data) {
  let arr = [
    { first: data.strMeasure1, second: data.strIngredient1 },
    { first: data.strMeasure2, second: data.strIngredient2 },
    { first: data.strMeasure3, second: data.strIngredient3 },
    { first: data.strMeasure4, second: data.strIngredient4 },
    { first: data.strMeasure5, second: data.strIngredient5 },
    { first: data.strMeasure6, second: data.strIngredient6 },
    { first: data.strMeasure7, second: data.strIngredient7 },
    { first: data.strMeasure8, second: data.strIngredient8 },
    { first: data.strMeasure9, second: data.strIngredient9 },
    { first: data.strMeasure10, second:data.strIngredient10 },
    { first: data.strMeasure11, second:data.strIngredient11},
    { first: data.strMeasure12, second:data.strIngredient12},
    { first: data.strMeasure13, second:data.strIngredient13},
    { first: data.strMeasure14, second:data.strIngredient14},
    { first: data.strMeasure15, second:data.strIngredient15},
    { first: data.strMeasure16, second:data.strIngredient16},
    { first: data.strMeasure17, second:data.strIngredient17},
    { first: data.strMeasure18, second:data.strIngredient18},
    { first: data.strMeasure19, second:data.strIngredient19},
    { first: data.strMeasure20, second:data.strIngredient20}
  ]
  let card=``
  for (let i = 0; i < 20; i++){
    if (arr[i].first.length <= 1) continue;
   card+=`<div class="btn btn-info m-2">${arr[i].first}${arr[i].second}</div>`
  }
  let cart = ``
  if (data.strTags != null) {
    let x = data.strTags.split(",")
    for (let i = 0; i < x.length; i++) {
      cart+=`<div class="btn btn-secondary m-2">${x[i]}</div>`
     }
    console.log(x)
  }

  let cartona = `
  <div class="col-md-4">
    <div class="layer position-relative">
      <img src="${data.strMealThumb}" alt="${data.strMeal}" class="w-100 rounded-3">
      <h2>${data.strMeal}</h2>
    </div>
  </div>
  <div class="col-md-8">
    <div class="layer position-relative">
      <h3 class=" display-5">Instructions</h3>
      <p ">${data.strInstructions}</p>
      <div class="d-flex align-items-center  mb-3">
      <h3 class="m-0 pe-2">Area : </h3>
      <p class="m-0 fs-5">${data.strArea}</p>
      </div>
      <div class="d-flex align-items-center mb-3">
      <h3 class="m-0 pe-2">Category : </h3>
      <p class="m-0 fs-5">${data.strCategory}</p>
      </div>
      <div>
      <h3>Recipes : </h3>
      <div class="mb-3">${card}</div>
      <h3>Tags :</h3>
      <div class="mb-3">${cart}</div>
      <div>
      <a href="${data.strSource}" class="btn btn-success ms-2" target="_blank">Source</a>
      <a href="${data.strYoutube}" class="btn btn-danger ms-2" target="_blank">Youtube</a></div>
      </div>
      
    </div>
  </div>
  `
  $('#contener-row').html(`<div class="row text-white g-4 pt-4 pb-4">${cartona}</div>`)
}

//search
$('#nav .slider li a').on('click', off)
$('#nav .slider li a').on('click', function (e) {
 document.querySelector('#home .searching').classList.add('d-none')
 })
function clearInput() {
   $('#searchByName').val('')
   $('#searchByFirstLater').val('')
}
$('#nav .slider li a').eq(0).on('click', function () {
  clearInput()
  $('#contener-row').html("")
  $('#home .searching').removeClass('d-none')
  $('#searchByName').on('input', async function () {
  if ($('#searchByName').val().length == 0) {
      $('#contener-row').html("")
      return
    }
    $('#contener-row').html(load)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`)
    let data = await response.json();
    displayHome(data.meals)
})
  $('#searchByFirstLater').on('keyup', async function () {
    if ($('#searchByFirstLater').val().length == 0) {
      $('#contener-row').html("")
      return
    }
    $('#contener-row').html(load)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${this.value}`)
    let data = await response.json();
    displayHome(data.meals)
})
})

//catigory
$('#nav .slider li a').eq(1).on('click',async function () {
  $('#contener-row').html(load)
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let data = await response.json();
  displayCate(data.categories)
 })

function displayCate(data) {
  let cartona=``
  for (let i = 0; i < data.length; i++){
    let x=data[i].strCategoryDescription.slice(0, 100)
    cartona += `<div class="col-md-4">
          <div onclick="getdetal('${data[i].strCategory}')" class="layer position-relative">
            <img src="${data[i].strCategoryThumb}" alt="${data[i].strCategory}" class="w-100">
            <div class="position-absolute d-flex flex-column">
              <h2>${data[i].strCategory}</h2>
              <p class="m-0 fs-13">${x}</p>
            </div>
          </div>
        </div>`
  }
  document.getElementById('contener-row').innerHTML=`<div class="row g-4 pt-4 pb-4">${cartona}</div>`
 }
async function getdetal(data) {
  $('#contener-row').html(load)
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`)
  let datas =await response.json()
  displayHome(datas.meals)
}


//area

$('#nav .slider li a').eq(2).on('click',async function() {
  $('#contener-row').html(load)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let data = await response.json()
  disArea(data.meals)
})

function disArea(data) {
  let cartona = ``
  for (let i = 0; i < data.length; i++) {
    cartona += `<div class="col-md-3">
          <div onclick="getAreaEat('${data[i].strArea}')" class="layer position-relative text-white text-center">
          <i class="fa-regular fa-map fs-1"></i>
              <h2 >${data[i].strArea}</h2>
          </div>
        </div>`
  }
 document.getElementById('contener-row').innerHTML=`<div class="row g-5 pt-4 pb-4">${cartona}</div>`
}

async function getAreaEat(name) {
  $('#contener-row').html(load)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`)
  let data = await response.json()
  displayHome(data.meals)
}



//Ingredients

$('#nav .slider li a').eq(3).on('click',async function() {
  $('#contener-row').html(load)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let data = await response.json()
   disIngredients(data.meals)
  console.log(data.meals)
})

function disIngredients(da) {
  let cartona = ``
  for (let i = 0; i < 20; i++) {
    let description = da[i].strDescription || '';
    let x = description.slice(0, 50);
    cartona += `<div class="col-md-3">
          <div onclick="getIngredients('${da[i].strIngredient}')" class="layer position-relative text-white text-center">
          <i class="fa-solid fa-utensils fs-1"></i>
              <h2 >${da[i].strIngredient}</h2>
              <p>${x}</p>
          </div>
        </div>`
  }
 document.getElementById('contener-row').innerHTML=`<div class="row g-5 pt-4 pb-4">${cartona}</div>`
}

async function getIngredients(name) {
  $('#contener-row').html(load)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
  let data = await response.json()
  displayHome(data.meals)
  console.log(data)
}


//validition

let submitBtn
function showContacts() {
    document.getElementById('contener-row').innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center ">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control text-dark bg-white" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control text-dark bg-white " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control text-dark bg-white " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control text-dark bg-white " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control text-dark bg-white " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control text-dark bg-white " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}