"use strict";

/*
|--------------------------------------------------------------------------
| DummySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Category = use("App/Models/Category");
const Product = use("App/Models/Product");
const Picture = use("App/Models/Picture");
const User = use("App/Models/User");
const Cart = use("App/Models/Cart");
const Address = use("App/Models/Address");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class DummySeeder {
  async run() {
    const cat1 = new Category();
    cat1.name = "Tanaman Akuatik";
    cat1.cover = "akuatik01.jpg";
    await cat1.save();

    const cat2 = new Category();
    cat2.name = "Tanaman Hias";
    cat2.cover = "hias01.jpg";
    await cat2.save();

    const cat3 = new Category();
    cat3.name = "Tumbuhan Obat";
    cat3.cover = "obat01.jpg";
    await cat3.save();

    const cat4 = new Category();
    cat4.name = "Pohon Buah";
    cat4.cover = "buah01.jpg";
    await cat4.save();

    const cat5 = new Category();
    cat5.name = "Biji Tanaman";
    cat5.cover = "biji001.jpg";
    await cat5.save();

    const cat6 = new Category();
    cat6.name = "Tanaman Kopi";
    cat6.cover = "coffe001.jpg";
    await cat6.save();

    const cat7 = new Category();
    cat7.name = "Pupuk Tanaman";
    cat7.cover = "pupuk001.jpg";
    await cat7.save();

    const cat8 = new Category();
    cat8.name = "Peralatan Tanaman";
    cat8.cover = "alat001.jpg";
    await cat8.save();

    const pro1 = new Product();
    pro1.name = "Kamboja Jepang Kecil";
    pro1.price = 20000;
    pro1.description =
      "Adenium atau Kamboja Jepang (nama kamboja jepang sendiri sebenarnya menyesatkan karena dapat diidentikkan dengan kamboja, yang banyak ditemui di areal pemakaman. Sedangkan embel-embel kata jepang seakan-akan bunga ini berasal dari Jepang, padahal Adenium berasal dari Asia Barat dan Afrika) berasal dari daerah gurun pasir yang kering, dari daratan Asia Barat sampai Afrika. Sebutan di sana adalah Mawar Padang Pasir (desert rose). Karena berasal dari daerah kering, tanaman ini tumbuh lebih baik pada kondisi media yang kering dibanding terlalu basah. Disebut sebagai adenium karena salah satu tempat asal adenium adalah daerah Aden (Ibukota Yaman).";
    pro1.category_id = 2;
    pro1.quantity = 10;
    pro1.weight = 1700;
    await pro1.save();

    const pro2 = new Product();
    pro2.name = "Kamboja Jepang Besar";
    pro2.price = 100000;
    pro2.description =
      "Bunga Kamboja dan Adenium (Kamboja Jepang) adalah dua jenis bunga yang berbeda, meskipun masih berkerabat, yakni sama-sama famili Apocynaceae. Banyak yang tidak menyadari perbedaan Adenium dan Kamboja, bahkan menganggap antara keduanya sebagai jenis bunga yang sama. Kamboja sebagai bunga yang normal dan Kamboja Jepang (Adenium) sebagai versi Kamboja berukuran mini atau bonsai. Padahal perbedaan antara keduanya bisa langsung dilihat dari genusnya yang berbeda, dimana Kamboja Jepang dari genus Adenium sedangkan Kamboja dari genus Plumeria.";
    pro2.category_id = 2;
    pro2.quantity = 10;
    pro2.weight = 2000;
    await pro2.save();

    const pro3 = new Product();
    pro3.name = "Rumput Laut";
    pro3.price = 30000;
    pro3.description =
      "Gulma laut, ganggang laut[1], atau rumput laut merupakan salah satu sumber daya hayati yang terdapat di wilayah pesisir dan laut.";
    pro3.category_id = 1;
    pro3.quantity = 10;
    pro3.weight = 500;
    await pro3.save();

    const pro4 = new Product();
    pro4.name = "Pohon Jeruk Imlek";
    pro4.price = 50000;
    pro4.description =
      "Rangkaian pohon buah jeruk ini pas utk menyemarakkan acara imlek, utk dekorasi meja atau kantor. Juga bagus sbg kado utk relasi dan keluarga anda.. Pohon Jeruk Imlek yang di percaya merupakan Pohon Membawa Keselamatan dan membawa Kemudahan dalam Hidup. itulah kenapa Sering kali waktu imlek di suruh bawa dua buah Jeruk Mandarin ke rumah Saudara sebagai oleh oleh, ";
    pro4.category_id = 4;
    pro4.quantity = 10;
    pro4.weight = 700;
    await pro4.save();

    const pro5 = new Product();
    pro5.name = "Dendrobium Kecil";
    pro5.price = 35000;
    pro5.description =
      "Beli 1Kg Bisa Muat 4 Pot Beli 6Kg Dapat FREE ONGKIR = 1Kg dari Penjual + 2 Pot FREE Ke Seluruh Indonesia Beli 15 Pot Gratis = 1 Pot Penjual Callista Orchid &amp;amp; Supplies: Menyediakan berbagai jenis kebutuhan anggrek &amp;amp; tanaman hias lain nya, Siapa cepat Dapat yang sudah knob bunga/Spike/SESUAI STOK YANG ADA DI KEBUN ";
    pro5.category_id = 2;
    pro5.quantity = 10;
    pro5.weight = 1200;
    await pro5.save();

    const pic1 = new Picture();
    pic1.cover = "kambojakecil001.jpg";
    pic1.product_id = 1;
    await pic1.save();

    const pic2 = new Picture();
    pic2.cover = "kambojakecil002.jpg";
    pic2.product_id = 1;
    await pic2.save();

    const pic3 = new Picture();
    pic3.cover = "kambojakecil003.jpg";
    pic3.product_id = 1;
    await pic3.save();

    const pic4 = new Picture();
    pic4.cover = "kambojabesar001.jpg";
    pic4.product_id = 2;
    await pic4.save();

    const pic5 = new Picture();
    pic5.cover = "kambojabesar002.jpg";
    pic5.product_id = 2;
    await pic5.save();

    const pic6 = new Picture();
    pic6.cover = "kambojabesar003.jpg";
    pic6.product_id = 2;
    await pic6.save();

    const pic7 = new Picture();
    pic7.cover = "rumputlaut001.jpg";
    pic7.product_id = 3;
    await pic7.save();

    const pic8 = new Picture();
    pic8.cover = "rumputlaut002.jpg";
    pic8.product_id = 3;
    await pic8.save();

    const pic9 = new Picture();
    pic9.cover = "rumputlaut003.jpg";
    pic9.product_id = 3;
    await pic9.save();

    const pic10 = new Picture();
    pic10.cover = "jerukimlek001.jpg";
    pic10.product_id = 4;
    await pic10.save();

    const pic11 = new Picture();
    pic11.cover = "jerukimlek002.jpg";
    pic11.product_id = 4;
    await pic11.save();

    const pic12 = new Picture();
    pic12.cover = "jerukimlek003.jpg";
    pic12.product_id = 4;
    await pic12.save();

    const pic13 = new Picture();
    pic13.cover = "dendrobium001.jpg";
    pic13.product_id = 5;
    await pic13.save();

    const pic14 = new Picture();
    pic14.cover = "dendrobium002.jpg";
    pic14.product_id = 5;
    await pic14.save();

    const pic15 = new Picture();
    pic15.cover = "dendrobium003.jpg";
    pic15.product_id = 5;
    await pic15.save();

    let user = new User();
    user.username = "fadli";
    user.email = "fadlimuharram@hotmail.com";
    user.password = "fadli123456";
    user.picture = "no_avatar.jpg";
    user.level = 1;
    await user.save();

    const usr1Cart = new Cart();
    usr1Cart.product_id = pro2.id;
    usr1Cart.user_id = user.id;
    usr1Cart.quantity = 2;
    usr1Cart.price = usr1Cart.quantity * pro2.price;
    usr1Cart.message =
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, expedita?";
    await usr1Cart.save();

    const add1 = new Address();
    add1.title = "rumah";
    add1.address = "jl bla bla";
    add1.province = "DKI Jakarta";
    add1.province_id = "6";
    add1.city = "Jakarta Barat";
    add1.city_id = "151";
    add1.postal = "11220";
    add1.receiver = "azure";
    add1.phone = "08229989189231";
    add1.user_id = user.id;
    await add1.save();

    const add2 = new Address();
    add2.title = "kantor";
    add2.address = "jl kantor bla bla";
    add2.province = "DKI Jakarta";
    add2.province_id = "6";
    add2.city = "Jakarta Pusat";
    add2.city_id = "152";
    add2.postal = "10540";
    add2.receiver = "fadli aja";
    add2.phone = "08229989189232";
    add2.user_id = user.id;
    await add2.save();
  }
}

module.exports = DummySeeder;
