#!/bin/bash

NODE_MODULES_DIRECTORY=/usr/src/app/front/node_modules

if ! [[ -d "$NODE_MODULES_DIRECTORY" ]] || [ -z "$(ls -A $NODE_MODULES_DIRECTORY)" ]; then
   cp -r /usr/src/cache/node_modules/. $NODE_MODULES_DIRECTORY/
fi

exec npm start