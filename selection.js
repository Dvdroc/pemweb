window.addEventListener("DOMContentLoaded", function () {
  const bestSellerSection = document.getElementById("best-sellers");
  const allBestSellers = document.querySelectorAll("#all-cakes .best-seller");

  allBestSellers.forEach((cake) => {
    const parentLink = cake.closest("a");
    if (parentLink) {
      const clone = parentLink.cloneNode(true);
      bestSellerSection.appendChild(clone);
    } else {
      const clone = cake.cloneNode(true);
      bestSellerSection.appendChild(clone);
    }
  });
  

  const searchInput = document.getElementById("cake-search");
  const suggestions = document.getElementById("search-suggestions");
  const cakeItems = document.querySelectorAll("#all-cakes .cake-item");

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    suggestions.innerHTML = "";
    if (!keyword) {
      suggestions.classList.add("hidden");
      return;
    }

    const filtered = Array.from(cakeItems).filter((card) => {
      const name = card.querySelector(".cake-name").textContent.trim().toLowerCase();
      return name.includes(keyword);
    });

    if (filtered.length === 0) {
      suggestions.classList.add("hidden");
      return;
    }

    filtered.forEach((card) => {
      const name = card.querySelector(".cake-name").textContent.trim();
      const link = card.closest("a")?.getAttribute("href") || "#";

      const item = document.createElement("div");
      item.textContent = name;
      item.className = "px-4 py-2 hover:bg-pink-100 cursor-pointer";
      item.addEventListener("click", () => {
        window.location.href = link;
      });
      suggestions.appendChild(item);
    });

    suggestions.classList.remove("hidden");
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const keyword = searchInput.value.toLowerCase().trim();

      const match = Array.from(cakeItems).find((card) => {
        const name = card.querySelector(".cake-name").textContent.trim().toLowerCase();
        return name.includes(keyword);
      });

      if (match) {
        const href = match.closest("a")?.getAttribute("href");
        if (href) {
          window.location.href = href;
        } else {
          alert("Link pembelian tidak ditemukan.");
        }
      } else {
        alert("Kue tidak ditemukan.");
      }
    }
  });


  document.addEventListener("click", (e) => {
    if (!suggestions.contains(e.target) && e.target !== searchInput) {
      suggestions.classList.add("hidden");
    }
  });
});
