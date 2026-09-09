const ws = new WebSocket('ws://localhost:8086');
const pendingRequests = new Map();
const messageQueue = [];
let messageIdCounter = 0;

ws.onopen = () => {
    while (messageQueue.length > 0) {
        const sendFn = messageQueue.shift();
        sendFn();
    }
};

ws.onmessage = (event) => {
    try {
        const response = JSON.parse(event.data);
        const { id, success, data, error } = response;
        if (pendingRequests.has(id)) {
            const { resolve, reject } = pendingRequests.get(id);
            pendingRequests.delete(id);
            if (success) {
                resolve(data);
            } else {
                reject(new Error(error || 'WebSocket request failed'));
            }
        }
    } catch (e) {
        console.error(e);
    }
};

function sendWebSocketMessage(action, payload) {
    return new Promise((resolve, reject) => {
        const id = ++messageIdCounter;
        pendingRequests.set(id, { resolve, reject });
        const message = { id: id, action: action, ...payload };

        const performSend = () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(message));
            } else {
                reject(new Error('WebSocket closed before sending'));
            }
        };

        if (ws.readyState === WebSocket.OPEN) {
            performSend();
        } else if (ws.readyState === WebSocket.CONNECTING) {
            messageQueue.push(performSend);
        } else {
            pendingRequests.delete(id);
            reject(new Error('WebSocket is not open'));
        }
    });
}

function load_file(name) { 
    return sendWebSocketMessage('load_file', { filename: name }); 
} 

function save_file(name, data) { 
    return sendWebSocketMessage('save_file', { filename: name, data: data }); 
} 

function delete_file(name) { 
    return sendWebSocketMessage('delete_file', { filename: name }); 
} 

function delete_branch(name) { 
    return sendWebSocketMessage('delete_branch', { branch: name }); 
} 

function create_branch(name) { 
    return sendWebSocketMessage('create_branch', { branch: name }); 
}

function list_files(fork) { 
    return sendWebSocketMessage('list_files', { directory: fork || null }); 
} 

function list_branches() { 
    return sendWebSocketMessage('list_branches', {}); 
}
