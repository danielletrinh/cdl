# __Our Catchy Project name here__

## Overview & Purpose
tbd

## How to start the front end
```
# bash
cd recommender-frontend
npm i
npm run start
```

## How to start the back end
```
# bash
source <your env>/bin/activate 
cd recommender-webapi
flask --app web-root --debug run
.......
```
the console will now give you a local host address you may navigate to, similar to: http://127.0.0.1:5000


## Setup your local full stack
```
# bash
cd recommender-frontend
npm i
npm run build
cp -r build/ ../recommender-webapi/static
```
At this point you have the entire react frontend code available in the `recommender-webapi/static` directory. You can now reference this relationally via the flask web api templating process. Take a look at the "web-root.py" routing for `/` 

### One(ahem, 2) more step(s)!
```
# bash
# begin in ./recommender-webapi/static dir
# we replace the folder pathing to match our web server - this is super horsey and NOT how its exactly done in a professional production environment, but its close enough for now!
# we remove the build placeholder (i dont think we want to get into webpack build pipeline nuance for this project ;) )
find static -type f -exec sed -i 's|"/"|"static/static/"|g' {} +
```

now you should be able to run the flask app and navigate to the landing page and see our react view(s)

