# Purrfect Match
A "dating" app that matches shelter animals up with prospective owners

![Home Page Example](public/homepage_example.png)

## Background

This is our capstone project for Oregon State University's Computer Science program. We used React and Bootstrap in the frontend and created a RESTful API using Node/Express in the backend. The database uses MySQL. This project helped solidify our skills in the creation of web applications, allowed us to gain experience using industry techniques and technologies, and gave us a good addition to our portfolios.

## Team Members
- [Eriko Dott](https://github.com/dotte-osu)
- [Esther Lin](https://github.com/asching7108)
- [Xander Houdek](https://github.com/xHoudek)

## API Installation Instructions

### Get Files

- Pull remote into a local directory (or download .zip file and extract)
- In the root folder (the one with `package.json`), run `npm install`

### Configure Database

- Set up a local MySQL connection
  - Install MySQL Community
  - Create a new localhost connection
  - Create a schema
- From the root folder, navigate to `database/`
  - First, run `dataDefinitionQueries.sql` in MySQL Workbench
  - Then, run `sampleDataQueries.sql`
  - Finally, run the following command to allow database access from the backend

```
ALTER USER 'yourUserName'@'yourhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
FLUSH PRIVILEGES;

-- example
ALTER USER 'eriko'@'%' IDENTIFIED WITH mysql_native_password BY 'password911';
FLUSH PRIVILEGES;
```

- From the root folder, navigate to `config/db.config.js`
  - Change `HOST`, `PORT`, `USER`, `PASSWORD`, and `DB` values to match the ones from the localhost connection you created

### Configure Server

- From the root folder, navigate to `utils/config.js`
  - Change `SECRET` value to something better
  - Change other values to your preferences

### Configure Frontend

Our API was designed to be RESTful and independent of the frontend. Therefore, interaction with the frontend is optional (but recommended)

- Follow all installation instructions for [the frontend](https://github.com/asching7108/purrfect-match)
  - Note: frontend should be installed in a different directory

### Run

- From the root folder, run `npm start`
  - If you want to use a specific port, run `PORT=[myPort] npm start`, or change `PORT` value in `utils/config.js`
