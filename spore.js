

function load_file(name) {
    return fetch('load-file.php?filename=' + name).then(res => res.text());
}


function save_file(name,data){
    fetch('save-file.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        body: 'data=' + data + '&filename=' + name
    });
}

function delete_file(name){
    fetch('delete-file.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        body: 'filename=' + name
    });    
}


function delete_branch(name){
    fetch('delete-branch.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        body: 'branch=' + name
    });
}

function list_files(fork) {
    var query = fork ? '?directory=' + encodeURIComponent(fork) : '';
    return fetch('list-files.php' + query)
        .then(res => res.json())
        .then(files => {
            return files; 
        });
}

function list_branches(){
    return fetch('list-branches.php')
    .then(res => res.json())
    .then(branches => {
        return branches; 
    });
}

function set_instrument_state(name,state){
    
}

function get_instrument_state(name){
    
}

function get_instrument_plot(name){
    
}

function save_instrument_trace(name){
    //vna
    //spa
    //sdr
}

