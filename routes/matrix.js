module.exports = {
  getMatrixPage: (req, res) => {
    let query = "SELECT * FROM `GradeMatrix`";

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return res.redirect('/matrix');
      }

      res.render('../views/matrix/matrix-page.ejs', {
        title: "Welcome to Skill grade matrix",
        message: '',
        nav: 'matrix',
        matrix: result,
      });
    });

  },
  addMatrixPage: (req, res) => {
    res.render('../views/matrix/add-matrix.ejs', {
      title: "Welcome to Skill grade matrix",
      message: '',
      nav: 'matrix',
      matrix: ['Andrei', 'Katiya',],
    });
  },
  addMatrix: (req, res) => {
    const position = req.body.position;
    const ood = req.body.ood;
    const documentation = req.body.documentation;

    let query = "INSERT INTO `GradeMatrix` (`position`, `OOD`, `Documentation`) VALUES('" +
      position + "', '" + ood + "', '" + documentation + "');";

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
        console.log('error');
      }
      res.redirect('/');
    });

    console.log('body', req.body);
  },
};