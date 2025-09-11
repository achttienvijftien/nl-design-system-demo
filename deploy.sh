#!/bin/bash

SSH_CMD=$1
DEPLOY_DIR=$2
BUILD_NUMBER=$3

ssh $SSH_CMD "mkdir -p $DEPLOY_DIR/releases/$BUILD_NUMBER"
scp ./archive.tar.gz $SSH_CMD:$DEPLOY_DIR/releases/$BUILD_NUMBER
ssh $SSH_CMD "tar xzf $DEPLOY_DIR/releases/$BUILD_NUMBER/archive.tar.gz -C $DEPLOY_DIR/releases/$BUILD_NUMBER"
ssh $SSH_CMD "rm -f $DEPLOY_DIR/releases/$BUILD_NUMBER/archive.tar.gz"
ssh $SSH_CMD "rm -f $DEPLOY_DIR/current && ln -sf $DEPLOY_DIR/releases/$BUILD_NUMBER $DEPLOY_DIR/current"
ssh $SSH_CMD "cd $DEPLOY_DIR/releases && ls -t | sed -e '1,3d' | xargs -d '\n' rm -rf"
ssh $SSH_CMD "sudo /usr/local/lsws/bin/lswsctrl reload"
