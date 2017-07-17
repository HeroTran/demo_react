export function getSites(){
    return fetch('/sites').then((res)=>res.json())
    .then((sites)=>{
        console.log(sites);
        return Promise.resolve(sites);
    })
}


export function getIssues(siteId){
    return fetch('/sites/'+siteId+'/issues').then((res)=>res.json())
    .then((issues)=>{
        console.log(issues);
        return Promise.resolve(issues);
    })

}

export function getInfoIssues(siteId,issueId){
    return fetch('/sites/'+siteId+'/issues/'+issueId).then((res)=>res.json())
    .then((issues)=>{
        console.log(issues);
        return Promise.resolve(issues);
    })

}


export function downloadIssue(siteId, issueId){
    return fetch(`/sites/${siteId}/issues/${issueId}`,{method:'post'}).then((res)=>res.json())
    .then((issues)=>{
        console.log(issues);
        return Promise.resolve(issues);
    })
}



export function deleteIssue(siteId, issueId){
    return fetch(`/sites/${siteId}/issues/${issueId}`,{method:'delete'}).then((res)=>res.json())
    .then((issues)=>{
        console.log(issues);
        return Promise.resolve(issues);
    })
}


export function getInfoConfig(designPack){
    return fetch('/designs/'+designPack+'/config.xml')
    .then(res => res.text())
    .then((config)=>{
        return Promise.resolve(config);
    })

}

/**
 
 Example: 
- call downloadIssue(874,527)
- Restart server
- Open reader
 http://localhost:3000/reader2/index.html#issueID=527&tocID=894&storyID=7bc1397ba5a0e6ed9afe96f7bf309280&orientation=portrait&mode=0&fontSize=0&navigate=11&width=580&height=800&platform=tablet

 */
