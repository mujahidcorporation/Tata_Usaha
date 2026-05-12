/* =========================
   DATABASE ARRAY
========================= */

let masuk = [];
let keluar = [];

let editIndex = null;
let editType = "suratMasuk";


/* =========================
   URL APPS SCRIPT
========================= */

const API_URL = "https://script.google.com/macros/s/AKfycbznt3QrrrQWnCNHfEHfQa_Pil7tGP1LMwA91CVRr5OPefhxkZjNBZPMcYiXOUO_8Mjz/exec";


/* =========================
   MENU
========================= */

function showMenu(id) {

  editType = id;

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

    alert("Lengkapi semua data!");
    return;
  }

  const data = {

    jenis: editType === "suratMasuk"
      ? "masuk"
      : "keluar",

    nomor: nomor,
    perihal: perihal,
    file: file
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

  } catch (error) {

    console.log(error);

    alert("Gagal menyimpan data");
  }
}


/* =========================
   EDIT DATA
========================= */

function editData(type, index) {

  editType = type;
  editIndex = index;

  const data = type === "suratMasuk"
    ? masuk[index]
    : keluar[index];

  document.getElementById('noInput').value = data.nomor;
  document.getElementById('perihalInput').value = data.perihal;
  document.getElementById('fileInput').value = data.file;
}


/* =========================
   HAPUS DATA
========================= */

function hapusData(type, index) {

  if (!confirm("Hapus data?")) return;

  if (type === "suratMasuk") {

    masuk.splice(index, 1);

  } else {

    keluar.splice(index, 1);
  }

  render();
}


/* =========================
   RESET FORM
========================= */

function reset() {

  document.getElementById('noInput').value = "";
  document.getElementById('perihalInput').value = "";
  document.getElementById('fileInput').value = "";

  editIndex = null;
}


/* =========================
   RENDER TABEL
========================= */

function render() {

  /* ================= MASUK ================= */

  let htmlMasuk = "";

  masuk.forEach((s, i) => {

    htmlMasuk += `
      <tr>
        <td>${s.nomor}</td>
        <td>${s.perihal}</td>

        <td>
          <a href="${s.file}" target="_blank">
            Lihat
          </a>
        </td>

        <td>
          <button onclick="editData('suratMasuk', ${i})">
            Edit
          </button>

          <button onclick="hapusData('suratMasuk', ${i})">
            Hapus
          </button>
        </td>
      </tr>
    `;
  });

  document.getElementById("suratMasukTable")
    .innerHTML = htmlMasuk;


  /* ================= KELUAR ================= */

  let htmlKeluar = "";

  keluar.forEach((s, i) => {

    htmlKeluar += `
      <tr>
        <td>${s.nomor}</td>
        <td>${s.perihal}</td>

        <td>
          <a href="${s.file}" target="_blank">
            Lihat
          </a>
        </td>

        <td>
          <button onclick="editData('suratKeluar', ${i})">
            Edit
          </button>

          <button onclick="hapusData('suratKeluar', ${i})">
            Hapus
          </button>
        </td>
      </tr>
    `;
  });

  document.getElementById("suratKeluarTable")
    .innerHTML = htmlKeluar;
}


/* =========================
   LOAD DATA
========================= */

async function loadData() {

  try {

    const response = await fetch(API_URL);

    const data = await response.json();

    masuk = data.filter(item => item.jenis === "masuk");

    keluar = data.filter(item => item.jenis === "keluar");

    render();

  } catch (error) {

    console.log(error);

    alert("Gagal mengambil data");
  }
}


/* =========================
   FIRST LOAD
========================= */

loadData();
