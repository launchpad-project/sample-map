#!/bin/bash

cd venues
fileRegex='*.json'

for file in `ls`
do
	echo 'Processing file ' ${file}
	venue=$(basename -s .json $file)
	echo 'Indexing venue ' ${venue}
	curl -XPUT "localhost:8080/map/venues/"$venue -H "Content-Type: application/json" -d @${file}
	echo ''
done;

echo 'All done.'
