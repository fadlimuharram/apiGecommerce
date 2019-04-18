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
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto delectus dignissimos rerum vitae, similique praesentium maxime vero non accusamus explicabo nesciunt blanditiis aperiam minus asperiores ipsa commodi ipsam! Corrupti, deserunt. Non inventore, vero minima vel unde quod corporis possimus iste sunt laborum assumenda voluptatum incidunt, voluptate eius perspiciatis nesciunt ex et suscipit impedit? Quo deleniti necessitatibus, dolore incidunt sapiente aperiam unde minima eligendi, non voluptatibus iusto quam? Commodi animi temporibus dolor cum impedit, itaque sapiente possimus ullam saepe omnis dolores deserunt aperiam vel facilis atque doloremque hic nisi sed excepturi perspiciatis eius eos. Nisi, aspernatur reiciendis perspiciatis eligendi facere natus?";
    pro1.category_id = 2;
    pro1.quantity = 10;
    pro1.weight = 1700;
    await pro1.save();

    const pro2 = new Product();
    pro2.name = "Kamboja Jepang Besar";
    pro2.price = 100000;
    pro2.description =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus quis natus voluptatem totam provident harum nobis culpa asperiores molestias quidem? Quisquam voluptatem ipsum odit delectus sapiente officia dolore quia provident cum, itaque vel libero porro rerum! Et, ullam reiciendis assumenda nemo eligendi vero, sed consectetur sapiente ut blanditiis distinctio, nesciunt vel hic quos? Id accusamus eius natus enim fugiat aut eligendi nulla doloribus fugit officiis! Quibusdam, inventore libero obcaecati cupiditate dolore quisquam iste quas quaerat vel dicta unde qui asperiores. Eveniet exercitationem eos officia quasi neque delectus recusandae quam! Inventore laudantium unde culpa facilis beatae aliquid harum doloribus nam corporis?";
    pro2.category_id = 2;
    pro2.quantity = 10;
    pro2.weight = 2000;
    await pro2.save();

    const pro3 = new Product();
    pro3.name = "Rumput Laut";
    pro3.price = 30000;
    pro3.description =
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero fugit voluptatem quibusdam iste obcaecati deleniti id, quas eveniet optio sapiente animi expedita praesentium voluptates laborum! Delectus quis repudiandae corporis fugiat quae incidunt adipisci? Quas, nostrum possimus aliquam ex alias non voluptatem, aperiam porro rerum illo quo ut at officia quibusdam labore eos dolorum voluptatibus sunt est voluptatum vel veniam! Quas nam porro veritatis tempora, molestiae in pariatur harum veniam accusamus vitae quisquam dolorum sequi magnam magni facilis officiis! Sunt eveniet accusantium atque praesentium necessitatibus quidem fugiat eaque incidunt. Laudantium fugit optio voluptatum sed deserunt minima assumenda sequi, ullam officia dolorum?";
    pro3.category_id = 1;
    pro3.quantity = 10;
    pro3.weight = 500;
    await pro3.save();

    const pro4 = new Product();
    pro4.name = "Pohon Jeruk Imlek";
    pro4.price = 50000;
    pro4.description =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quisquam veniam consequatur, asperiores possimus, voluptatum suscipit inventore fugiat odio corporis vitae, eveniet aut. Perferendis fuga commodi ullam veniam quidem quibusdam porro sit voluptatem, culpa magnam aliquid quisquam debitis minima aliquam adipisci beatae quos nesciunt natus labore, recusandae impedit est voluptatum molestias? Quo omnis nihil vitae facilis expedita, iure autem tempore aut neque perferendis dignissimos repudiandae blanditiis quas, architecto, atque nostrum asperiores aliquid. Accusantium officiis fuga, adipisci suscipit voluptate harum eligendi ducimus explicabo eius tempore commodi deleniti error fugiat necessitatibus corrupti ab reprehenderit atque possimus quis iste nemo sit est provident.";
    pro4.category_id = 4;
    pro4.quantity = 10;
    pro4.weight = 700;
    await pro4.save();

    const pro5 = new Product();
    pro5.name = "Dendrobium Kecil";
    pro5.price = 35000;
    pro5.description =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est sequi commodi vel assumenda sed fugiat similique repudiandae expedita voluptatem exercitationem incidunt vitae eius iure obcaecati, eos hic ullam illo possimus. Nesciunt eum nostrum cum, consectetur voluptatum minus! Ipsam necessitatibus, nulla aperiam cumque id, porro praesentium, placeat consequatur eum quam corrupti perferendis iure. Impedit, reiciendis natus numquam, omnis vero doloribus fugit sed beatae iure voluptates ea deleniti ipsam! Molestiae accusantium cupiditate harum aliquam quidem nam ea delectus aspernatur magni. Maiores molestias suscipit et dolorum provident sed itaque, maxime corporis doloremque facilis tempora ex amet similique excepturi officia tenetur, doloribus officiis vel?";
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
