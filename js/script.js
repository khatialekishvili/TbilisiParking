// seeacrch
let parkingData = [];

const grid = document.querySelector('.parking-grid');
const searchInput = document.querySelector('.search-bar input');

function renderParkingCards(data) {
  if (!grid) return;
  grid.innerHTML = '';
  if (data.length === 0) {
    grid.innerHTML = '<p class="no-results">ვერაფერი მოიძებნა</p>';
    return;
  }
  data.forEach(item => {
    grid.innerHTML += `
    <article class="parking-card">
    <img src="${item.image}" alt="Parking">
    <div class="parking-info">
    <h3>${item.title}</h3>
    <p>${item.address}</p>
    </div>
    </article>
    `;
  });
}

if (grid) {
  fetch('data/parking.json')
  .then(r => r.json())
  .then(data => {
    parkingData = data;
    renderParkingCards(parkingData);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    if (!q) {
      renderParkingCards(parkingData);
      return;
    }
    const filtered = parkingData.filter(item =>
      item.title.toLowerCase().startsWith(q) ||
      item.address.toLowerCase().startsWith(q)
    );
    renderParkingCards(filtered);
  });
}

// updateParkingLayoutForTheme
const icons = {
  parking: document.getElementById('icon-parking'),
  add: document.getElementById('icon-add'),
  mail: document.getElementById('icon-mail')
};

function updateParkingLayoutForTheme(isDark) {
  const layoutImg = document.getElementById('parking-layout-img');
  if (layoutImg) {
    layoutImg.src = isDark
    ? "assets/booking/parking_layout_light.png"
    : "assets/booking/parking_layout.png";
  }
}

/////////////
// burgerMenu
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
const closeMenu = document.getElementById('closeMenu');
if (burger && mobileNav && closeMenu) {
  burger.addEventListener('click', () => {
    mobileNav.classList.add('open');
  });
  closeMenu.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
  window.addEventListener('click', (e) => {
    if (
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      e.target !== burger
    ) {
      mobileNav.classList.remove('open');
    }
  });
}

// updateIconsForTheme
function updateIconsForTheme(isDark) {
  const isHome =
  location.pathname.endsWith("index.html") ||
    location.pathname.endsWith("booking.html") ||
    location.pathname === "/" ||
    location.pathname === "/index.html" ||
    location.pathname === "/booking.html";

  if (icons.parking) {
    if (isHome) {
      icons.parking.src = "assets/header buttons/parking.svg";
    } else {
      icons.parking.src = isDark
        ? "assets/header buttons/parking_light.svg"
        : "assets/header buttons/2parking.svg";
    }
  }

  if (icons.add) icons.add.src = isDark
    ? "assets/header buttons/add_card_light.svg"
    : "assets/header buttons/add_card.svg";
  if (icons.mail) icons.mail.src = isDark
    ? "assets/header buttons/mail_light.svg"
    : "assets/header buttons/mail.svg";
  updateParkingLayoutForTheme(isDark);
}

// nightToggle desktop
const nightToggle = document.getElementById('night-toggle');
if (nightToggle) {
  nightToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    updateIconsForTheme(isDark);
    localStorage.setItem('nightMode', isDark);
  });
}

// nightToggle mobile
const nightToggleMobile = document.getElementById('night-toggle-mobile');
if (nightToggleMobile) {
  nightToggleMobile.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    updateIconsForTheme(isDark);
    localStorage.setItem('nightMode', isDark);
  });
}

// checkDarkModeOnLoad
const isDarkMode = localStorage.getItem('nightMode') === 'true';
if (isDarkMode) document.body.classList.add('dark-mode');
updateIconsForTheme(isDarkMode);

const transactions = [
  { date: '09/02/2023', text: 'ბარათი დამატებულია!', img: 'assets/tbilisi_parking.png' },
  { date: '09/02/2023', text: 'ბარათი დამატებულია!', img: 'assets/tbilisi_parking.png' },
];

if (grid) {
  fetch('data/parking.json')
    .then(response => response.json())
    .then(data => {
      grid.innerHTML = '';
      data.forEach(item => {
        grid.innerHTML += `
          <article class="parking-card">
            <img src="${item.image}" alt="Parking">
            <div class="parking-info">
              <h3>${item.title}</h3>
              <p>${item.address}</p>
            </div>
          </article>
        `;
      });
    });
}

// renderTransactions
const transactionsList = document.querySelector('.transactions-list');
if (transactionsList && transactions.length > 0) {
  transactionsList.innerHTML = '';
  transactions.forEach(trx => {
    transactionsList.innerHTML += `
      <div class="transaction-card">
        <img src="${trx.img}" alt="Card" class="transaction-card-img">
        <div class="transaction-details">
          <div>${trx.date}</div>
          <div>${trx.text}</div>
        </div>
      </div>
    `;
  });
}

fetch('data/transactions.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.transactions-list');
    container.innerHTML = '';
    data.forEach((item, idx) => {
      if (idx === 0) {
        container.innerHTML += `
          <div class="transaction-card">
            <img src="${item.img}" alt="Card" class="transaction-card-img">
            <div class="transaction-details">
              <div>${item.text}</div>
              <button class="pay-btn">გადახდა</button>
            </div>
          </div>
        `;
      } else {
        container.innerHTML += `
          <div class="transaction-card">
            <img src="${item.img}" alt="Card" class="transaction-card-img">
            <div class="transaction-details">
              <div>${item.date}</div>
              <div>${item.text}</div>
            </div>
          </div>
        `;
      }
    });
  });
