
# [spore/python](https://github.com/LafeLabs/spore/tree/main/python)

1. download [spore.py](spore.py)
2. run spore.py

this does not yet work. at all.

but when it does, spore.py will open spore.json from a fixed remote url in the top of the file, then get the files and save them locally

with the json copied, it will open that file and create spore dictionary which comes from spore.json

then it opens a web socket on the port specified in spore.json (8086 or 6502)

and listenens for commands from html which have an action that replaces the php scripts. the actions shall be

 - load_file
 - save_file
 - delete_file
 - list_files
 - create_fork
 - delete_fork
 - list_forks
 - save_png
 - set\_instrument\_state
 - get\_instrument\_state
 - get\_instrument\_plot
 - save\_instrument\_data