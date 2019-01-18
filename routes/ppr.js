module.exports = {
  getPprPage: (req, res) => {
    const query = "SELECT `PPR`.`id`, `Reviewer`.`name` AS `rew_name`, `Reviewer`.`surname` AS `rew_surname`, `Developers`.`name` AS `dev_name`, `Developers`.`surname` AS `dev_surname`, `GradeMatrix`.`Position` FROM `PPR` INNER JOIN `Reviewer` ON `PPR`.`reviewer_id` = `Reviewer`.`id` INNER JOIN `Developers` ON `PPR`.`developer_id` = `Developers`.`id` INNER JOIN `GradeMatrix` ON `PPR`.`grade_matrix_id` = `GradeMatrix`.`id`";

    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return res.redirect('/ppr');
      }
      console.log('result', result);
      res.render('../views/ppr/ppr-page.ejs', {
        title: "Welcome to PPR",
        message: '',
        nav: 'ppr',
        pprs: result,
      });
    });
  },
  addPprPage: (req, res) => {
    let developersQuery = "SELECT `id`, `name`, `surname`, `position` FROM `Developers` ORDER BY id ASC";
    let reviewersQuery = "SELECT `id`, `name`, `surname`, `position` FROM `Reviewer` ORDER BY id ASC";
    let reviewers = [];
    let matrixQuery = "SELECT * FROM `GradeMatrix`";
    let matrix = [];

    db.query(reviewersQuery, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return res.redirect('/');
      }
      reviewers = result;
    });

    db.query(matrixQuery, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return res.redirect('/');
      }
      matrix = result;
    });

    // execute query
    db.query(developersQuery, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return res.redirect('/');
      }

      res.render('../views/ppr/add-ppr.ejs', {
        title: "Welcome to PPR",
        message: '',
        nav: 'ppr',
        pprs: ['Andrei', 'Katiya',],
        developers: result,
        reviewers,
        matrix,
      });
    });
  },
  addPpr: (req, res) => {
    const developerId = req.body.developer_id;
    const reviewerId = req.body.reviewer_id;
    const matrix_id = req.body.matrix_id;
    let query = "INSERT INTO `PPR` (`reviewer_id`, `developer_id`, `grade_matrix_id`) VALUES('" +
      reviewerId + "', '" + developerId + "', '" + matrix_id + "');";

    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return res.redirect('/');
      }
      res.redirect('/ppr');
    });
    console.log('req.body', req.body)
  },
};