const dizi = [1, 2, 3, 4];

const newDizi = dizi.map((eleman) => {
  return (eleman = eleman * 2);
});

console.log(dizi);
console.log(newDizi);



const kisiler = [
    {adi:'emre', soyadi:'altunbilek'},
    {adi:'hasan', soyadi:'yılmaz'},
    {adi:'ali', soyadi:'koç'},
];

const yeniIsimler = kisiler.map((kisi) => kisi.adi + " " + kisi.soyadi);
console.log(yeniIsimler);
