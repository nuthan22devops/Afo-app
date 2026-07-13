#!/bin/bash

containerID = 'docker ps| awk -F" "'{print$1}''

docker rm -f $containerID
