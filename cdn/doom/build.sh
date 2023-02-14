#!/bin/bash

if [ $# -eq 0 ]
  then
    game="doom1"
  else
    game="$1"
fi

wad="$game"

if [[ $game == freedoom* ]]
  then
    wad="freedoom"
fi

rm -rf ./build/final.bc

cd ./src/SDL/
make clean
cd ..

make clean
cd ..

make clean
make GAME=$game

rm ./build/prboom.wad
rm ./src/prboom-game-server
mv ./src/prboom ./build/final.bc
cp ./data/prboom.wad ./build/prboom.wad

cd ./build/

rm -rf web/${game}/
mkdir -p web/${game}/

emcc final.bc -o web/${game}/${game}.html  	\
     --preload-file prboom.wad     	\
     --preload-file ${game}/${wad}.wad@/${wad}.wad 	\
     --preload-file ${game}/music@/music  	\
     --preload-file ${game}/sfx@/sfx    		\
     -s TOTAL_MEMORY=256MB     		\
     -s LEGACY_GL_EMULATION=1      	\
     -s EXIT_RUNTIME=1      \
     --no-heap-copy -O3

cd ..

