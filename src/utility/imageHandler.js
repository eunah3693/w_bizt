export function resizeImage(file, callback) {
  // Ensure it's an image
  if (file.type.match(/image.*/)) {
    // Load the image
    var reader = new FileReader();
    reader.onload = (readerEvent) => {
      var image = new Image();
      image.onload = (imageEvent) => {
        // Resize the image
        var canvas = document.createElement("canvas"),
          max_size = 1280, // TODO : pull max size from a site config
          width = image.width,
          height = image.height;
        if (width > height) {
          if (width > max_size) {
            height *= max_size / width;
            width = max_size;
          }
        } else {
          if (height > max_size) {
            width *= max_size / height;
            height = max_size;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL("image/jpeg");
        var resizedImage = dataURLToBlob(dataUrl);
        callback(resizedImage);
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  }
}

/* Utility function to convert a canvas to a BLOB */
var dataURLToBlob = function (dataURL) {
  var BASE64_MARKER = ";base64,";
  var parts;
  var contentType;
  var raw;
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    parts = dataURL.split(",");
    contentType = parts[0].split(":")[1];
    raw = parts[1];

    return new Blob([raw], { type: contentType });
  }

  parts = dataURL.split(BASE64_MARKER);
  contentType = parts[0].split(":")[1];
  raw = window.atob(parts[1]);

  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};
/* End Utility function to convert a canvas to a BLOB      */
