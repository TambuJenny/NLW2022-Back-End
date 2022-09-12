import express from "express";

const app = express();


app.get('/ads', function (request,response)
{
   return response.json([
    {id:'1',name:'Flame'},
    {id:'2',name:'Tambu'},
    {id:'3',name:'Jenny'},
    {id:'4',name:'Zoombii'}
   ])
})

app.listen(3333);