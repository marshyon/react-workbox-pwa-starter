#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

#
# DEBIAN PACKAGES
#
apt-get update 
apt upgrade -y
apt install git vim zsh neofetch rsync vim -y 


