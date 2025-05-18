import express from 'express';
import bodyParser from 'body-parser';
// import * as querystring from 'querystring';
// import * as http from 'http';
// import * as fs from 'fs';
import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';

export const app = express();

///////////////////////////////////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//
// Setup CORS
//
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS, PUT'
    );
    next();
});

const rolesList = [ 'user', 'admin', 'owner' ]

function getRandomRoles() {
    const roles = [ 'user' ];

    const random = Math.ceil(Math.random() * 10);

    if (random % 2 === 0)
    {
        roles.push(rolesList[1]);
    }

    if (random % 3 === 0)
    {
        roles.push(rolesList[2]);
    }

    return roles;
}

function createRandomUser() {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        displayName: faker.internet.displayName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
        roles: getRandomRoles(),
    };
}

const users = faker.helpers.multiple(createRandomUser, {
    count: 100,
})

users.push({
    userId: faker.string.uuid(),
    username: 'agramov',
    displayName: 'Alexander Gramov',
    email: 'me@agramov.com',
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    roles: [ 'admin', 'owner', 'user']
});

users.sort((a,b) =>
{
    if(a.displayName === b.displayName)
    {
        return 0;
    }
    else if(a.displayName > b.displayName)
    {
        return 1;
    }

    return -1;
});

app.post('/users', async (req, res, next) =>
{
    const requestedPage = req.body.page || 1;
    const pageSize = req.body.pageSize || 10;
    const filters = req.body.filters || {};
    const search = req.body.search || '';

    let filteredList = users;

    const roleFilters = filters.roles || [];

    filteredList = users.filter(user =>
    {
        return (user.displayName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())) &&
            roleFilters.every(requiredRole =>
        {
            return user.roles.includes(requiredRole);

        });
    })

    const filteredListLength = filteredList.length;

    const totalPages = filteredListLength / pageSize;

    let startIndex = 0;
    let endIndex = 0;

    let page = 1;

    if (requestedPage <= totalPages)
    {
        page = requestedPage;
    }
    else
    {
        page = Math.ceil(totalPages);
    }

    startIndex = (page - 1) * pageSize;
    endIndex = startIndex + pageSize;

    setTimeout(() => {

        res.status(200).json({
            results: filteredList.slice(startIndex, endIndex),
            total: filteredListLength,
            page,
            pageSize,
        });
    } , 1000)
});


app.get('/user', async (req, res, next) =>
{
    res.status(200).json(users.find(user => user.username === 'agramov'));
});


app.put('/user', async (req, res, next) =>
{
    const user = users.find(user => user.username === 'agramov');
    user.displayName += req.body.displayName;

    res.status(200).json(user);
});
