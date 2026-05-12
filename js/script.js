const API_URL = "https://script.google.com/macros/s/AKfycbznt3QrrrQWnCNHfEHfQa_Pil7tGP1LMwA91CVRr5OPefhxkZjNBZPMcYiXOUO_8Mjz/exec";

let masuk = [];
let keluar = [];


/* =========================
   MENU
========================= */

function showMenu(id) {

  document.querySelectorAll('.menu')
    .forEach(menu => menu.classList.remove('active'));

  document.getElementById(id)
    .classList.add('active');
}


/* =========================
   SIMPAN DATA
========================= */

async function simpanData() {

  const nomor = document.getElementById('noInput').value;
  const perihal = document.getElementById('perihalInput').value;
  const file = document.getElementById('fileInput').value;

  if (!nomor || !perihal || !file) {

    alert("Lengkapi data");
    return;
  }

  const jenis = document
    .getElementById("suratMasuk")
    .classList.contains("active")

    ? "masuk"
    : "keluar";


  const data = {
    jenis,
    nomor,
    perihal,
    file
  };

  try {

    await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)
    });

    alert("Data berhasil disimpan");

    reset();

    loadData();

  } catch(err) {

    console.log(err);

    alert("Gagal simpan data");
  }
}


/* =========================
   RESET FORM
========================= */

function reset() {

  document.getElementById('noInput').value = "";
  document.getElementById('perihalInput').value = "";
  document.getElementById('fileInput').value = "";
}


/* =========================
   LOAD DATA
========================= */

async function loadData() {

  try {

    const response = await fetch(API_URL);

    const data = await response.json();

    masuk = data.filter(d => d.jenis === "masuk");

    keluar = data.filter(d => d.jenis === "keluar");

    render();

  } catch(err) {

    console.log(err);

    alert("Gagal mengambil data");
  }
}


/* =========================
   RENDER
========================= */

function render() {

  let htmlMasuk = "";

  masuk.forEach((s) => {

    htmlMasuk += `
      <tr>
        <td>${s.nomor}</td>
        <td>${s.perihal}</td>

        <td>
          <a href="${s.file}" target="_blank">
            Lihat
          </a>
        </td>
      </tr>
    `;
  });

  document.getElementById("suratMasukTable")
    .innerHTML = htmlMasuk;



  let htmlKeluar = "";

  keluar.forEach((s) => {

    htmlKeluar += `
      <tr>
        <td>${s.nomor}</td>
        <td>${s.perihal}</td>

        <td>
          <a href="${s.file}" target="_blank">
            Lihat
          </a>
        </td>
      </tr>
    `;
  });

  document.getElementById("suratKeluarTable")
    .innerHTML = htmlKeluar;
}


/* =========================
   FIRST LOAD
========================= */

loadData();
