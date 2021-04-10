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
    publisher: 'Addison-Wesley',
    description: 'The bible of all fundamental algorithms and the work that taught many of todays software developers most of what they know about computer programming.'
  });
  await sequelize.models.Book.create({
    title: 'The Art of Computer Programming, Vol 2',
    AuthorId: 1,
    genre: 'Programming',
    releaseDate: new Date('August 11, 1969 20:05:00').getDate(),
    priceCents: 3000,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51LhI5wlKPL._SX341_BO1,204,203,200_.jpg',
    publisher: 'Addison-Wesley',
    description: 'The continuation of the bible of all fundamental algorithms and the work that taught many of todays software developers most of what they know about computer programming.'
  });
  ////
  await sequelize.models.Book.create({
    title: "Finding Freedom: A Cook's Story; Remaking a Life from Scratch",
    AuthorId: 2,
    genre: 'Biography',
    releaseDate: new Date('April 6, 2021 20:05:00').getDate(),
    priceCents: 2249,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41FDfeWeYSL._SX327_BO1,204,203,200_.jpg',
    publisher: 'Caledon Books',
    description: 'Erin French was a girl roaming barefoot on a 25-acre farm, a teenager falling in love with food while working the line at her dad’s diner'
  });
  ////
  await sequelize.models.Book.create({
    title: "Dog Man: Mothering Heights: From the Creator of Captain Underpants (Dog Man #10)",
    AuthorId: 3,
    genre: 'Children',
    releaseDate: new Date('March 23, 2021 20:05:00').getDate(),
    priceCents: 838,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51wlUnNtsHL._SX336_BO1,204,203,200_.jpg',
    publisher: 'Graphix',
    description: 'Dog Man is down on his luck, Petey confronts his not so purr-fect past, and Grampa is up to no good. The world is spinning out of control as new villains spill into town'
  });
  await sequelize.models.Book.create({
    title: "Cat Kid Comic Club: From the Creator of Dog Man",
    AuthorId: 3,
    genre: 'Children',
    releaseDate: new Date('December 1, 2020 20:05:00').getDate(),
    priceCents: 799,
    coverUrl: 'https://m.media-amazon.com/images/I/51mk6iyNicL.jpg',
    publisher: 'Graphix',
    description: 'A pioneering new graphic novel series by Dav Pilkey, the author and illustrator of the internationally bestselling Dog Man and Captain Underpants series.'
  });
  await sequelize.models.Book.create({
    title: "Dog Man: Grime and Punishment: From the Creator of Captain Underpants (Dog Man #9)",
    AuthorId: 3,
    genre: 'Children',
    releaseDate: new Date('September 1, 2020 20:05:00').getDate(),
    priceCents: 799,
    coverUrl: 'https://m.media-amazon.com/images/I/51xPp3IlGTL.jpg',
    publisher: 'Graphix',
    description: 'Dog Mans really done it this time! He hands over his badge and clears out his desk, but while he may be out of a job, he is not yet out of hope.'
  });
  ////
  await sequelize.models.Book.create({
    title: "The 48 Laws of Power",
    AuthorId: 4,
    genre: 'Philosophy',
    releaseDate: new Date('September 1, 2000 20:05:00').getDate(),
    priceCents: 1499,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41JIh4KMHRL._SX355_BO1,204,203,200_.jpg',
    publisher: 'Penguin Books',
    description: 'Amoral, cunning, ruthless, and instructive, this piercing work distills 3,000 years of the history of power into 48 well-explicated laws'
  });
  await sequelize.models.Book.create({
    title: "The Art of Seduction",
    AuthorId: 4,
    genre: 'Psychology',
    releaseDate: new Date('October 7, 2003 20:05:00').getDate(),
    priceCents: 1799,
    coverUrl: 'https://m.media-amazon.com/images/I/31BmwPwfaSL._SY346_.jpg',
    publisher: 'Penguin Books',
    description: 'The guide to having great sex in the twenty-first century'
  });
  await sequelize.models.Book.create({
    title: "The Laws of Human Nature",
    AuthorId: 4,
    genre: 'Psychology',
    releaseDate: new Date('September 1, 2000 20:05:00').getDate(),
    priceCents: 1499,
    coverUrl: 'https://m.media-amazon.com/images/I/41Xc+nZTKdL.jpg',
    publisher: 'Penguin Books',
    description: 'We are social animals. Our very lives depend on our relationships with people. Knowing why people do what they do is the most important tool we can possess, without which our other talents can only take us so far.'
  });
  await sequelize.models.Book.create({
    title: "Mastery",
    AuthorId: 4,
    genre: 'Philosophy',
    releaseDate: new Date('November 13, 2012 20:05:00').getDate(),
    priceCents: 1199,
    coverUrl: 'https://m.media-amazon.com/images/I/41EyFFU-aQL.jpg',
    publisher: 'Penguin Books',
    description: 'Each one of us has within us the potential to be a Master. Learn the secrets of the field you have chosen, submit to a rigorous apprenticeship, absorb the hidden knowledge possessed.'
  });
  await sequelize.models.Book.create({
    title: "The 50th Law",
    AuthorId: 4,
    genre: 'Biography',
    releaseDate: new Date('August 19, 2009 20:05:00').getDate(),
    priceCents: 899,
    coverUrl: 'https://m.media-amazon.com/images/I/41xvKxSY1sL.jpg',
    publisher: 'Penguin Books',
    description: 'With stories from 50 Cents life on the streets and in the boardroom as he rose to fame after the release of his album Get Rich or Die Tryin.'
  });
  ////
  await sequelize.models.Book.create({
    title: "The Women of the Bible Speak: The Wisdom of 16 Women and Their Lessons for Today",
    AuthorId: 5,
    genre: 'Spirituality',
    releaseDate: new Date('March 20, 2021 20:05:00').getDate(),
    priceCents: 1594,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/516Yy6yh8XL._SX329_BO1,204,203,200_.jpg',
    publisher: 'Broadside Books',
    description: 'People unfamiliar with Scripture often assume that women play a small, secondary role in the Bible. But in fact, they were central figures in numerous Biblical tales.'
  });
  await sequelize.models.Book.create({
    title: "Finding the Bright Side: The Art of Chasing What Matters",
    AuthorId: 5,
    genre: 'Self Help',
    releaseDate: new Date('March 20, 2021 20:05:00').getDate(),
    priceCents: 1399,
    coverUrl: 'https://m.media-amazon.com/images/I/41lEgd4xoaL.jpg',
    publisher: 'Broadside Books',
    description: 'From the host of Fox News @ Night, a deeply personal book about finding purpose and growth amid lifes unpredictability'
  });
  ////
  await sequelize.models.Book.create({
    title: "Northern Spy: A Novel",
    AuthorId: 6,
    genre: 'Thriller',
    releaseDate: new Date('April 6, 2021 20:05:00').getDate(),
    priceCents: 1828,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41mfzpVQiEL._SX329_BO1,204,203,200_.jpg',
    publisher: 'Viking',
    description: 'A producer at the BBC and mother to a new baby, Tessa is at work in Belfast one day when the news of another raid comes on the air'
  });
  await sequelize.models.Book.create({
    title: "Under the Harrow: A Novel",
    AuthorId: 6,
    genre: 'Thriller',
    releaseDate: new Date('June 14, 2016 20:05:00').getDate(),
    priceCents: 1199,
    coverUrl: 'https://m.media-amazon.com/images/I/51i+5O2nTdL._SY346_.jpg',
    publisher: 'Viking',
    description: 'A debut psychological thriller about a young woman who finds her sister brutally murdered and the shocking incident in their past that may hold the key to finding the killer'
  });
  await sequelize.models.Book.create({
    title: "A Double Life: A Novel",
    AuthorId: 6,
    genre: 'Thriller',
    releaseDate: new Date('July 31, 2018 20:05:00').getDate(),
    priceCents: 1299,
    coverUrl: 'https://m.media-amazon.com/images/I/51w1+TdP6ML.jpg',
    publisher: 'Viking',
    description: 'Claire is a hardworking doctor leading a simple, quiet life in London. She is also the daughter of the most notorious murder suspect in the country'
  });
  ////
  await sequelize.models.Book.create({
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    AuthorId: 7,
    genre: 'Business',
    releaseDate: new Date('October 16, 2018 20:05:00').getDate(),
    priceCents: 1198,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Tlm0GZTXL._SX329_BO1,204,203,200_.jpg',
    publisher: 'Avery',
    description: 'If you would like to build good habits, break bad ones, and create a better life for yourself, then you have definitely come to the right place'
  });
  ////
  await sequelize.models.Book.create({
    title: "I Love You to the Moon and Back",
    AuthorId: 8,
    genre: 'Children',
    releaseDate: new Date('March 3, 2015 20:05:00').getDate(),
    priceCents: 359,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/517h-u1AQlL._SX482_BO1,204,203,200_.jpg',
    publisher: 'Tiger Tails',
    description: 'he sun rises, and a bear and cub begin their day together. They splash in the water, climb mountains, watch the colorful lights in the shimmering sky, and play'
  });
  await sequelize.models.Book.create({
    title: "Puppy Dog, Puppy Dog, What Can You See?",
    AuthorId: 8,
    genre: 'Children',
    releaseDate: new Date('September 21, 2020 20:05:00').getDate(),
    priceCents: 899,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41LvH+d+vpL._SY498_BO1,204,203,200_.jpg',
    publisher: 'Tiger Tails',
    description: 'Dog aggression, fear, anxiety and behavioral issues are on the rise in todays world despite the mass influx of dog trainers and behaviorists - Why is that'
  });
  ////
  await sequelize.models.Book.create({
    title: "The Hill We Climb: An Inaugural Poem for the Country",
    AuthorId: 9,
    genre: 'Poetry',
    releaseDate: new Date('March 20, 2021 20:05:00').getDate(),
    priceCents: 972,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41swQHt2NPL._SX360_BO1,204,203,200_.jpg',
    publisher: 'Viking',
    description: 'Amanda Gorman became the sixth and youngest poet to deliver a poetry reading at a presidential inauguration.'
  });
  ////
  await sequelize.models.Book.create({
    title: "The Four Agreements: A Practical Guide to Personal Freedom (A Toltec Wisdom Book)",
    AuthorId: 10,
    genre: 'Spirituality',
    releaseDate: new Date('July 18, 2018 20:05:00').getDate(),
    priceCents: 548,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51FcSSKpJBL._SX343_BO1,204,203,200_.jpg',
    publisher: 'Amber-Allen Publishing',
    description: 'Based on ancient Toltec wisdom, The Four Agreements offer a powerful code of conduct that can rapidly transform our lives to a new experience of freedom, true happiness, and love'
  });
  await sequelize.models.Book.create({
    title: "The Mastery of Love: A Practical Guide to the Art of Relationship (A Toltec Wisdom Book)",
    AuthorId: 10,
    genre: 'Self Help',
    releaseDate: new Date('July 7, 2011 20:05:00').getDate(),
    priceCents: 799,
    coverUrl: 'https://m.media-amazon.com/images/I/51ZtjhHqiIL.jpg',
    publisher: 'Amber-Allen Publishing',
    description: 'The fear-based beliefs and assumptions that undermine love and lead to suffering and drama in our relationships.'
  });
  await sequelize.models.Book.create({
    title: "The Voice of Knowledge: A Practical Guide to Inner Peace (A Toltec Wisdom Book)",
    AuthorId: 10,
    genre: 'Self Help',
    releaseDate: new Date('July 7, 2011 20:05:00').getDate(),
    priceCents: 799,
    coverUrl: 'https://m.media-amazon.com/images/I/51lvsFRYWpL.jpg',
    publisher: 'Amber-Allen Publishing',
    description: 'A spiritual guide to overcoming negative emotions offers advice on saying what one means, refusing to speak against oneself, and ending self-deprecating thoughts and attitudes as part of realizing true knowledge and being true to oneself.'
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