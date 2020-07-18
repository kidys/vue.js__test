const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/api/cities', jsonParser, function (request, response) {     
    response.json({
        status: 200,
        cities: [
            { id: 1, name: 'Москва' },
            { id: 2, name: 'Казань' },
            { id: 3, name: 'Петропавловск-Камчатский' },
            { id: 4, name: 'Йошкар-Ола' },
            { id: 5, name: 'Санкт-Петербург' },
            { id: 6, name: 'Нижний Новгород' },            
        ]
    });
});

module.exports = app;
