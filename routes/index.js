module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM `Developers` ORDER BY id ASC";

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }
      res.render('index.ejs', {
        title: "Welcome to PPR | View Developers",
        developers: result,
        nav: 'dev',
      });
    });
  },
};