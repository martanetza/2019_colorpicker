"use strict";

let img;
let imgData;
let pixelIndex;
const imageCanvas = document.getElementById("imageCanvas");
const zoomCanvas = document.getElementById("zoomCanvas");
let ctx = imageCanvas.getContext("2d");
let ctxZoom = null;
let zoomData;

document.addEventListener("DOMContentLoaded", drawImg);
function drawImg() {
  img = new Image();
  img.src = "cat.jpg";

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    getImgData();
    createImgData();
    document
      .getElementById("imageCanvas")
      .addEventListener("mousemove", showPosition);
  };
}

function createImgData() {
  ctxZoom = document.getElementById("zoomCanvas").getContext("2d");
  zoomData = ctxZoom.createImageData(10, 10);
}

function showZoomImgData() {
  ctxZoom.putImageData(zoomData, 0, 0);
  // console.log(zoomData);
}

function showPosition(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //   console.log(x, y);
  ctx.putImageData(imgData, 0, 0);
  drawRectangle(x, y);
  getRGB(x, y);
  showZoomImgData();
  copyPixels(x, y);
}

function drawRectangle(x, y) {
  ctx.strokeRect(x - 5, y - 5, 10, 10);
  ctx.strokeStyle = "green";
}

// 🎁 Here you go! 🎁

function getImgData() {
  imgData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
}

function getRGB(x, y) {
  pixelIndex = 4 * (x + y * imageCanvas.width);
  // console.log(imgData.data[pixelIndex]);
  let rgb = {
    r: imgData.data[pixelIndex],
    g: imgData.data[pixelIndex + 1],
    b: imgData.data[pixelIndex + 2]
  };
  showColorInfo(rgb);
}
// let rgb1 = { r: 250, g: 218, b: 94 };

function showColorInfo(rgb) {
  document.querySelector("#r").textContent = rgb.r;
  document.querySelector("#g").textContent = rgb.g;
  document.querySelector("#b").textContent = rgb.b;
  // console.log(rgb.r);
  const hex =
    "#" +
    rgb.r.toString(16).padStart(2, "0") +
    rgb.g.toString(16).padStart(2, "0") +
    rgb.b.toString(16).padStart(2, "0");

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}
console.log(imageCanvas.width);
console.log(zoomCanvas.width);
function copyPixels(startX, startY) {
  const w = ctxZoom.canvas.width;
  const imageW = ctx.canvas.width;

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const pixelIndex = (x + y * w) * 4;
      const imageX = startX + x;
      const imageY = startY + y;
      const imageIndex = (imageX + imageY * imageW) * 4;
      // console.log(imageIndex);

      zoomData.data[pixelIndex] = imgData.data[imageIndex];
      zoomData.data[pixelIndex + 1] = imgData.data[imageIndex + 1];
      zoomData.data[pixelIndex + 2] = imgData.data[imageIndex + 2];
      zoomData.data[pixelIndex + 3] = imgData.data[imageIndex + 3];
    }
  }
}
