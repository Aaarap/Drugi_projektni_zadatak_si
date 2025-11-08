// Shared movie data
const movies = [
  { title: "Inception", img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg" },
  { title: "Interstellar", img: "https://cdn.britannica.com/15/181115-050-13EF0AFB/Matthew-McConaughey-Interstellar-Christopher-Nolan.jpg" },
  { title: "The Dark Knight", img: "https://m.media-amazon.com/images/I/81AJdOIEIhL._AC_SY679_.jpg" },
  { title: "Avatar", img: "https://m.media-amazon.com/images/I/61OUGpUfAyL._AC_SY679_.jpg" },
  { title: "Star Wars", img: "https://musicart.xboxlive.com/7/64325100-0000-0000-0000-000000000002/504/image.jpg" },
  { title: "The Ring", img: "https://m.media-amazon.com/images/I/610iKNq4JXL._AC_UF1000,1000_QL80_.jpg" },
];

// --- INDEX PAGE (HOME) ---
if (document.getElementById("movie-list")) {
  const movieList = document.getElementById("movie-list");
  movies.forEach((movie) => {
    movieList.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow">
          <img src="${movie.img}" class="card-img-top" alt="${movie.title}">
          <div class="card-body text-center">
            <h5 class="card-title">${movie.title}</h5>
            <a href="reservations.html" class="btn btn-warning">Reserve</a>
          </div>
        </div>
      </div>`;
  });
}

// --- RESERVATION PAGE ---
if (document.getElementById("reservation-form")) {
  const form = document.getElementById("reservation-form");
  const movieSelect = document.getElementById("movie");
  const reservationsList = document.getElementById("reservations-list");

  // Populate dropdown
  movies.forEach((m) => {
    movieSelect.innerHTML += `<option value="${m.title}">${m.title}</option>`;
  });

  // Load existing reservations
  const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  updateReservations();

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const seats = document.getElementById("seats").value;
    const movie = movieSelect.value;

    if (!name || seats <= 0) return alert("Please fill in all fields correctly!");

    reservations.push({ name, seats, movie });
    localStorage.setItem("reservations", JSON.stringify(reservations));
    updateReservations();
    form.reset();
  });

  // Update reservations list
  function updateReservations() {
    reservationsList.innerHTML = "";
    if (reservations.length === 0) {
      reservationsList.innerHTML = `<li class="list-group-item text-center text-dark">No reservations yet.</li>`;
      return;
    }
    reservations.forEach((r, index) => {
      reservationsList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span><strong>${r.movie}</strong> - ${r.name} (${r.seats} seats)</span>
          <button class="btn btn-sm btn-danger" onclick="deleteReservation(${index})">Cancel</button>
        </li>`;
    });
  }

  // Delete reservation
  window.deleteReservation = (index) => {
    reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    updateReservations();
  };
}
// --- SNACKS PAGE ---
if (document.getElementById("snacks-list")) {
  const snacks = [
    { name: "Popcorn", price: "4.00 KM", img: "https://www.225batonrouge.com/wp-content/uploads/2025/01/ACS_7243-Edit-2.vu_-scaled.jpg" },
    { name: "Nachos", price: "5.00 KM", img: "https://m.media-amazon.com/images/I/91p5bB7poWL._AC_UF894,1000_QL80_.jpg" },
    { name: "Soda", price: "3.50 KM", img: "https://www.fodors.com/wp-content/uploads/2019/03/HERO_Worlds_Best_Soda_Bundaberg_shutterstock_679079920.jpg" },
    { name: "M&Ms", price: "3.00 KM", img: "https://www.2foodtrippers.com/wp-content/uploads/2024/08/MMs-Bags-Rows.jpg" },
    { name: "Chocolate Bar", price: "2.00 KM", img: "https://www.foodandwine.com/thmb/VOCShOG5uYdtSsDtT88m-M8WYt0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/history-of-american-candy-bars-4-FT-BLOG1018-c717e0e2e09b4b509791cc08afc1ee26.jpg" },
    { name: "Water", price: "1.50 KM", img: "https://i.ytimg.com/vi/6_t4wKyAS2U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBMDQ76gMljTRFF27EY0aGxA0GxIg" }
  ];

  const snacksList = document.getElementById("snacks-list");

  snacks.forEach(snack => {
    snacksList.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center shadow">
          <img src="${snack.img}" class="card-img-top" alt="${snack.name}">
          <div class="card-body">
            <h5 class="card-title">${snack.name}</h5>
            <p class="card-text text-warning fw-bold">${snack.price}</p>
          </div>
        </div>
      </div>
    `;
  });
}