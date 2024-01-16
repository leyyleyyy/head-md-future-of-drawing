document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.querySelector("#canvas");
  let context = canvas.getContext("2d");
  let video = document.querySelector("#video");
  let snapButton = document.querySelector("#snap");
  let descriptionElement = document.querySelector("#description"); // Élément pour afficher la description
  let generatedImageElement = document.querySelector("#generatedImage"); // Élément pour afficher l'image générée

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
      video.play();
    });
  }

  // Fonction pour prendre une photo
  function takePhoto() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let imageDataURL = canvas.toDataURL("image/png");
    sendImageToServer(imageDataURL);
  }

  // Gestionnaire d'événement pour le bouton snap
  snapButton.addEventListener("click", function () {
    takePhoto();
  });

  // Gestionnaire d'événement pour la touche 'k'
  document.addEventListener("keydown", function (event) {
    if (event.key === "k") {
      takePhoto();
    }
  });

  function sendImageToServer(imageDataURL) {
    fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageDataURL }),
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((data) => {
        descriptionElement.textContent = data.description; // Afficher la description textuelle
        generateImageFromDescription(data.description); // Générer l'image
      })
      .catch((error) => {
        console.error("Error sending image to server:", error);
      });
  }

  /*
  function generateImageFromDescription(description) {
    return fetch("http://localhost:3000/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: description }),
    })
      .then((response) => response.json())
      .then((data) => {
        generatedImageElement.src = data.imageUrl; // Afficher l'image générée
      })
      .catch((error) => {
        console.error("Error in generateImageFromDescription:", error);
      });
  }
});*/
  function generateImageFromDescription(description) {
    return fetch("http://localhost:3000/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: description }),
    })
      .then((response) => response.json())
      .then((data) => {
        generatedImageElement.src = data.imageUrl; // Afficher l'image générée
        generatedImageElement.style.display = "block"; // Rendre l'image visible
      })
      .catch((error) => {
        console.error("Error in generateImageFromDescription:", error);
      });
  }
});

/*document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.querySelector("#canvas");
  let context = canvas.getContext("2d");
  let video = document.querySelector("#video");
  let snapButton = document.querySelector("#snap");
  let descriptionElement = document.querySelector("#description"); // Élément pour afficher la description
  let generatedImageElement = document.querySelector("#generatedImage"); // Élément pour afficher l'image générée

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
      video.play();
    });
  }

  snapButton.addEventListener("click", function () {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let imageDataURL = canvas.toDataURL("image/png");
    sendImageToServer(imageDataURL);
  });

  function sendImageToServer(imageDataURL) {
    fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageDataURL }),
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((data) => {
        descriptionElement.textContent = data.description; // Afficher la description textuelle
        generateImageFromDescription(data.description); // Générer l'image
      })
      .catch((error) => {
        console.error("Error sending image to server:", error);
      });
  }

  function generateImageFromDescription(description) {
    return fetch("http://localhost:3000/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: description }),
    })
      .then((response) => response.json())
      .then((data) => {
        generatedImageElement.src = data.imageUrl; // Afficher l'image générée
      })
      .catch((error) => {
        console.error("Error in generateImageFromDescription:", error);
      });
  }
});*/
