let wikiUrl = document.createElement("a");

function createImages(data) {
  const container = document.querySelector(".swiper-wrapper");
  const modal = document.getElementById("myModal");
  const h2 = document.createElement("h2");
  const modalContent = document.getElementsByClassName("modal-content")[0];
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");

  for (let i = 0; i < 80; i++) {
    const character = data[i];
    console.log(character);

    if (character.image) {
      const p4 = document.createElement("p");
      p4.innerText = character.name;
      const a = document.createElement("a");
      a.classList.add("btn");

      const img = document.createElement("img");
      img.src = character.image;
      img.alt = character.name;

      const slideDiv = document.createElement("div");
      slideDiv.classList.add("swiper-slide");
      a.appendChild(p4);
      a.appendChild(img);
      slideDiv.appendChild(a);
      container.appendChild(slideDiv);

      a.onclick = function () {
        wikiUrl.href = character.wiki;
        wikiUrl.innerText = "More Info...";
        wikiUrl.target = "_blank";

        modalContent.innerHTML = "";
   
        modal.style.display = "block";
        h2.innerText = character.name;
        p1.innerText = `Species: ${character.species}`;
        p2.innerText = `HomeWorld: ${character.homeworld}`;
        p3.appendChild(wikiUrl);
        const modalImg = document.createElement("img");
   
        const span1 = document.createElement("span");
        span1.innerText = "X";
        span1.className = "close";

        span1.onclick = function () {
          modal.style.display = "none";
        };
        modalContent.appendChild(span1);
        modalImg.src = character.image;
        modalContent.appendChild(modalImg);
        modalContent.appendChild(h2);
        modalContent.appendChild(p1);
        modalContent.appendChild(p2);
        modalContent.appendChild(p3);
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
  }
}

const afficher = async () => {
  try {
    const response = await fetch(
      "https://akabab.github.io/starwars-api/api/all.json"
    );
    if (response.ok) {
      const data = await response.json();
      createImages(data);
    } else {
      alert("err");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log("Error :Please try again later.");
  }
};

afficher();

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
