# Winston performance 

Winston Calling "logger.debug" without actually printing reduces performance by ~15%


-   INSTALL:
    -   `apt-get install apache2-utils`
    -   `npm ci`
-   RUN:  
    -   `npm run dev`  Calling disabled "logger.debug"  
    -   `npm run dev --logger_off` Removes logger call with if()...
-   TEST
    -    `ab -k -n 1000000 -c 10  -l  -T 'application/json'   http://localhost:8080/`