// range slider for heights ----------------------------------------------->
var testSlider;
var slider2;
testSlider = d3.select('div#slider-test').append('svg').attr('width', 80).attr('height', 350).attr("class", "svg-box").append('g').attr('transform', 'translate(5,-15)').attr("class", "slider-svg").attr("id", "slider-svg");
// .attr("class", "slider-container");
slider2 = d3.sliderLeft().min(0).max(550).height(200).ticks(5).default([0, 550]).fill('#55585C').on('onchange', val => {
  // d3.select('p#value-range').text(val);
  // console.log(val);
});
testSlider.append('g').attr("id", "slider").attr('transform', `translate(50,30)`).call(slider2);
var mobile;
var svgDiv;
var sliderDiv;
var tickText;


svgDiv = document.querySelector(".svg-box");
sliderDiv = document.querySelector("#slider-test")
tickText = document.querySelectorAll(".svg-box g.tick text");
svgDiv.style.transform = "rotate(0deg)";
sliderDiv.style.width = "150px";
sliderDiv.style.height = "550px";
for (var x = 0; x < tickText.length; x++) {
  tickText[x].style.transform = "rotate(0deg) translate(0px, 0px)"
}


// function myFunction(x) {
//   if (x.matches) { // If media query matches
//     setTimeout(() => {
//       $('img.sculpture-img').each(function() {
//         $(this).blowup({
//           "width": 0,
//           "height": 0,
//           "cursor": false,
//           "border": "0px solid #C7875F"
//         });
//       })
//     }, 2000)
//   }
//   else {
//     addBlowup()
//     }
//   }
// var x = window.matchMedia("(max-width: 990px)")
// myFunction(x) // Call listener function at run time
// x.addListener(myFunction) // Attach listener function on state changes

var imageArray = [];
var imagesArray = [];
d3.json("finalClippedFileAndHeight.json").then(images => {
  images.forEach(image => {
    imageArray.push(image)
  })
  // console.log(imageArray);
  imageArray.forEach(image => {
    image.Medium = image.Medium.toLowerCase()
    imagesArray.push(image);
  })
  console.log(imagesArray)
  // imageArray.forEach(object => {
  //   if (object.Medium.match("Gold") || object.Medium.match("gold")) {
  //     gold.push(object)
  //   }
  // })
  pushToMaterialArrays()
  // console.log(materialArrays)
});
var sculptureArray = [];
var materialArray = [];
var goldArray = [];
var woodArray = [];
var marbleArray = [];
var stoneArray = [];
var terracottaArray = [];
var ivoryArray = [];
var bronzeArray = [];
var silverArray = [];
var ceramicArray = [];
var alabasterArray = [];
var plasterArray = [];
var gold = [];
var wood = [];
var marble = [];
var stone = [];
var terracotta = [];
var ivory = [];
var bronze = [];
var silver = [];
var ceramic = [];
var alabaster = [];
var plaster = [];

function mediumArray(object, arrayName, matchLC, matchCaps) {
  if (object.Medium.match(matchCaps) || object.Medium.match(matchLC)) {
    arrayName.push(object);
  }
}
var materialArrays = [gold, wood, marble, stone, terracotta, ivory, bronze, silver, ceramic, alabaster, plaster]

function pushToMaterialArrays() {
  imageArray.forEach(sculpture => {
    mediumArray(sculpture, gold, "gold", "Gold");
    mediumArray(sculpture, wood, "wood", "Wood");
    mediumArray(sculpture, marble, "marble", "Marble");
    mediumArray(sculpture, stone, "stone", "Stone");
    mediumArray(sculpture, terracotta, "terracotta", "Terracotta");
    mediumArray(sculpture, ivory, "ivory", "Ivory");
    mediumArray(sculpture, bronze, "bronze", "Bronze");
    mediumArray(sculpture, silver, "silver", "Silver");
    mediumArray(sculpture, ceramic, "ceramic", "Ceramic");
    mediumArray(sculpture, alabaster, "alabaster", "Alabaster");
    mediumArray(sculpture, plaster, "plaster", "Plaster");
  });
}
// var goldCheck = document.getElementById("gold")
var goldCheck = $("#gold").parent().hasClass("active")
// .parentNode.hasClass("active")
console.log(goldCheck)
var goldCheck2 = document.querySelector("#gold").parentNode
var goldJQ = $("#gold").parent()
var materialButtons = $(".btn-secondary")
var toggle_array = [];

function checkToggle() {
  toggle_array = [];
  for (const button of materialButtons) {
    if (button.classList.contains("active")) {
      toggle_array.push(button.querySelector("input").id)
    }
  }
  console.log(toggle_array)
}
var lowerHeightBound = 0;
var upperHeightBound = 500;
slider2.on('onchange', vals => {
  lowerHeightBound = vals[0]
  upperHeightBound = vals[1]
  console.log(lowerHeightBound)
  console.log(upperHeightBound)
  filterAndRender()
});
materialButtons.click(function() {
  filterAndRender()
});
// var toggle = $(this).children("input").attr("id")
// console.log($(this).children("input").attr("id"))
// toggle_array.push(toggle)
function filterSculptures() {
  const toggledSculptures = imagesArray.filter(x => {
    for (var i = 0; i < toggle_array.length; i++) {
      if (x.Medium.match(toggle_array[i])) {
        return true;
      }
    }
  })
  console.log(toggledSculptures.length)
  const rangedSculptures = toggledSculptures.filter(x => {
    if (x.height >= lowerHeightBound && x.height <= upperHeightBound) {
      return true;
    }
  })
  console.log(rangedSculptures.length)
  renderEachImage(rangedSculptures, "sculpture-img", "#images")
}

function renderImage(src, width, alt, className, parentElement) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.alt = alt;
  img.className = className
  document.querySelector(parentElement).appendChild(img);
  img.addEventListener('click', function() {
    console.log(this)
    var description = document.querySelector(".description")
    console.log(description)
    description.style.visibility = "visible";
    displayDescription(this);
  })
}

function renderEachImage(array, className, parentElement) {
  var children = document.querySelectorAll(`.${className}`)
  if (children) {
    for (var img of children) {
      document.querySelector(parentElement).removeChild(img)
    }
  }
  for (var i = 0; i < array.length; i++) {
    renderImage(`resized_clipped_tranparent_png/${array[i].fileName.split('.')[0]}.png`, "50px", i, className, parentElement)
  }
}

function filterAndRender() {
  setTimeout(() => {
    checkToggle();
    filterSculptures();
    addBlowup();
  }, 200)
}
filterAndRender()

function addBlowup() {
  setTimeout(() => {
    $('img.sculpture-img').each(function() {
      $(this).blowup({
        "background": "#FFFF",
        "width": 300,
        "height": 300,
        "cursor": false,
        "border": "4px solid #C7875F"
      });
    })
  }, 2000)
}

var description = document.querySelector(".description")
var descriptionText = document.querySelector(".description-text")
var metButton = document.querySelector(".met-btn")
var hideButton = document.querySelector(".hide-button")

function hideDescription() {
  hideButton.addEventListener('click', function() {
    description.style.visibility = "hidden";
  })
}
hideDescription();

function displayDescription(img) {
  var src = img.src
  imagesArray.forEach(sculpture => {
    if (sculpture.fileName.match(src.split("_png/")[1].split(".png")[0])) {
      var era;
      if (sculpture.endDate.toString().match('-')) {
        era = 'BC'
      }
      else {
        era = 'AD'
      }
      descriptionText.innerHTML = `<strong>Sculpture:</strong> ${sculpture['Object Name']} | ${sculpture['endDate']} ${era}`
      metButton.setAttribute('href', `${sculpture['Link Resource']}`)
    }
  })
}
