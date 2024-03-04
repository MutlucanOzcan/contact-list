//OBJELERDE KALITIM KONUSU

// function Person(ad, soyad, dogumYili, kilo) {
//     this.name = ad;
//     this.surname = soyad;
//     this.birthYear = dogumYili;
//     this.weight = kilo;
//   }
//   sayHi() {
//     return `Selam ben ${this.name} ${this.surname}. Dogum yilim: ${this.birthYear}. `;
//   }
// }

// yukarıdaki ile aşağıdaki birebir aynı şeyler. ES6'da alttaki gibi yazılıyor artık.
class Person {
  static sayac = 0;
  constructor(ad, soyad, dogumYili, kilo) {
    this.name = ad;
    this.surname = soyad;
    this.birthYear = dogumYili;
    this.weight = kilo;
    Person.sayac++;
  }
  sayHi() {
    return `Selam ben ${this.name} ${this.surname}. Dogum yilim: ${this.birthYear}. `;
  }
}

const mutlu = new Person("Mutlucan", "Ozcan", 1991, 130);

console.log(mutlu);
console.log(mutlu.sayHi());

class Ogrenci extends Person {
  constructor(ad, soyad, dogumYili, kilo, okul, sinif) {
    super(ad, soyad, dogumYili, kilo);
    this.okul = okul;
    this.sinif = sinif;
  }
  //alttaki gibi yeniden tanımlayarak da kalıtılan özellik değiştirilir.
  //veya yepyeni prototipler tanımlayabiliriz elbette.
  sayHi() {
    return `Selam ben ${this.name} ${this.surname}. Dogum yilim: ${this.birthYear}. ${this.okul}'nde ${this.sinif} eğitimi alıyorum. `;
  }
}

// //bu metod ile prototipleri de kalıtırız.
// Ogrenci.prototype = Object.create(Person.prototype);
// ;

const cemre = new Ogrenci("cemre", "ozcan", 1996, 65, "ege üni", "doktora");

console.log(cemre);
console.log(cemre.sayHi());
console.log("olusturulan person sayısı: " + Person.sayac);
/************************************************************************************/

