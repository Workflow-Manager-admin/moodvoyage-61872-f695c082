#!/bin/bash
cd /home/kavia/workspace/code-generation/moodvoyage-61872-f695c082/moodvoyage_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

