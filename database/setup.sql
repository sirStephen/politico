CREATE TABLE party(
  id SERIAL primary key,
  partyname character varying(250) not null,
  hqAddress text,
  logoUrl text,
  createat timestamp
);

CREATE TABLE users(
  id SERIAL primary key,
  firstname character varying(250),
  lastname character varying(250),
  othername character varying(250),
  email text,
  phonenumber bigserial,
  password text,
  passportUrl text,
  role character varying(50)
);

CREATE TABLE office(
  id SERIAL primary key,
  officename character varying(250),
  type character varying(250),
  createat timestamp
);

CREATE TABLE candidates(
  id SERIAL,
  officeid INTEGER REFERENCES office(id) ON DELETE CASCADE,
  partyid INTEGER REFERENCES party(id) ON DELETE CASCADE,
  userid INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY(userid, officeid)
);

CREATE TABLE votes(
  id SERIAL,
  officeid INTEGER REFERENCES office(id) ON DELETE CASCADE,
  voterid INTEGER REFERENCES users(id) ON DELETE CASCADE,
  candidateid INTEGER not null,
  PRIMARY KEY(voterid, officeid)
);

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('pdp', '3, Wegbo Street, Off-Iwaya, Lagos', 'assets/img/picture.jpg', 'NOW()');

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('apc', '42, Montegomery Street, Yaba, Lagos', 'assets/img/picture.jpeg', 'NOW()');

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('apc', '42, Montegomery Street, Yaba, Lagos', 'assets/img/picture.jpeg', 'NOW()');

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('apc', '42, Montegomery Street, Yaba, Lagos', 'assets/img/picture.jpeg', 'NOW()');

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('apc', '42, Montegomery Street, Yaba, Lagos', 'assets/img/picture.jpeg', 'NOW()');

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('apc', '42, Montegomery Street, Yaba, Lagos', 'assets/img/picture.jpeg', 'NOW()');

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('apc', '42, Montegomery Street, Yaba, Lagos', 'assets/img/picture.jpeg', 'NOW()');

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('apc', '42, Montegomery Street, Yaba, Lagos', 'assets/img/picture.jpeg', 'NOW()');

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('apc', '42, Montegomery Street, Yaba, Lagos', 'assets/img/picture.jpeg', 'NOW()');

INSERT INTO office(officename, type, createat)
VALUES ('president', 'federal', 'NOW()');

INSERT INTO office(officename, type, createat)
VALUES ('vice-president', 'federal', 'NOW()');

INSERT INTO users(firstname, lastname, othername, email, phonenumber, password, passportUrl, role)
VALUES ('Gregory', 'Otiono', 'Tobechukwu', 'gregory@gmail.com', '2348134766076', '$2b$10$LG9F1SCaQO0NgCK1n8F7MO5fWdWZV.n34Vcc/oa4tvn6W6RymkHVS', 'assets/img/profile.png', 'admin');

INSERT INTO users(firstname, lastname, othername, email, phonenumber, password, passportUrl, role)
VALUES ('Damian', 'Okoye', 'Chukwudubem', 'damian@gmail.com', '08134766076', '$2b$10$bxxaL5jkyVoKObyg8LSvBuK6Pb4tP2IOrYs.jiDZDXI4bP3KBhSJy', 'assets/img/profile.png', 'user');

INSERT INTO candidates(officeid, partyid, userid)
VALUES('1', '2', '2');

INSERT INTO votes(officeid, candidateid, voterid)
VALUES('1', '2', '2');
