// საძიებო სისტემა: აქ ინახება პარკინგების მონაცემთა ბაზა
let parkingData = [];

// DOM-იდან ავიღებთ პარკინგების ბლოკს და ძებნის ველს
const grid = document.querySelector('.parking-grid');
const searchInput = document.querySelector('.search-bar input');

// ფუნქცია პარკინგების ბარათების დინამიური წარმოსაჩენად
function renderParkingCards(data) {
  if (!grid) return; // თუ ელემენტი არ არსებობს, გავჩერდეთ
  grid.innerHTML = ''; // დავასუფთავოთ არსებული HTML
  if (data.length === 0) {
    // თუ მონაცემები ცარიელია, გამოვიტანოთ შეტყობინება
    grid.innerHTML = '<p class="no-results">ვერაფერი მოიძებნა</p>';
    return;
  }
  // თითოეული ელემენტი ჩამოვაყალიბოთ HTML და ჩავწეროთ grid-ში
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

// თუ grid არსებობს, ჩატვირთე parking.json და ინახავს parkingData-ში, შემდეგ გამოიძახე render
if (grid) {
  fetch('data/parking.json')
    .then(r => r.json())
    .then(data => {
      parkingData = data;
      renderParkingCards(parkingData);
    });
}

// ძებნის ველისთვის - რეაგირება თითოეული აკრეფისას
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase(); // სტრიქონის გაწმენდა და პატარა ასოებში გადაკეთება
    if (!q) {
      renderParkingCards(parkingData); // თუ ძებნა ცარიელია, აჩვენე მთელი სიახლე
      return;
    }
    // ფილტრაცია - მხოლოდ ის პარკინგები რომელთა სათაურიც ან მისამართიც იწყება საძიებო სიტყვით
    const filtered = parkingData.filter(item =>
      item.title.toLowerCase().startsWith(q) ||
      item.address.toLowerCase().startsWith(q)
    );
    renderParkingCards(filtered); // შედეგების რენდერი
  });
}

// აიკონების ელემენტების აღება ID-თ
const icons = {
  parking: document.getElementById('icon-parking'),
  add: document.getElementById('icon-add'),
  mail: document.getElementById('icon-mail')
};

// ფუნქცია პარკინგის გამოსახულების შეცვლისთვის თემის შესაბამისად
function updateParkingLayoutForTheme(isDark) {
  const layoutImg = document.getElementById('parking-layout-img');
  if (layoutImg) {
    layoutImg.src = isDark
      ? "assets/booking/parking_layout_light.png"
      : "assets/booking/parking_layout.png";
  }
}

/////////////
// ბურგერ მენიუს მართვა მობილურებისთვის
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
const closeMenu = document.getElementById('closeMenu');

if (burger && mobileNav && closeMenu) {
  burger.addEventListener('click', () => {
    mobileNav.classList.add('open'); // მენიუს გახსნა
  });
  closeMenu.addEventListener('click', () => {
    mobileNav.classList.remove('open'); // მენიუს დახურვა
  });
  // თუ დააკლიკეს მენიუს გარეთ, მენიუ დაიხურება
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

// ფუნქცია აიკონების შეცვლისთვის თემის მიხედვით
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

// დესკტოპის ნაითმოდის ღილაკის ლისტენერი
const nightToggle = document.getElementById('night-toggle');
if (nightToggle) {
  nightToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // ღამის რეჟიმის ჩართვა/გამორთვა
    const isDark = document.body.classList.contains('dark-mode');
    updateIconsForTheme(isDark);
    localStorage.setItem('nightMode', isDark); // თემის შენახვა ლოკალურ მეხსიერებაში
  });
}

// მობილურის ღამის რეჟიმის ღილაკის ლისტენერი (მეორე მსგავსი ფუნქცია)
const nightToggleMobile = document.getElementById('night-toggle-mobile');
if (nightToggleMobile) {
  nightToggleMobile.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    updateIconsForTheme(isDark);
    localStorage.setItem('nightMode', isDark);
  });
}

// ფეიჯის ჩატვირთვისას თუ ღამის რეჟიმი იყო შენახული, ავტომატურად ჩართავს მას
const isDarkMode = localStorage.getItem('nightMode') === 'true';
if (isDarkMode) document.body.classList.add('dark-mode');
updateIconsForTheme(isDarkMode);

// ტრანზაქციების გამეორებითი, ადგილობრივი მასივი მაგალითისთვის
const transactions = [
  { date: '09/02/2023', text: 'ბარათი დამატებულია!', img: 'assets/tbilisi_parking.png' },
  { date: '09/02/2023', text: 'ბარათი დამატებულია!', img: 'assets/tbilisi_parking.png' },
];

// თუ grid არსებობს, ისევ ჩამოტვირთვა და პარკინგების ჩვენება (დაახლოებით დუბლირებული ლოგიკა)
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

// ტრანზაქციების სექციის DOM-სელექტორი
const transactionsList = document.querySelector('.transactions-list');
if (transactionsList && transactions.length > 0) {
  transactionsList.innerHTML = '';
  // ადგილზე არსებული ტრანზაქციების ჩაწერა DOM-ში
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

// რეალური ტრანზაქციების გადმოწერა JSON ფაილიდან და მათი დინამიური დათვალიერება
fetch('data/transactions.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.transactions-list');
    container.innerHTML = '';
    data.forEach((item, idx) => {
      if (idx === 0) {
        // მხოლოდ პირველ ტრანზაქციას აქვს "გადახდის" ღილაკი
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
        // დანარჩენებს აქვს მხოლოდ თარიღი და ტექსტი
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
