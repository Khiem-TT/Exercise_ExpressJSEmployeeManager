const express = require('express');
const app = express();
const port = 8000;
const multer = require('multer');
const upload = multer();

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('create');
});

const arrayEmployee = [];
app.post('/view', upload.none(), (req, res) => {
    if (req.body.id && req.body.name && req.body.department) {
        const employee = {
            id: req.body.id,
            name: req.body.name,
            department: req.body.department
        }
        arrayEmployee.push(employee);
        res.render('view', {data: arrayEmployee});
    } else {
        console.log('error');
    }
});

app.post('/delete', (req, res) => {
    let id = req.query.id;
    if (id) {
        let index = arrayEmployee.findIndex(ele => ele.id === id);
        if (index !== -1) {
            arrayEmployee.splice(index, 1);
        }
    }
    res.render('view', {data: arrayEmployee});
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});