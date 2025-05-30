window.addEventListener("DOMContentLoaded", function () {
  const bestSellersContainer = document.getElementById("best-sellers");
  const allCakesContainer = document.getElementById("all-cakes");
  const paginationContainer = document.getElementById("pagination");
  const itemsPerPage = 10;
  let currentPage = 1;

  function renderBestSellers() {
    bestSellersContainer.innerHTML = '';
    const bestSellers = cakes.filter(cake => cake.bestSeller);
    bestSellers.forEach(cake => {
      bestSellersContainer.innerHTML += createCakeCard(cake);
    });
  }

  function renderAllCakes(page = 1) {
    allCakesContainer.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedCakes = cakes.slice(startIndex, startIndex + itemsPerPage);
    paginatedCakes.forEach(cake => {
      allCakesContainer.innerHTML += createCakeCard(cake);
    });
    renderPagination();
  }

  function createCakeCard(cake) {
    const priceFormat = `Rp${cake.price.toLocaleString("id-ID")}`;
    const wrapperStart = cake.link ? `<a href="${cake.link}" class="block">` : `<div class="block">`;
    const wrapperEnd = cake.link ? `</a>` : `</div>`;
    return `
      ${wrapperStart}
        <div class="flex flex-col gap-3 pb-3 cake-item" id="${cake.id}">
          <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
               style='background-image: url("${cake.image}");'></div>
          <div>
            <p class="cake-name text-[#1b0d11] text-base font-medium leading-normal">${cake.name}</p>
            <p class="text-[#9a4c5f] text-sm font-normal leading-normal">${priceFormat}</p>
          </div>
        </div>
      ${wrapperEnd}
    `;
  }

  function renderPagination() {
    paginationContainer.innerHTML = '';
    const pageCount = Math.ceil(cakes.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = `px-3 py-1 rounded ${i === currentPage ? 'bg-[#9a4c5f] text-white' : 'bg-gray-200 text-black'}`;
      btn.addEventListener('click', () => {
        currentPage = i;
        renderAllCakes(currentPage);
      });
      paginationContainer.appendChild(btn);
    }
  }

  renderBestSellers();
  renderAllCakes(currentPage);

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
  
    // Cari langsung di array cakes, bukan DOM
    const filtered = cakes.filter(cake =>
      cake.name.toLowerCase().includes(keyword)
    );
  
    if (filtered.length === 0) {
      suggestions.classList.add("hidden");
      return;
    }
  
    filtered.forEach((cake) => {
      const item = document.createElement("div");
      item.textContent = cake.name;
      item.className = "px-4 py-2 hover:bg-pink-100 cursor-pointer";
      item.addEventListener("click", () => {
        window.location.href = cake.link || "#";
      });
      suggestions.appendChild(item);
    });
  
    suggestions.classList.remove("hidden");
  });
  
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const keyword = searchInput.value.toLowerCase().trim();
      const match = cakes.find(cake =>
        cake.name.toLowerCase().includes(keyword)
      );
  
      if (match) {
        if (match.link) {
          window.location.href = match.link;
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
