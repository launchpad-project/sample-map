#!/bin/bash

curl 'localhost:8080/sample-map' \
-H 'Content-Type: application/json' \
-d '{
	"name" : "venues",
	"mappings" : {
		"location" : {
			"type" : "geo_point"
		},
		"name" : {
			"type" : "string"
		},
		"rating" : {
			"type" : "float"
		},
		"categories" : {
			"type" : "string"
		}
	}
}'
