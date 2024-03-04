// const renkler = [
//   "kırmızı",
//   "mavi",
//   "sarı",
//   "yeşil",
//   "mor",
//   "siyah",
//   "lacivert",
// ];

// const [r1, r2, , , r3] = renkler;

// console.log(r1, r2, r3); // ekrana kırmızı-mavi-mor renklerini yazdırır.

// const [c1, c2, ...kalanRenkler] = renkler;

// console.log(c1, c2, kalanRenkler); // ekrana tüm renkler dizisini yazdırır. spread operatörden dolayı
// //------------------------------------------------------------

// // obj dest

// let ayarlar = {
//   //baslik: "js mük",
//   genislik: "300px",
//   yukseklik: "300px",
// };

// const { baslik: b = "varsayilan baslik", genislik: g, yukseklik: y } = ayarlar; //parçalama işlemi burada

// console.log(b, g, y);
// //------------------------------------------------------------
// const il = "ankara";
// const ilce = "yenimahalle";
// //yöntem 1
// const sehir = {
//   il: il,
//   ilce: ilce,
// };
// //2
// const sehir2 = { il, ilce };
// console.log(sehir);
// console.log(sehir2);
// //------------------------------------------------------------

// const person = {
//   ad: "emre",
//   yas: 32,
//   sehirr: "ank",
//   mah: "yenimah",
// };

// const { yas, ...digerKeyler } = person;
// console.log(yas, digerKeyler);

//------------------------------------------------------------

let insan = {
  ad: {
    namee: "mutlucan",
    surname: "özcan",
  },
  sehirr: ["denizli", "camlik"],
  yas: 33,
};

// const { ad } = insan;
// console.log(ad);   //ad:{degerler} bu degerleri yazdırır.

// const {
//   ad: { namee, surname },
// } = insan;

// console.log(namee + " " + surname);

// console.log(insan); //orjinal yapı bozulmaz

// const { sehirr } = insan; // const sehirr = ["denizli","camlik"] demek

// console.log(sehirr);

const {
  ad: { namee, surname },
  sehirr: [s1, s2],
  yas,
} = insan;

console.log(namee, surname, s1, s2, yas);
