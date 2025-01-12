const canvas = new fabric.Canvas('designCanvas');

// Image upload functionality
document.getElementById('imgUploader').onchange = function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      const fabricImage = new fabric.Image(img);
      fabricImage.scale(0.5);
      canvas.add(fabricImage);
    };
  };
  reader.readAsDataURL(e.target.files[0]);
};
