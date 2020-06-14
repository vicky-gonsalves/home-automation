#!/bin/sh

setup_git() {
  git config --global user.email "vicky.gonsalves@outlook.com"
  git config --global user.name "Vicky Gonsalves"
}

clone_repo(){
  cd ..
  git clone https://github.com/vicky-gonsalves/build.git
}

move_build(){
  cd build
  rm -R build
  mv ../home-automation/build build
}

commit_website_files() {
  git add -A
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git push origin master
}

setup_git
clone_repo
move_build
commit_website_files
upload_files
