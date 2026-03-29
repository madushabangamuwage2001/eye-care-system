@echo off
cd %~dp0

echo Starting Eye Care Management System Microservices...

start cmd /k "cd user-service && title USER-SERVICE [8001] && node app.js"
start cmd /k "cd doctor-service && title DOCTOR-SERVICE [8002] && node app.js"
start cmd /k "cd spectacles-service && title SPECTACLES-SERVICE [8003] && node app.js"
start cmd /k "cd medicine-service && title MEDICINE-SERVICE [8004] && node app.js"
start cmd /k "cd feedback-service && title FEEDBACK-SERVICE [8005] && node app.js"
start cmd /k "cd order-service && title ORDER-SERVICE [8006] && node app.js"
start cmd /k "cd notification-service && title NOTIFICATION-SERVICE [8007] && node app.js"
start cmd /k "cd api-gateway && title API-GATEWAY [8080] && node app.js"

echo All services have been launched in separate terminal windows!
echo It might take a few seconds for all of them to be ready.
pause
