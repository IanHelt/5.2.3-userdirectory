const express = require('express');
const app = express();
const exphbs = require('express-handlebars');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static', express.static('public'));

const data = require('./userData.js');

const userArray = data.users;

console.log(userArray[3].name);

app.get("/", (req, res) =>{
  res.render('index', {item: userArray});
});

app.get("/profile/:id", (req, res) => {
  let itemId = req.params.id;
  let targetItem;

  userArray.forEach((item) => {
    if (item.id == itemId){
      targetItem = item;
    }
  });
  if (targetItem === undefined){
    res.render('indexUndefined', {item: userArray});
  } else {
res.render('profile', {item: targetItem});
}
});

app.listen(3000, function () {
  console.log('Successfully started express application!')
});
