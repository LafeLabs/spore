import asyncio
import json
import os
import shutil
import websockets

async def handle_client(websocket):
    try:
        async for message in websocket:
            try:
                request = json.loads(message)
            except json.JSONDecodeError:
                await send_error(websocket, None, "Invalid JSON format")
                continue

            msg_id = request.get("id")
            action = request.get("action")

            try:
                if action == "load_file":
                    filename = request.get("filename")
                    if not filename:
                        await send_error(websocket, msg_id, "Missing filename")
                        continue
                    
                    if os.path.exists(filename) and os.path.isfile(filename):
                        with open(filename, "r", encoding="utf-8") as f:
                            content = f.read()
                        await send_success(websocket, msg_id, content)
                    else:
                        await send_success(websocket, msg_id, "")

                elif action == "save_file":
                    filename = request.get("filename")
                    data = request.get("data", "")
                    if not filename:
                        await send_error(websocket, msg_id, "Missing filename")
                        continue
                    
                    with open(filename, "w", encoding="utf-8") as f:
                        f.write(data)
                    await send_success(websocket, msg_id, "File saved successfully")

                elif action == "delete_file":
                    filename = request.get("filename")
                    if not filename:
                        await send_error(websocket, msg_id, "Missing filename")
                        continue
                    
                    if os.path.exists(filename) and os.path.isfile(filename):
                        os.remove(filename)
                    await send_success(websocket, msg_id, "File deleted")

                elif action == "delete_branch":
                    branch = request.get("branch")
                    if not branch:
                        await send_error(websocket, msg_id, "Missing branch name")
                        continue
                    
                    if os.path.exists(branch) and os.path.isdir(branch):
                        shutil.rmtree(branch)
                    await send_success(websocket, msg_id, "Branch deleted")

                elif action == "list_files":
                    directory = request.get("directory") or "."
                    if os.path.exists(directory) and os.path.isdir(directory):
                        files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
                        await send_success(websocket, msg_id, files)
                    else:
                        await send_success(websocket, msg_id, [])

                elif action == "list_branches":
                    items = os.listdir(".")
                    branches = [i for i in items if os.path.isdir(i)]
                    await send_success(websocket, msg_id, branches)

                elif action == "create_branch":
                    branch = request.get("branch")
                    if not branch:
                        await send_error(websocket, msg_id, "Missing branch name")
                        continue
                    
                    os.makedirs(branch, exist_ok=True)
                    allowed_extensions = {'txt', 'html', 'css', 'js', 'json', 'php', 'md', 'sh', 'bat', 'ipynb', 'py'}
                    
                    for file in os.listdir("."):
                        if os.path.isfile(file):
                            ext = file.split(".")[-1].lower() if "." in file else ""
                            if ext in allowed_extensions:
                                shutil.copy(file, os.path.join(branch, file))
                                
                    await send_success(websocket, msg_id, "Branch created successfully")

                else:
                    await send_error(websocket, msg_id, f"Unknown action: {action}")

            except Exception as e:
                await send_error(websocket, msg_id, str(e))

    except websockets.exceptions.ConnectionClosed:
        pass

async def send_success(websocket, msg_id, data):
    response = {"id": msg_id, "success": True, "data": data}
    await websocket.send(json.dumps(response))

async def send_error(websocket, msg_id, error_message):
    response = {"id": msg_id, "success": False, "error": error_message}
    await websocket.send(json.dumps(response))

async def main():
    async with websockets.serve(handle_client, "0.0.0.0", 8086):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
