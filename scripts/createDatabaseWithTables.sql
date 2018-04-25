-- permissions? logged in as superuser
CREATE DATABASE jobnotes;

USE jobnotes;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(50),
  password VARCHAR(120),
  last_login DATE,
  createdAt DATE,
  updatedAt DATE,
  status VARCHAR(50),
  confirmation_code VARCHAR(20),
  role VARCHAR(20)
);

CREATE TABLE recruiters(
  recruiter_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  telephone VARCHAR(15)
);

CREATE TABLE notes(
  note_id SERIAL PRIMARY KEY,
  comments VARCHAR(500)
);

CREATE TABLE opportunities(
  opportunity_id SERIAL PRIMARY KEY,
  company VARCHAR(80),
  address VARCHAR(150),
  money INT,
  recruiter_id INT references recruiters(recruiter_id),
  user_id INT references users(user_id),
  note_id INT references notes(note_id)
);
