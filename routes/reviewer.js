module.exports = {
  getReviwerPage: (req, res) => {
    let reviewersQuery = "SELECT * FROM `Reviewer`";

    db.query(reviewersQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.render('../views/reviewer/reviewers-page.ejs', {
        title: "Welcome to Reviewer",
        message: '',
        nav: 'reviwers',
        reviewers: result,
      });
    });
  },
  addReviwerPage: (req, res) => {
    let query = "SELECT `id`, `name`, `surname`, `position` FROM `Developers` ORDER BY id ASC";

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return res.redirect('/');
      }

      res.render('../views/reviewer/add-reviewer.ejs', {
        title: "Welcome to Reviewer",
        message: '',
        nav: 'reviwers',
        developers: result,
      });
    });

  },
  addReviwer: (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const position = req.body.position;
    const developer_id = req.body.developer_id;

    let query = "INSERT INTO `Reviewer` (`name`, `surname`, `position`, `developer_id`) VALUES('" +
      name + "', '" + surname + "', '" + position + "', '" + developer_id + "');";

    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
        console.log('error');
      }
      res.redirect('/reviewers');
    });
  },
  editReviewerPage: (req, res) => {
    const reviewerID = req.params.id;
    const query = "SELECT * from `Reviewer` WHERE id = '" + reviewerID + "' ";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('../views/reviewer/edit-reviewer.ejs', {
        title: "Edit  Reviewer"
        , reviewer: result[0]
        , message: '',
        nav: 'reviwers',
      });
    });
  },
  deleteReviewer: (req, res) => {
    let reviewerId = req.params.id;
    let query = 'DELETE FROM Reviewer WHERE id = "' + reviewerId + '"';


    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    });

  },
};