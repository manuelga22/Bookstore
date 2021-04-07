const sequelize = require('../sequelize');

async function reset() {
  console.log('Will rewrite the database, adding some dummy data.');

  await sequelize.sync({ force: true });

  await sequelize.models.Author.bulkCreate([
    { name: 'Donald Knuth', bio: "The OG programmer." },
    { name: 'Erin French', bio: "Erin French is the owner and chef of The Lost Kitchen, a 40-seat restaurant in Freedom, Maine, that was recently named one TIME Magazine's World's Greatest Places and one of '12 Restaurants Worth Traveling Across the World to Experience' by Bloomberg." },
    { name: 'Dav Pilkey', bio: "Considered one of the most popular contemporary authors for readers in elementary school, (Dav Pilkey) is also regarded as a talented artist and inventive humorist as well as a subtle moralist." },
    { name: 'Robert Greene', bio: "Robert Greene is the author of the New York Times bestsellers The 48 Laws of Power, The Art of Seduction, The 33 Strategies of War, and The 50th Law." },
    { name: 'Shannon Bream', bio: "A Florida native, she's drawn to the sun and the beach where she grew up with parents who convinced her anything was possible. Their lives were modest, but they believed in the power of: education, hard work and faith." },
    { name: 'Flynn Berry', bio: "Flynn Berry is the author of Under the Harrow, which won the Edgar Award for best first novel, and A Double Life, which will be published in July 2018. Under the Harrow has been translated into sixteen languages and was optioned for television by Paramount. Flynn is a graduate of Brown University and the Michener Center, and was a Yaddo fellow." },
    { name: 'James Clear', bio: "ames Clear's work has appeared in the New York Times, Time, and Entrepreneur, and on CBS This Morning, and is taught in colleges around the world. His website, jamesclear.com, receives millions of visitors each month, and hundreds of thousands subscribe to his email newsletter. He is the creator of The Habits Academy, the premier training platform for organizations and individuals that are interested in building better habits in life and work." },
    { name: 'Amelia Hepworth', bio: "Amelia Hepworth lives in London with her family and two elderly sausage dogs. When she is not writing stories, she enjoys spending time with her little boy and daydreaming in the garden. Usually not at the same time." },
    { name: 'Amanda Gorman', bio: "Amanda Gorman is the youngest presidential inaugural poet in US history. She is a committed advocate for the environment, racial equality, and gender justice." },
    { name: 'Don Miguel Ruiz', bio: 'Don Miguel Ruiz is a renowned spiritual teacher and internationally bestselling author of the "Toltec Wisdom Series," including "The Four Agreements," "The Mastery of Love," "The Voice of Knowledge," "The Four Agreements Companion Book," "The Circle of Fire," and "The Fifth Agreement."' },
  ]);
  
  // Books
  await sequelize.models.Book.create({
    title: 'The Art of Computer Programming, Vol 1',
    AuthorId: 1,
    genre: 'Programming',
    releaseDate: new Date('August 19, 1968 23:15:30').getDate(),
    priceCents: 3000,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41eCbcQARTL._SX342_BO1,204,203,200_.jpg',
    publisher: 'Addison-Wesley'
  });
  await sequelize.models.Book.create({
    title: 'The Art of Computer Programming, Vol 2',
    AuthorId: 1,
    genre: 'Programming',
    releaseDate: new Date('August 11, 1969 20:05:00').getDate(),
    priceCents: 3000,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51LhI5wlKPL._SX341_BO1,204,203,200_.jpg',
    publisher: 'Addison-Wesley'
  });
  ////
  await sequelize.models.Book.create({
    title: "Finding Freedom: A Cook's Story; Remaking a Life from Scratch",
    AuthorId: 2,
    genre: 'Biography',
    releaseDate: new Date('April 6, 2021 20:05:00').getDate(),
    priceCents: 2249,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41FDfeWeYSL._SX327_BO1,204,203,200_.jpg',
    publisher: 'Caledon Books'
  });
  ////
  await sequelize.models.Book.create({
    title: "Dog Man: Mothering Heights: From the Creator of Captain Underpants (Dog Man #10)",
    AuthorId: 3,
    genre: 'Children',
    releaseDate: new Date('March 23, 2021 20:05:00').getDate(),
    priceCents: 838,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51wlUnNtsHL._SX336_BO1,204,203,200_.jpg',
    publisher: 'Graphix'
  });
  await sequelize.models.Book.create({
    title: "Cat Kid Comic Club: From the Creator of Dog Man",
    AuthorId: 3,
    genre: 'Children',
    releaseDate: new Date('December 1, 2020 20:05:00').getDate(),
    priceCents: 799,
    coverUrl: 'https://m.media-amazon.com/images/I/51mk6iyNicL.jpg',
    publisher: 'Graphix'
  });
  await sequelize.models.Book.create({
    title: "Dog Man: Grime and Punishment: From the Creator of Captain Underpants (Dog Man #9)",
    AuthorId: 3,
    genre: 'Children',
    releaseDate: new Date('September 1, 2020 20:05:00').getDate(),
    priceCents: 799,
    coverUrl: 'https://m.media-amazon.com/images/I/51xPp3IlGTL.jpg',
    publisher: 'Graphix'
  });
  ////
  await sequelize.models.Book.create({
    title: "The 48 Laws of Power",
    AuthorId: 4,
    genre: 'Philosophy',
    releaseDate: new Date('September 1, 2000 20:05:00').getDate(),
    priceCents: 1499,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41JIh4KMHRL._SX355_BO1,204,203,200_.jpg',
    publisher: 'Penguin Books'
  });
  await sequelize.models.Book.create({
    title: "The Art of Seduction",
    AuthorId: 4,
    genre: 'Psychology',
    releaseDate: new Date('October 7, 2003 20:05:00').getDate(),
    priceCents: 1799,
    coverUrl: 'https://m.media-amazon.com/images/I/31BmwPwfaSL._SY346_.jpg',
    publisher: 'Penguin Books'
  });
  await sequelize.models.Book.create({
    title: "The Laws of Human Nature",
    AuthorId: 4,
    genre: 'Psychology',
    releaseDate: new Date('September 1, 2000 20:05:00').getDate(),
    priceCents: 1499,
    coverUrl: 'https://m.media-amazon.com/images/I/41Xc+nZTKdL.jpg',
    publisher: 'Penguin Books'
  });
  await sequelize.models.Book.create({
    title: "Mastery",
    AuthorId: 4,
    genre: 'Philosophy',
    releaseDate: new Date('November 13, 2012 20:05:00').getDate(),
    priceCents: 1199,
    coverUrl: 'https://m.media-amazon.com/images/I/41EyFFU-aQL.jpg',
    publisher: 'Penguin Books'
  });
  await sequelize.models.Book.create({
    title: "The 50th Law",
    AuthorId: 4,
    genre: 'Biography',
    releaseDate: new Date('August 19, 2009 20:05:00').getDate(),
    priceCents: 899,
    coverUrl: 'https://m.media-amazon.com/images/I/41xvKxSY1sL.jpg',
    publisher: 'Penguin Books'
  });
  ////
  await sequelize.models.Book.create({
    title: "The Women of the Bible Speak: The Wisdom of 16 Women and Their Lessons for Today",
    AuthorId: 5,
    genre: 'Spirituality',
    releaseDate: new Date('March 20, 2021 20:05:00').getDate(),
    priceCents: 1594,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/516Yy6yh8XL._SX329_BO1,204,203,200_.jpg',
    publisher: 'Broadside Books'
  });
  await sequelize.models.Book.create({
    title: "Finding the Bright Side: The Art of Chasing What Matters",
    AuthorId: 5,
    genre: 'Self Help',
    releaseDate: new Date('March 20, 2021 20:05:00').getDate(),
    priceCents: 1399,
    coverUrl: 'https://m.media-amazon.com/images/I/41lEgd4xoaL.jpg',
    publisher: 'Broadside Books'
  });
  ////
  await sequelize.models.Book.create({
    title: "Northern Spy: A Novel",
    AuthorId: 6,
    genre: 'Thriller',
    releaseDate: new Date('April 6, 2021 20:05:00').getDate(),
    priceCents: 1828,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41mfzpVQiEL._SX329_BO1,204,203,200_.jpg',
    publisher: 'Viking'
  });
  await sequelize.models.Book.create({
    title: "Under the Harrow: A Novel",
    AuthorId: 6,
    genre: 'Thriller',
    releaseDate: new Date('June 14, 2016 20:05:00').getDate(),
    priceCents: 1199,
    coverUrl: 'https://m.media-amazon.com/images/I/51i+5O2nTdL._SY346_.jpg',
    publisher: 'Viking'
  });
  await sequelize.models.Book.create({
    title: "A Double Life: A Novel",
    AuthorId: 6,
    genre: 'Thriller',
    releaseDate: new Date('July 31, 2018 20:05:00').getDate(),
    priceCents: 1299,
    coverUrl: 'https://m.media-amazon.com/images/I/51w1+TdP6ML.jpg',
    publisher: 'Viking'
  });
  ////
  await sequelize.models.Book.create({
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    AuthorId: 7,
    genre: 'Business',
    releaseDate: new Date('October 16, 2018 20:05:00').getDate(),
    priceCents: 1198,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Tlm0GZTXL._SX329_BO1,204,203,200_.jpg',
    publisher: 'Avery'
  });
  ////
  await sequelize.models.Book.create({
    title: "I Love You to the Moon and Back",
    AuthorId: 8,
    genre: 'Children',
    releaseDate: new Date('March 3, 2015 20:05:00').getDate(),
    priceCents: 359,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/517h-u1AQlL._SX482_BO1,204,203,200_.jpg',
    publisher: 'Tiger Tails'
  });
  await sequelize.models.Book.create({
    title: "Puppy Dog, Puppy Dog, What Can You See?",
    AuthorId: 8,
    genre: 'Children',
    releaseDate: new Date('September 21, 2020 20:05:00').getDate(),
    priceCents: 899,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41LvH+d+vpL._SY498_BO1,204,203,200_.jpg',
    publisher: 'Tiger Tails'
  });
  ////
  await sequelize.models.Book.create({
    title: "The Hill We Climb: An Inaugural Poem for the Country",
    AuthorId: 9,
    genre: 'Poetry',
    releaseDate: new Date('March 20, 2021 20:05:00').getDate(),
    priceCents: 972,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41swQHt2NPL._SX360_BO1,204,203,200_.jpg',
    publisher: 'Viking'
  });
  ////
  await sequelize.models.Book.create({
    title: "The Four Agreements: A Practical Guide to Personal Freedom (A Toltec Wisdom Book)",
    AuthorId: 10,
    genre: 'Spirituality',
    releaseDate: new Date('July 18, 2018 20:05:00').getDate(),
    priceCents: 548,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51FcSSKpJBL._SX343_BO1,204,203,200_.jpg',
    publisher: 'Amber-Allen Publishing'
  });
  await sequelize.models.Book.create({
    title: "The Mastery of Love: A Practical Guide to the Art of Relationship (A Toltec Wisdom Book)",
    AuthorId: 10,
    genre: 'Self Help',
    releaseDate: new Date('July 7, 2011 20:05:00').getDate(),
    priceCents: 799,
    coverUrl: 'https://m.media-amazon.com/images/I/51ZtjhHqiIL.jpg',
    publisher: 'Amber-Allen Publishing'
  });
  await sequelize.models.Book.create({
    title: "The Voice of Knowledge: A Practical Guide to Inner Peace (A Toltec Wisdom Book)",
    AuthorId: 10,
    genre: 'Self Help',
    releaseDate: new Date('July 7, 2011 20:05:00').getDate(),
    priceCents: 799,
    coverUrl: 'https://m.media-amazon.com/images/I/51lvsFRYWpL.jpg',
    publisher: 'Amber-Allen Publishing'
  });

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
    { WishListId: 2, BookId: 8, UserId: 1 },
  ]);

  await sequelize.models.Rating.bulkCreate([
    { score: 1, comment: "Cool book", UserId: 1, BookId: 1, anonymous: false }
  ]);

  console.log('Done!');
}

reset();