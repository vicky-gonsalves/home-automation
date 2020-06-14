#!/bin/sh

setup_git() {
  echo "setting up git"
  git config --global user.email "vicky.gonsalves@outlook.com"
  git config --global user.name "Vicky Gonsalves"
}

clone_repo(){
  echo "cloning repo"
  cd ..
  git clone https://$GIT_PERSONAL_ACCESS_TOKEN:x-oauth-basic@github.com/vicky-gonsalves/build.git
}

move_build(){
  echo "moving build"
  cd build
  rm -R build
  mv ../home-automation/build build
}

commit_website_files() {
  echo "commiting build"
  git add -A
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  echo "pushing build"
  git push origin master
}

cleanup() {
  echo "cleaning up"
  cd ..
  rm -R build
  rm -R home-automation
}

setup_git
clone_repo
move_build
commit_website_files
upload_files
cleanup
