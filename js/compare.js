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
sliderDiv.style.width = "150px";
sliderDiv.style.height = "290px";


// svgDiv = document.querySelector(".svg-box");
// sliderDiv = document.querySelector("#slider-test")
// tickText = document.querySelectorAll(".svg-box g.tick text");
// // console.log(tickText);
// // label = svgDiv.contentDocument.getElementsByTagName("G")
// /*global d3 */
// // div.setAttribute('transform', 'rotate(90deg)');
// svgDiv.style.transform = "rotate(90deg)";
// svgDiv.style.transform += "translate(-150px,-150px)";
// sliderDiv.style.width = "100%";
// sliderDiv.style.height = "140px";
// for (var x = 0; x < tickText.length; x++) {
//   tickText[x].style.transform = "rotate(-90deg) translate(28px, -25px)"
// }

// function myFunction(x) {
//   if (x.matches) { // If media query matches
//     svgDiv = document.querySelector(".svg-box");
//     sliderDiv = document.querySelector("#slider-test")
//     tickText = document.querySelectorAll(".svg-box g.tick text");
//     // console.log(tickText);
//     // label = svgDiv.contentDocument.getElementsByTagName("G")
//     /*global d3 */
//     // div.setAttribute('transform', 'rotate(90deg)');
//     svgDiv.style.transform = "rotate(90deg)";
//     svgDiv.style.transform += "translate(-150px,-150px)";
//     sliderDiv.style.width = "100%";
//     sliderDiv.style.height = "140px";
//     for (var x = 0; x < tickText.length; x++) {
//       tickText[x].style.transform = "rotate(-90deg) translate(28px, -25px)"
//     }
//     mobile = "on"
//   }
//   else {
//     svgDiv = document.querySelector(".svg-box");
//     sliderDiv = document.querySelector("#slider-test")
//     tickText = document.querySelectorAll(".svg-box g.tick text");
//     if (mobile == "on") {
//       svgDiv.style.transform = "rotate(0deg)";
//       sliderDiv.style.width = "140px";
//       sliderDiv.style.height = "550px";
//       for (var x = 0; x < tickText.length; x++) {
//         tickText[x].style.transform = "rotate(0deg) translate(0px, 0px)"
//       }
//       // mobile = "off";
//     }
//   }
// }
// var x = window.matchMedia("(max-width: 990px)")
// myFunction(x) // Call listener function at run time
// x.addListener(myFunction) // Attach listener function on state changes
// d3.select('p#value-range').html(
//     `<strong>Current Selection:</strong> <br> ${slider2.value().join('-')} centimeters<br><p class="in-ft">(0–${parseFloat(550*0.393701).toFixed(1)} inches)</p><br><p class="in-ft">(0–${parseFloat(550*0.0328084).toFixed(1)} feet)</p>`
//   );
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
    console.log('src: ' + img.src)
    var onloadMessage = document.querySelector(".message-container")
    if (onloadMessage) {
      onloadMessage.parentNode.removeChild(onloadMessage);
    }
    addToCompareArray(img);
    renderEachCompareImage();
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
    checkToggle()
    filterSculptures()
  }, 200)
}
filterAndRender();
var compareArray = [];
var maxHeight = 0;

function addToCompareArray(img) {
  if (compareArray.length < 3) {
    console.log("space available")
    imagesArray.forEach(sculpture => {
      if (sculpture.fileName.match(img.src.split("_png/")[1].split(".png")[0])) {
        console.log("match!")
        if (sculpture.height>maxHeight) {
          maxHeight = sculpture.height;
        }
        console.log(maxHeight);
        compareArray.push(sculpture)
        console.log(compareArray)
      }
    })
  }
  else {
    var container = document.querySelector(".alert-container")
    container.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert" width="40%"> Remove a sculpture below before adding to your selection <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
  </button> </div>`
    console.log("remove a sculpture before adding to your selection")
  }
}

// https://stackoverflow.com/questions/48802987/is-there-a-map-function-in-vanilla-javascript-like-p5-js
// linearly maps value from the range (a..b) to (c..d)
function mapRange (value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
}

function renderCompareImage(sculpture, alt) {
  var imgDiv = document.createElement("div")
  imgDiv.className = "compare-img-div"
  var img = document.createElement("img");
  img.className = "compare-image-img"
  img.src = `resized_clipped_tranparent_png/${sculpture.fileName.split('.')[0]}.png`;
  img.style.height = (sculpture.height/maxHeight) * 300 + "px";
  console.log("height in px")
  console.log(img.style.height)
  // img.style.height = sculpture.height * 2.5 + "px";
  img.alt = alt;
  var removeIcon = document.createElement("img")
  removeIcon.className = "remove-icon"
  removeIcon.src = "images/remove.png"
  imgDiv.appendChild(img);
  imgDiv.appendChild(removeIcon)
  compareImagesContainer.appendChild(imgDiv);
  imgDiv.addEventListener('mouseover', function() {
    removeIcon.style.visibility = 'visible';
  })
  imgDiv.addEventListener('mouseout', function() {
    removeIcon.style.visibility = 'hidden';
  })
  removeIcon.addEventListener('click', function() {
      var src = this.parentNode.querySelector(".compare-image-img").getAttribute("src")
      console.log(src)
      var container = this.parentNode;
      var parent = container.parentNode;
      parent.removeChild(container);

      var existingDiv = document.querySelector(".compare-const")
      if  (existingDiv) {
        existingDiv.parentElement.removeChild(existingDiv);
      };

      removeFromCompareArray(src);
      checkMaxHeight(src);
      renderEachCompareImage();
    });
}

var compareImagesContainer = document.querySelector("#compare-images")

function renderEachCompareImage() {
  var div = document.querySelectorAll(".compare-img-div");
  if (div.length > 0) {
    // console.log("div exists")
    // removeElementsBySelector("")
    // console.log(div)
    removeElementsBySelector(".compare-img-div")
    // div.parentNode.removeChild(div)
  };
  for (var i = 0; i < compareArray.length; i++) {
    renderCompareImage(compareArray[i], i, compareImagesContainer);
  }
  renderCompareConstant()
}

function renderCompareConstant() {
  if (compareArray.length>0) {

    var consts = [
      {name: "rice", height:1.4},
      {name: "tack", height:2.5},
      {name: "key", height:6},
      {name: "apple", height:13},
      {name: "basketball", height:25},
      {name: "dog", height:75},
      {name: "human", height:170},
      {name: "bus", height:390}
    ]

    console.log(consts)

    for (var i=0; i<consts.length; i++) {
      if (maxHeight >= consts[i].height && maxHeight < consts[i+1].height) {

        var existingDiv = document.querySelector(".compare-const")
        if  (existingDiv) {
          existingDiv.parentElement.removeChild(existingDiv);
        };

        var imgDiv = document.createElement("div");
        imgDiv.style.height = (consts[i].height/maxHeight) * 300 + "px";
        imgDiv.className = "compare-const"

        var img = document.createElement("img");
        img.id = "compare-constant"
        console.log("const compare info")
        console.log(maxHeight, consts[i].height)
        img.src = `images/compare-constants/${consts[i].name}-01.png`;
        img.style.height = "100%";
        img.style.width = "auto";

        imgDiv.appendChild(img)
        compareImagesContainer.appendChild(imgDiv);
      }
    }
  }
}

function checkMaxHeight(src) {
  var heights = [];
  for (const x of compareArray) {
    if (x.fileName.match(src.split("_png/")[1].split(".png")[0]) == null) {
      heights.push(x.height)
    }
  }
  var largest = Math.max(...heights)
  console.log(`heights: ${heights}`)
  console.log(`largest: ${largest}`)
  if (largest < maxHeight) {
    maxHeight = largest;
  }
};

function removeElementsBySelector(selector) {
  // Removes an element from the document
  var list = document.querySelectorAll(selector);
  for (const element of list) {
    element.parentNode.removeChild(element);
  }
}

function removeFromCompareArray(src) {
  compareArray = compareArray.filter(x => {
    if (x.fileName.match(src.split("_png/")[1].split(".png")[0])) {
      return false;
    }
    else {
      return true;
    }
  })
  console.log(compareArray)
};
