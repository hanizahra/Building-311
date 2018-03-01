
module.exports = {

  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },

  // getBuildings(req, res) {
  //   res.render('/', {
  //     message: "ok lets get a new building"
  //   })
  // },

  showBuildings(req, res) {
    console.log('showBuildings in view controller running')
    res.render('buildings/building-info.ejs', {
      message: "Below are all the buildings",
      data: res.locals.buildings
    }); 
  },
  // showOne(req, res) {
  //   res.render('buildings/single-building', {
  //     data: res.locals.json,
  //   });
  // },

};