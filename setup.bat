@ECHO ON
call npm -version
:: install NPM packages
call npm install -g browser-sync
call npm install --global gulp-cli
call npm install --global bower
:: install backend dependencies
call npm install
:: install frontend dependencies
call bower install
call gulp serve
:: browser-sync start --server --port 3001 --files="./src/*"