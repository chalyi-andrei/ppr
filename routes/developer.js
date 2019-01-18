
module.exports = {
  addDeveloperPage: (req, res) => {
    res.render('add-developer.ejs', {
      title: "Welcome to PPR | Add a new developer",
      message: '',
      nav: 'dev',
    });
  },
  addDeveloper: (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const position = req.body.position;
    let developerSurnameQuery = "SELECT * FROM `Developers` WHERE surname = '" + surname + "'";

    db.query(developerSurnameQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (result.length > 0) {
        message = 'This developer already exists';
        res.render('add-developer.ejs', {
          message,
          title: "Welcome to PPR | Add a new Developer"
        });
      } else {

        let query = "INSERT INTO `Developers` (`name`, `surname`, `position`) VALUES('" +
          name + "', '" + surname + "', '" + position + "');";

        // execute query
        db.query(query, (err, result) => {
          if (err) {
            res.redirect('/');
            console.log('error');
          }
          res.redirect('/');
        });

      }
    });
  },
  editDeveloperPage: (req, res) => {
    const developerID = req.params.id;
    const query = "SELECT * from `Developers` WHERE id = '" + developerID + "' ";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('edit-developer.ejs', {
        title: "Edit  Developer"
        , developer: result[0]
        , message: '',
        nav: 'dev',
      });
    });
  },
  editDeveloper: (req, res) => {
    const developerID = req.params.id;
    const name = req.body.name;
    const position = req.body.position;
    const query = "UPDATE `Developers` SET `name` = '" + name + "', `position` = '" + position + "' WHERE `Developers`.`id` = '" + developerID + "'";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });
  },
  deleteDeveloper: (req, res) => {
    let developerId = req.params.id;
    let deleteDeveloperQuery = 'DELETE FROM Developers WHERE id = "' + developerId + '"';


    db.query(deleteDeveloperQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });

  },
};