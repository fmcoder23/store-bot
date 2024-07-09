const {connect} = require("mongoose");
const Product = require("./product.model");
const config = require("../../config");

const insert = async () => {
  await connect(config.mongoUri);
  await Product.create({
    name: "Iphone 15 Pro",
    description: "Bu yerda Iphone haqida ma'lumot bor!",
    price: 1000,
    photo:
      "https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-15-pro-256gb-blue-titanium-mtqv3ll-a-a?wid=930&hei=930&fmt=webp",
    category: "Telefonlar",
  });
  await Product.create({
    name: "Samsung S22",
    description: "Bu yerda Samsung haqida ma'lumot bor!",
    price: 600,
    photo:
      "https://electronicsforce.com/cdn/shop/products/s22black_a004e425-898a-4429-af59-0566c39df696.jpg?v=1709624360&width=800",
    category: "Telefonlar",
  });
  await Product.create({
    name: "Xiamoi Redmi Note 13",
    description: "Bu yerda Xioami Redmi haqida ma'lumot bor!",
    price: 200,
    photo: "https://m.media-amazon.com/images/I/51fAmmSJcUL._AC_SX679_.jpg",
    category: "Telefonlar",
  });
  await Product.create({
    name: "Google Pixel 8 PRO",
    description: "Bu yerda Google Pixel haqida ma'lumot bor!",
    price: 900,
    photo:
      "https://t-mobile.scene7.com/is/image/Tmusprod/Google-Pixel-8-Pro-Obsidian-frontimage",
    category: "Telefonlar",
  });
  await Product.create({
    name: "Macbook Pro 2020",
    description: "Bu yerda Macbook Pro haqida ma'lumot bor!",
    price: 1500,
    photo:
      "https://www.freepik.com/free-photo/laptop-device-with-minimalist-monochrome-background_65358169.htm#fromView=search&page=1&position=3&uuid=370c04d9-a2b6-4a98-b1e6-542888abe8f4",
    category: "Kompyuterlar",
  });
  await Product.create({
    name: "HP Spectre 360",
    description: "Bu yerda HP Spectre haqida ma'lumot bor!",
    price: 2000,
    photo:
      "https://m.media-amazon.com/images/I/71PUZ9o9U6L.jpg",
    category: "Kompyuterlar",
  });
  await Product.create({
    name: "Dell XPS",
    description: "Bu yerda Dell XPS haqida ma'lumot bor!",
    price: 800,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiF1VM8ZcOlVQbPH8gZjol8W2NeBKhwoY6g&s",
    category: "Kompyuterlar",
  });
  await Product.create({
    name: "LG TV",
    description: "Bu yerda LG TV haqida ma'lumot bor!",
    price: 1100,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxNPwXcUZt_hXsaQzdGRwR6gUNK54LXTwnkw&s",
    category: "Maishiy Texnikalar",
  });
  await Product.create({
    name: "Samsung Kir Mashina",
    description: "Bu yerda Samsung Kir Mashina haqida ma'lumot bor!",
    price: 650,
    photo:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6470/6470426_sd.jpg",
    category: "Maishiy Texnikalar",
  });
  await Product.create({
    name: "Atomic Habits",
    description: "Bu yerda Atomic Habits haqida ma'lumot bor!",
    price: 15,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz5Ql49rUJbA_TGsbBWuif197x3ogOt22AgQ&s",
    category: "Kitoblar",
  });
  await Product.create({
    name: "1984",
    description: "Bu yerda 1984 haqida ma'lumot bor!",
    price: 8,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rZch41Oo1KD4od4hJuj7nhHfK7WGmtIKbA&s",
    category: "Kitoblar",
  });
  await Product.create({
    name: "The Psychology of Money",
    description: "Bu yerda The Psychology of Money haqida ma'lumot bor!",
    price: 10,
    photo:
      "https://m.media-amazon.com/images/I/71aG0m9XRcL._AC_UF1000,1000_QL80_.jpg",
    category: "Kitoblar",
  });
  await Product.create({
    name: "Rich Dad Poor Dad",
    description: "Bu yerda Rich Dad Poor Dad haqida ma'lumot bor!",
    price: 20,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOQjW-hdMO3Q1Alhc14xnfZsRGarM3ID_glw&s",
    category: "Kitoblar",
  });
  await Product.create({
    name: "Men",
    description: "Bu yerda Men haqida ma'lumot bor!",
    price: 5,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg67umy5SH8wBVFBHA7wXTyteDIVl1Hg1Y1Q&s",
    category: "Kitoblar",
  });


  console.log("Products created");
};

insert();

