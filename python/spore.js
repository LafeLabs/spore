

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

function list_files(fork) {
    var query = fork ? '?directory=' + encodeURIComponent(fork) : '';
    return fetch('list-files.php' + query)
        .then(res => res.json())
        .then(files => {
            return files; 
        });
}

