/*global d3 */
// range slider for heights ----------------------------------------------->
var testSlider;
var slider2;
testSlider = d3.select('div#slider-test').append('svg').attr('width', 80).attr('height', 400).attr("class", "svg-box").append('g').attr('transform', 'translate(5,-15)').attr("class", "slider-svg").attr("id", "slider-svg");
// .attr("class", "slider-container");
slider2 = d3.sliderLeft().min(0).max(550).height(300).ticks(5).default([0, 550]).fill('#55585C').on('onchange', val => {
  d3.select('p#value-range').text(val);
  console.log(val);
});
testSlider.append('g').attr("id", "slider").attr('transform', `translate(50,30)`).call(slider2);
var mobile;
var svgDiv;
var sliderDiv;
var tickText;


// svgDiv = document.querySelector(".svg-box");
// sliderDiv = document.querySelector("#slider-test")
// tickText = document.querySelectorAll(".svg-box g.tick text");
// svgDiv.style.transform = "rotate(0deg)";
// sliderDiv.style.width = "150px";
// sliderDiv.style.height = "550px";
// for (var x = 0; x < tickText.length; x++) {
//   tickText[x].style.transform = "rotate(0deg) translate(0px, 0px)"
// }

// svgDiv = document.querySelector(".svg-box");
// sliderDiv = document.querySelector("#slider-test")
// tickText = document.querySelectorAll(".svg-box g.tick text");
// sliderDiv.style.width = "200px";
// sliderDiv.style.height = "650px";



// function myFunction(x) {
//   if (x.matches) { // If media query matches
//     svgDiv = document.querySelector(".svg-box");
//     sliderDiv = document.querySelector("#slider-test")
//     tickText = document.querySelectorAll(".svg-box g.tick text");
//     // console.log(tickText);
//     // label = svgDiv.contentDocument.getElementsByTagName("G")
//     // div.setAttribute('transform', 'rotate(90deg)');
//     svgDiv.style.transform = "rotate(90deg)";
//     svgDiv.style.transform += "translate(-150px,-150px)";
//     sliderDiv.style.width = "100%";
//     sliderDiv.style.height = "200px";
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
//       sliderDiv.style.width = "200px";
//       sliderDiv.style.height = "650px";
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
d3.select('p#value-range').html(`<strong>Current Selection:</strong> <br> ${slider2.value().join('-')} centimeters<br><p class="in-ft">(0–${parseFloat(550*0.393701).toFixed(1)} inches)</p><br><p class="in-ft">(0–${parseFloat(550*0.0328084).toFixed(1)} feet)</p>`);
//bar chart function ----------------------------------------------->
var svgWidth = 500;
var svgHeight = 500;
var svg = d3.select('div#bar-chart').append('svg').attr("width", svgWidth).attr("height", svgHeight).attr("class", "bars");

function drawBars(dataDrawn) {
  var barPadding = 16;
  var barWidth = (svgWidth / dataDrawn.length);
  var barChart = svg.append("g").selectAll("rect").data(dataDrawn).join("rect").attr("class", "bars").attr("y", function(d) {
    return svgHeight - d.count
  }).attr("height", function(d) {
    return d.count;
  }).attr("width", barWidth - barPadding).attr("transform", function(d, i) {
    var translate = [50 + ((barWidth - 8) * i), -30];
    return "translate(" + translate + ")";
  }).attr("fill", function(d, i) {
    var color = colors[i]
    return color
  });
};
// on bar click functions ------------------------------------------->
// image display function    https://stackoverflow.com/questions/41087774/display-images-array-onclick-button
function displayImage(src, width, alt, className, parentElement, parentClassName) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.alt = alt;
  img.className = className
  if (parentClassName) {
    var imgDiv = document.createElement("div");
    imgDiv.className = parentClassName
    imgDiv.appendChild(img)
    var removeIcon = document.createElement("img")
    removeIcon.className = "remove-icon"
    removeIcon.src = "images/remove.png"
    imgDiv.appendChild(removeIcon)
    document.querySelector(parentElement).appendChild(imgDiv);
  }
  else {
    document.querySelector(parentElement).appendChild(img);
  }
}
// render each image function
function renderEachImage(array, className, parentElement, parentClassName) {
  for (var i = 0; i < array.length; i++) {
    displayImage(`../met_sculptures2/resized_clipped_tranparent_png/${array[i].fileName.split('.')[0]}.png`, "50px", i, className, parentElement, parentClassName)
  }
}
// function to remove images before rendering new ones  https://www.abeautifulsite.net/adding-and-removing-elements-on-the-fly-using-javascript
function removeElement(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

function removeElementsByClass(query) {
  // Removes an element from the document
  var classList = document.querySelectorAll(query);
  for (element of classList) {
    element.parentNode.removeChild(element);
  }
}
//legend ----------------------------------------------->
var colors = ["#FFDC47", "#755A52", "#E8DED3", "#C7AFA5", "#C77564", "#F9EED7", "#C2894B", "#D3DADA", "#DFDEDA", "#FFEAE4", "#DDDEC7"];
var materialNames = ["gold", "wood", "marble", "stone", "terracotta", "ivory", "bronze", "silver", "ceramic", "alabaster", "plaster"];
var materialNamesCap = ["Gold", "Wood", "Marble", "Stone", "Terracotta", "Ivory", "Bronze", "Silver", "Ceramic", "Alabaster", "Plaster"];
var legendSquares = d3.select('div#legendSquares').append("svg").attr("height", 250).attr("width", 30);
var sqArea = 21;
var sqHeight = 15;
legendSquares.append("g").selectAll("rect").data(colors).enter().append("rect").attr("y", function(d, i) {
  return ((sqArea * i) + 15)
}).attr("height", sqHeight).attr("width", sqHeight).attr("fill", function(d) {
  return d
});
var legendText = d3.select('div#legend').attr("height", 600).attr("width", 500).attr("transform", "translate(50,200");
var initialCounts = [54, 522, 355, 432, 103, 50, 487, 73, 156, 37, 67]
legendText.html("Gold: " + initialCounts[0] + "<br/>" + "Wood: " + initialCounts[1] + "<br/>" + "Marble: " + initialCounts[2] + "<br/>" + "Stone: " + initialCounts[3] + "<br/>" + "Terracotta: " + initialCounts[4] + "<br/>" + "Ivory: " + initialCounts[5] + "<br/>" + "Bronze: " + initialCounts[6] + "<br/>" + "Silver: " + initialCounts[7] + "<br/>" + "Ceramic: " + initialCounts[8] + "<br/>" + "Alabaster: " + initialCounts[9] + "<br/>" + "Plaster: " + initialCounts[10])
// draw using sculpture data ----------------------------------------------->
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

function dataRender() {
  d3.json("full.json").then(data => {
    console.log("-----------------------------full data:")
    console.log(data);
    //image json data
    var imageArray = [];
    d3.json("finalClippedFileAndHeight.json").then(images => {
      images.forEach(image => {
        imageArray.push(image)
      })
    });
    console.log("------------imageArray:")
    console.log(imageArray)
    // to create percents instead of counts
    var initialBase = data.length / 500
    // materials and PERCENTS for initial drawing of bars on page load
    var startMaterialCounts = [{ material: "Gold", count: 54 / initialBase },
      { material: "Wood", count: 522 / initialBase },
      { material: "Marble", count: 355 / initialBase },
      { material: "Stone", count: 432 / initialBase },
      { material: "Terracotta", count: 103 / initialBase },
      { material: "Ivory", count: 50 / initialBase },
      { material: "Bronze", count: 487 / initialBase },
      { material: "Silver", count: 73 / initialBase },
      { material: "Ceramic", count: 156 / initialBase },
      { material: "Alabaster", count: 37 / initialBase },
      { material: "Plaster", count: 67 / initialBase }];
    //draw initial bars
    drawBars(startMaterialCounts);
    svg.selectAll("rect").attr("class", "individual-bars");
    //scales
    var formatPercent = d3.format(".0%");
    var yScale = d3.scaleLinear().domain([1, 0]).range([5, svgHeight - 30]);
    var yAxis = d3.axisLeft().scale(yScale).tickFormat(formatPercent);
    svg.append("g").call(yAxis).attr("transform", "translate(40,0)");
    svg.append("line").style("stroke", "black").attr("x1", 45) // x position of the first end of the line
      .attr("y1", 471) // y position of the first end of the line
      .attr("x2", 480) // x position of the second end of the line
      .attr("y2", 471); // y position of the second end of the line
    // when slider changes, create data arrays for bar chart
    interactivity(data, imageArray);
    console.log(sculptureArray);
  });
}
dataRender();

function mediumArray(object, arrayName, matchLC, matchCaps) {
  if (object.Medium.match(matchCaps) || object.Medium.match(matchLC)) {
    arrayName.push(object);
  }
}

function interactivity(data, imageArray) {
  slider2.on('onchange', vals => {
    // var intVals = parseInt(slider2.value())
    var lowerValueInt = parseInt(slider2.value()[0]);
    var upperValueInt = parseInt(slider2.value()[1]);
    d3.select('p#value-range').html(`<strong>Current Selection:</strong> <br> ${lowerValueInt}–${upperValueInt} centimeters<br><p class="in-ft">(${parseFloat(lowerValueInt*0.393701).toFixed(1)}–${parseFloat(upperValueInt*0.393701).toFixed(1)} inches)</p><br><p class="in-ft">(${parseFloat(lowerValueInt*0.0328084).toFixed(1)}–${parseFloat(upperValueInt*0.0328084).toFixed(1)} feet)</p>`);
    var sculpturesInSliderRange = [];
    console.log("Range values: " + vals)
    var upperBound = vals[1];
    var lowerBound = vals[0];
    console.log("***")
    data.forEach(object => {
      if (object.height <= upperBound && object.height >= lowerBound) {
        sculpturesInSliderRange.push(object)
      }
    });
    var rangeCount = d3.select('div#sculpture-range-count')
    rangeCount.html(`<p class="range-detail">Total Sculptures<br>in Range:</p><p class="range-number">${sculpturesInSliderRange.length}</p>`)
    console.log("total sculptures in range: " + sculpturesInSliderRange.length);
    console.log("***")
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
    var materialArrays = [gold, wood, marble, stone, terracotta, ivory, bronze, silver, ceramic, alabaster, plaster]
    sculpturesInSliderRange.forEach(rangedSculpture => {
      mediumArray(rangedSculpture, gold, "gold", "Gold");
      mediumArray(rangedSculpture, wood, "wood", "Wood");
      mediumArray(rangedSculpture, marble, "marble", "Marble");
      mediumArray(rangedSculpture, stone, "stone", "Stone");
      mediumArray(rangedSculpture, terracotta, "terracotta", "Terracotta");
      mediumArray(rangedSculpture, ivory, "ivory", "Ivory");
      mediumArray(rangedSculpture, bronze, "bronze", "Bronze");
      mediumArray(rangedSculpture, silver, "silver", "Silver");
      mediumArray(rangedSculpture, ceramic, "ceramic", "Ceramic");
      mediumArray(rangedSculpture, alabaster, "alabaster", "Alabaster");
      mediumArray(rangedSculpture, plaster, "plaster", "Plaster");
    });
    var base = sculpturesInSliderRange.length / 500;
    var numberInRange = sculpturesInSliderRange.length
    var materials = [{ material: "Gold", count: gold.length / base }, { material: "Wood", count: wood.length / base }, { material: "Marble", count: marble.length / base }, { material: "Stone", count: stone.length / base }, { material: "Terracotta", count: terracotta.length / base }, { material: "Ivory", count: ivory.length / base }, { material: "Bronze", count: bronze.length / base }, { material: "Silver", count: silver.length / base }, { material: "Ceramic", count: ceramic.length / base }, { material: "Alabaster", count: alabaster.length / base }, { material: "Plaster", count: plaster.length / base }];
    console.log("Bar Counts: " + materials);
    console.log("------------------");
    console.log("gold: " + parseFloat((gold.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("wood: " + parseFloat((wood.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("marble: " + parseFloat((marble.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("stone: " + parseFloat((stone.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("terracotta: " + parseFloat((terracotta.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("ivory: " + parseFloat((ivory.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("bronze: " + parseFloat((bronze.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("silver: " + parseFloat((silver.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("ceramic: " + parseFloat((ceramic.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("alabaster: " + parseFloat((alabaster.length / numberInRange) * 100).toFixed(2) + "%");
    console.log("plaster: " + parseFloat((plaster.length / numberInRange) * 100).toFixed(2) + "%");
    //legend text -------->
    var legendText = d3.select('div#legend')
    legendText.html("Gold: " + gold.length + "<br/>" + "Wood: " + wood.length + "<br/>" + "Marble: " + marble.length + "<br/>" + "Stone: " + stone.length + "<br/>" + "Terracotta: " + terracotta.length + "<br/>" + "Ivory: " + ivory.length + "<br/>" + "Bronze: " + bronze.length + "<br/>" + "Silver: " + silver.length + "<br/>" + "Ceramic: " + ceramic.length + "<br/>" + "Alabaster: " + alabaster.length + "<br/>" + "Plaster: " + plaster.length)
    var barPadding = 16;
    var barWidth = (svgWidth / materials.length);
    var bars = svg.select("g").selectAll("rect").remove().exit().data(materials);
    bars.enter().append("rect").attr("class", "bars").attr("y", function(d) {
      return svgHeight - d.count
    }).attr("height", function(d) {
      return d.count;
    }).attr("width", barWidth - barPadding).attr("transform", function(d, i) {
      var translate = [50 + ((barWidth - 8) * i), -30];
      return "translate(" + translate + ")";
    }).attr("fill", function(d, i) {
      var color = colors[i]
      return color
    });
    // for pointer on hover
    svg.selectAll("rect").attr("class", "individual-bars");
    var exploreImagesTitle = d3.select("div#explore-images-title")
    // on bar click, render images
    var clicked = false;
    //https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    function compare(a, b) {
      let comparison = 0;
      if (a.height > b.height) {
        comparison = 1;
      }
      else if (b.height > a.height) {
        comparison = -1;
      }
      return comparison;
    }
    //function to render comparison images
    function renderCompareImage(src, height, alt, className, parentQuery) {
      var imgDiv = document.createElement("div")
      imgDiv.className = className
      var img = document.createElement("img");
      img.src = src;
      img.style.height = height * 5 + "px";
      img.alt = alt;
      imgDiv.appendChild(img)
      var parent = document.querySelector(parentQuery)
      parent.appendChild(imgDiv)
    }
    //array for comparison selected images
    var arrayForCompare = [];
    svg.select("g").selectAll("rect").on("click", function(d, i) {
      console.log(d);
      var barClicked;
      //for scroll into view
      const element = document.getElementById('legend');
      // render images for each material
      for (var x = 0; x < materialNames.length; x++) {
        if (d.material == materialNamesCap[x]) {
          element.scrollIntoView({ behavior: "smooth" });
          exploreImagesTitle.html(`<p class="explore-images-title-p">${materialNamesCap[x]} sculptures from your selection</p>`).style("background", colors[x]).style("color", "black")
          removeElementsByClass(".displayed-images")
          var currentImages = [];
          for (var i = 0; i < materialArrays[x].length; i++) {
            imageArray.forEach(image => {
              if (materialArrays[x][i]["Object ID"].match(image["Object ID"])) {
                currentImages.push(image)
              }
            });
          }
          currentImages.sort(compare)
          renderEachImage(currentImages, "displayed-images", "#explore-images")
          console.log(currentImages)
          var eachExampleImage = document.querySelectorAll(".displayed-images")
          eachExampleImage.forEach(img => {
            img.addEventListener("mouseover", function() {
              var targetElement = this.parentNode.parentNode
              console.log(this)
              // console.log(targetElement)
              var tooltip = document.createElement("div")
              var currentImageInfo;
              currentImages.forEach(image => {
                if (image.fileName.match(this.src.split("_png/")[1].split(".png")[0])) {
                  currentImageInfo = image;
                  return currentImageInfo;
                }
              })
              var genderTag;
              if (currentImageInfo.gender == "m") {
                genderTag = "Male"
              }
              else if (currentImageInfo.gender == "w") {
                genderTag = "Female"
              }
              tooltip.className = "tooltip-test";
              tooltip.innerHTML = `${currentImageInfo["Object Name"]}<br>${currentImageInfo.Culture} | Year ${currentImageInfo["Object End Date"]}<br>${currentImageInfo.height} centimeters<br>Gender: ${genderTag}<br><p class="tooltip-title">Click Sculpture to Add to Selection</p>`;
              // <a href=${currentImageInfo["Link Resource"]}>View on Met Website</a>
              tooltip.style.left = event.clientX - 80 + "px";
              tooltip.style.top = event.clientY + 30 + "px";
              tooltip.style.position = "fixed";
              targetElement.appendChild(tooltip)
            })
          });
          eachExampleImage.forEach(img => {
            img.addEventListener("mouseout", function() {
              var targetElement = this.parentNode.parentNode
              var tooltip = document.querySelector(".tooltip-test")
              targetElement.removeChild(tooltip)
            })
          });
          eachExampleImage.forEach(img => {
            img.addEventListener("click", function() {
              console.log(this.src.split("_png/")[1].split(".png")[0])
              if (arrayForCompare.length <= 2) {
                currentImages.forEach(imgObject => {
                  if (imgObject.fileName.match(this.src.split("_png/")[1].split(".png")[0])) {
                    console.log("matched")
                    arrayForCompare.push(imgObject)
                  }
                  else {
                    console.log("not-matched")
                  }
                })
                removeElementsByClass(".compare-message-p")
                removeElementsByClass(".selected-sculpture-parent-div")
                renderEachImage(arrayForCompare, "selected-sculpture", ".sidebar-contents", "selected-sculpture-parent-div")
                removeElementsByClass(".compare-height-images")
                for (var i = 0; i < arrayForCompare.length; i++) {
                  console.log("comparison obejct: " + parseInt(arrayForCompare[i].height))
                  renderCompareImage(`../met_sculptures2/resized_clipped_tranparent_png/${arrayForCompare[i].fileName.split('.')[0]}.png`, parseInt(arrayForCompare[i].height), [i], "compare-height-images", ".compare-image-container")
                }
                //add "change selection" button to compare section
                removeElementsByClass(".change-selection-a")
                var changeSelectionButton = document.createElement("a")
                changeSelectionButton.className = "change-selection-a"
                changeSelectionButton.href = "#legend"
                changeSelectionButton.innerHTML = "Change sculpture selection"
                var changeSelectionDiv = document.querySelector(".change-selection")
                changeSelectionDiv.appendChild(changeSelectionButton)
                var removalIcons = document.querySelectorAll(".remove-icon")
                removalIcons.forEach(icon => {
                  icon.addEventListener("click", function() {
                    // console.log(this)
                    var index = this.parentNode.querySelector("img").alt
                    console.log("index: " + index)
                    this.parentNode.remove();
                    arrayForCompare.splice(index, 1)
                    if (arrayForCompare.length < 3) {
                      removeElementsByClass(".compare-selection-anchor")
                    }
                  })
                });
              }
              else {
                console.log("your selection is full, please remove a sculpture before adding to your selection")
              }
              console.log(arrayForCompare)
              if (arrayForCompare.length >= 3) {
                removeElementsByClass(".compare-selection-anchor")
                var compareAnchorDiv = document.querySelector(".compare-anchor-div")
                var compareAnchor = document.createElement("a")
                compareAnchor.href = "#learn-more"
                compareAnchor.className = "compare-selection-anchor"
                var compareImage = document.createElement("img")
                compareImage.src = "compare.png"
                compareImage.className = "compare-img"
                compareAnchor.appendChild(compareImage)
                compareAnchorDiv.appendChild(compareAnchor)
              }
            })
          })
          barClicked = x;
          clicked = true;
        }
      }
    });
    // -----------------------
    sculptureArray = sculpturesInSliderRange;
    materialArray = materials;
    goldArray = gold;
    woodArray = wood;
    marbleArray = marble;
    stoneArray = stone;
    terracottaArray = terracotta;
    ivoryArray = ivory;
    bronzeArray = bronze;
    silverArray = silver;
    ceramicArray = ceramic;
    alabasterArray = alabaster;
    plasterArray = plaster;
    return sculptureArray, materialArray, goldArray, woodArray, marbleArray, stoneArray, terracottaArray, ivoryArray, bronzeArray, silverArray, ceramicArray, alabasterArray, plasterArray;
  });
}
