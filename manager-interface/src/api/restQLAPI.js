// This makes requests to restQL manager API
const request = require('superagent');


// Processing URL Query Params (Browser) for dev
function getRuntimeTarget() {
    var url = require('url');
    var url_parts = url.parse(window.location.href, true);
    var url_query = url_parts.query;

    if(url_query.targetRuntime) {
        const targetRuntime = (
            url_query.targetRuntime.indexOf('http://') === -1 ?
            'http://' + url_query.targetRuntime :
            url_query.targetRuntime
        );

        return targetRuntime;
    }

    return '';
}


// Processing request
export function processResult(response) {
    if(response.error !== null) {
        return { error: response.error.message };
    }
    else if(response.body.statusCode >= 200 && response.body.statusCode < 300) {
        try {
            return JSON.parse(response.body.text);
        }
        catch(e) {
            return { error: 'Invalid JSON Response' };
        }
    }
    else {
        return { error: 'Something got really wrong!'};
    }
}


// Running Queries
export function runQuery(queryString, queryParams='', callback) {
    const runQueryUrl = getRuntimeTarget() + '/run-query?' + queryParams;

    request
        .post(runQueryUrl)
        .set('Content-Type', 'text/plain')
        .set('Accept', 'application/json')
        .send(queryString)
        .end((err, body) => {
            return callback({
                error: err,
                body: body
            });
        });
}

// Saving a query
export function saveQuery(namespace, queryName, queryString, callback) {
    const saveQueryUrl = getRuntimeTarget() + '/ns/' + namespace + '/query/' + queryName;
    
    request
        .post(saveQueryUrl)
        .set('Content-Type', 'text/plain')
        .set('Accept', 'application/json')
        .send(queryString)
        .end((err, body) => {
            return callback({
                error: err,
                body: body
            });
        });
}

// Loading namespaces
export function loadNamespaces(callback) {
    const loadNamespacesUrl = getRuntimeTarget() + '/namespaces';
    
    request
        .get(loadNamespacesUrl)
        .set('Content-Type', 'text/plain')
        .set('Accept', 'application/json')
        .send()
        .end((err, body) => {
            return callback({
                error: err,
                body: body
            });
        });
}


// Loading Queries
export function loadQueries(namespace, callback) {
    const loadQueriesUrl = getRuntimeTarget() + '/ns/' + namespace;
    
    request
        .get(loadQueriesUrl)
        .set('Content-Type', 'text/plain')
        .set('Accept', 'application/json')
        .send()
        .end((err, body) => {
            return callback({
                error: err,
                body: body
            });
        });
}

// Loading all query revisions
export function loadRevisions(namespace, query, callback) {
    
    const revisionsUrl = getRuntimeTarget() + '/ns/' + namespace + '/query/' + query;

    request
        .get(revisionsUrl)
        .set('Content-Type', 'text/plain')
        .set('Accept', 'application/json')
        .send()
        .end((err, body) => {
            return callback({
                error: err,
                body: body
            });
        });
}


// Loading a query revision
export function loadRevisionByUrl(revisionUrl, callback) {
    
    request
        .get(getRuntimeTarget()+revisionUrl)
        .set('Content-Type', 'text/plain')
        .set('Accept', 'application/json')
        .send()
        .end((err, body) => {
            return callback({
                error: err,
                body: body
            });
        });
}

// Loading a query revision
export function loadRevision(namespace, queryName, revision, callback) {
    
    const revisionUrl = getRuntimeTarget()
                        + '/ns/' + namespace
                        + '/query/' + queryName
                        + '/revision/' + revision;

    request
        .get(revisionUrl)
        .set('Content-Type', 'text/plain')
        .set('Accept', 'application/json')
        .send()
        .end((err, body) => {
            return callback({
                error: err,
                body: body
            });
        });
}