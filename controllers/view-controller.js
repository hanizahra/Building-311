
module.exports = {

  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },
  showBuildings(req, res) {
    console.log('can you see me')
    res.render('buildings/building-info.ejs', {
      message: "ok, this might work",
      data: res.locals.buildings
    }); 
  },
  // showOne(req, res) {
  //   res.render('buildings/single-building', {
  //     data: res.locals.json,
  //   });
  // },

};