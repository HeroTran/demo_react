var express = require('express');
var db = require('./db.js');
var bodyParser = require('body-parser')
var sites = require('../sites.json')
var issuesApi = require('./issuesApi');
var path = require('path');

module.exports = function(app){


    app.use(bodyParser.json());

    app.post('/sites/:siteId/issues/:issueId',function(req,res){
        issuesApi.add(req.params.siteId, req.params.issueId).then(function(data){
            res.json(data);
        })
    });

    app.delete('/sites/:siteId/issues/:issueId',function(req,res){
        issuesApi.remove(req.params.siteId, req.params.issueId);
        res.json({[req.params.issueId]:'deleted'});
        
    });

    app.get('/sites/:siteId/issues',function(req,res){
        issuesApi.query(req.params.siteId).then(function(data){
            res.json(data);
        })
    });

    app.get('/sites',function(req,res){
        res.json(sites);
    });

    Object.keys(sites).map((site)=>{
        app.use('/designs/'+sites[site].designPack,express.static(path.join(__dirname,'../../designs',sites[site].designPack)))
    })

    var downloadedIssues = db.getJson(path.join(__dirname,'issues.json'));
 
    Object.keys(downloadedIssues).map((site)=>{
        console.log(site)
       Object.keys(downloadedIssues[site]).map((issue)=>{
               console.log(issue)
            app.use(`/${issue}`, express.static(path.join(__dirname,`../../publications/${site}/${issue}`)))
        })
    })

    app.use('/reader2',express.static(path.join(__dirname,'../../reader2')))

    // http://localhost:3000/reader2/index.html#issueID=527&tocID=894&storyID=7bc1397ba5a0e6ed9afe96f7bf309280&orientation=portrait&mode=0&fontSize=0&navigate=11&width=580&height=800&platform=tablet
    // http://localhost:3000/reader2/index.html#issueID=527&tocID=894&storyID=7bc1397ba5a0e6ed9afe96f7bf309280&orientation=portrait&mode=0&fontSize=0&navigate=11&width=580&height=800&platform=tablet&layout=default_layout_portrait.twig
}