
module.exports = {

  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },


  showBuildings(req, res) {
    console.log('showBuildings in view controller ran');
    res.render('buildings/building-queries.ejs', {
      message: "Below are all the buildings: ",
      data: res.locals.buildings
    }); 
  },

  showOne(req, res) {
    console.log('showOne in view controller ran');
    res.render('buildings/building-info.ejs', {
      message: "Search result: ",
      data: res.locals.building
    }); 
  },

  showComplaints(req, res) {
    console.log('showComplaints in view controller ran');
    res.render('buildings/building-complaints.ejs', {
      message: 'Here are the building complaints for ',
      data: res.locals.complaints
    });
    // console.log('this is res.locals.complaints ---> ', res.locals.complaints);
  },

  showViolations(req, res) {
    console.log('showViolations in view controller ran');
    res.render('buildings/building-violations.ejs', {
      message: "Here are the building violations for ",
      data: res.locals.violations
    });
    // console.log('this is res.locals.violation ---> ', res.locals.violations);
  },

  destroyQuery (req, res) {
    console.log('destroyQuery in view controller ran');
    res.redirect('buildings/queries');
  },

  updateUserComment (req, res) {
    console.log('updateUserComment in view controller ran');
    res.render('buildings/building-queries', {
      data: res.locals.updates
    });
    res.redirect('buildings/queries');
  }


};