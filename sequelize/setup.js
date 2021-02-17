const sequelize = require('../sequelize');

async function reset() {
  console.log('Will rewrite the database, adding some dummy data.');

  await sequelize.sync({ force: true });

  await sequelize.models.Author.bulkCreate([
    { name: 'Donald Knuth', bio: "The OG programmer." }
  ]);
  
  for (const author of await sequelize.models.Author.findAll()) {
    await sequelize.models.Book.create({
      title: 'The Art of Computer Programming, Vol 1',
      AuthorId: author.id,
      genre: 'Programming',
      releaseDate: new Date('August 19, 1968 23:15:30').getDate(),
      priceCents: 3000,
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41eCbcQARTL._SX342_BO1,204,203,200_.jpg',
      publisher: 'Addison-Wesley'
    });
    await sequelize.models.Book.create({
      title: 'The Art of Computer Programming, Vol 2',
      AuthorId: author.id,
      genre: 'Programming',
      releaseDate: new Date('August 11, 1969 20:05:00').getDate(),
      priceCents: 3000,
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51LhI5wlKPL._SX341_BO1,204,203,200_.jpg',
      publisher: 'Addison-Wesley'
    });
  }

  await sequelize.models.User.bulkCreate([
    {
      firstName: 'Orlando',
      lastName: "de Frias",
      username: "odefrias",
      password: "password",
      email: "odefr001@fiu.edu",
      address: "123 Main Street"
    }
  ]);

  await sequelize.models.WishList.bulkCreate([
    { name: 'My First List', UserId: 1 },
    { name: 'My Second List', UserId: 1 }
  ]);

  await sequelize.models.WishListItem.bulkCreate([
    { WishListId: 1, BookId: 1, UserId: 1 },
    { WishListId: 2, BookId: 2, UserId: 1 },
  ]);

  console.log('Done!');
}

reset();