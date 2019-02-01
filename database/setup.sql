CREATE TABLE party(
  id SERIAL,
  partyname character varying(250) not null,
  hqAddress text,
  logoUrl text,
  createat timestamp
);

CREATE TABLE users(
  id SERIAL,
  firstname character varying(250),
  lastname character varying(250),
  othername character varying(250),
  email text,
  phonenumber bigserial,
  password text,
  passportUrl text,
  isAdmin boolean
);

CREATE TABLE office(
  id SERIAL,
  officename character varying(250),
  type character varying(250),
  createat timestamp
);

-- CREATE TABLE candidates(
--   id SERIAL,
--   "firstName" character varying(250),
--   "lastName" character varying(250),
--   username text unique not null,
--   password text,
--   role character varying(50)
--   -- CONSTRAINT users_pkey PRIMARY KEY (id)
-- );

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('pdp', '3, Wegbo Street, Off-Iwaya, Lagos', 'assets/img/picture.jpg', 'NOW()');

INSERT INTO party(partyname, hqAddress, logoUrl, createat)
VALUES('apc', '42, Montegomery Street, Yaba, Lagos', 'assets/img/picture.jpeg', 'NOW()');

INSERT INTO office(officename, type, createat)
VALUES ('president', 'federal', 'NOW()');

INSERT INTO office(officename, type, createat)
VALUES ('vice-president', 'federal', 'NOW()');

INSERT INTO users(firstname, lastname, othername, email, phonenumber, password, passportUrl, isAdmin)
VALUES ('Gregory', 'Otiono', 'Tobechukwu', 'greg@gmail.com', '08134766076', '$2y$10$.IIhGHc6s/PRPqHjQtY7Turu8FppQ5rIUt12XGXZ5xVJc7ASGKIr6', 'assets/img/profile.png', 'true');

INSERT INTO users(firstname, lastname, othername, email, phonenumber, password, passportUrl, isAdmin)
VALUES ('Damian', 'Okoye', 'Chukwudubem', 'damian@gmail.com', '08134766076', '$2y$10$A4OXP2AT8sELLrkhBWBsmuoSDdgielF46CvM5uI.e7lUMdgMYsJvS', 'assets/img/profile.png', 'false');
