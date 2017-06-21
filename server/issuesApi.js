var fetch = require('isomorphic-fetch');
var db = require('./db.js');
var path = require('path');
var fs = require('fs-extra');
var sites = require('../sites.json');
var publicationsPath = path.join(__dirname,'../../','publications');
var issuesPath = path.join(__dirname,'issues.json');
function getHeader(){
    var btoa = require('btoa');
    var auth = btoa('admin@audiencemedia.com:devteam')
    var header = new Headers();
    header.append('Authorization', 'Basic '+auth);
    return header;
}

function query(siteId){
    var site = sites[siteId];
    return fetch(site.url,
        {headers:getHeader()})
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        var downloadedIssue = db.getJson(issuesPath);
        var issues = res.issues.map((item)=>{
            if(downloadedIssue[siteId] && downloadedIssue[siteId][item.id]){
                item.downloaded = true;
            }else{
                item.downloaded = false;
            }
            return item;
        })
        return Promise.resolve(issues);
    })
    .catch((err)=>{
        console.log(err)
    });    
}

function remove(siteId, issueId){
    var downloadedIssue = db.getJson(issuesPath);
    console.log(siteId)
    if(downloadedIssue[siteId] && downloadedIssue[siteId][issueId]){
          console.log(siteId+'deleted')
        downloadedIssue[siteId][issueId] = false;
        fs.removeSync(path.join(publicationsPath,siteId, issueId));
    }
    db.saveJson(issuesPath,downloadedIssue);
}

function add(siteId, issueId){
    var site = sites[siteId];
    return fetch(`${site.url}/${issueId}`, {headers:getHeader()})
    .then((res)=>{
        return res.json()
    }).then((res)=>{
        saveSections(siteId, res);
        saveProperties(siteId, res, site.designPack);
        var downloadedIssue = db.getJson(issuesPath);
        if(!downloadedIssue[siteId]){
            downloadedIssue[siteId] = {};
        }
        downloadedIssue[siteId][issueId] = true;
        db.saveJson(issuesPath,downloadedIssue);
        return Promise.resolve(res);
    })
    .catch((err)=>{
        console.log(err)
    });
}

function saveProperties(siteId, data, localDesignPack){
    var designPack = data.issue.design_packs ? 
        data.issue.design_packs[0] : 
        data.issue.designs[0];
    var prop = {
        title:data.issue.issue_name,
        layout: {
            "name": localDesignPack,
            "version": 2,
            "org": path.basename(designPack.url).split('.')[0]
        }
    };
    return db.saveJson(`${publicationsPath}/${siteId}/${data.issue.id}/properties.js`,prop);
}

function saveSections(siteId, data){
    data.issue.sections.map((section)=>{
        db.saveJson(`${publicationsPath}/${siteId}/${data.issue.id}/${section.id}.js`,{section:section});
        saveStories(siteId,data.issue.id, section);
    })
}

function saveStories(siteId, issueId, section){
    section.stories.map((story)=>{
        db.saveFile(`${publicationsPath}/${siteId}/${issueId}/${story.id}/story.html`, story.body);
        story.image.map((image)=>{
            db.downloadAndSaveFile(`${publicationsPath}/${siteId}/${issueId}/${story.id}/${path.basename(image.image_url)}`, 
                image.image_url);
        })
        if(story.related_objects && story.related_objects.image){
            story.related_objects.image.map((image)=>{
                db.downloadAndSaveFile(`${publicationsPath}/${siteId}/${issueId}/${story.id}/${path.basename(image.image_url)}`, 
                    image.image_url);
            })
        }
    })
}

module.exports = {
    add:add,
    remove: remove,
    query: query,
}