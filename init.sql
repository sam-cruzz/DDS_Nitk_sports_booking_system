CREATE DATABASE IF NOT EXISTS springbootmicroservicesjwtproduct;
CREATE DATABASE IF NOT EXISTS springbootmicroservicesjwtuser;
CREATE DATABASE IF NOT EXISTS springbootdb;
CREATE DATABASE IF NOT EXISTS springbootmicroservicesjwtauth;

-- Grant all privileges on all databases to appuser
GRANT ALL PRIVILEGES ON springbootmicroservicesjwtproduct.* TO 'appuser'@'%';
GRANT ALL PRIVILEGES ON springbootmicroservicesjwtuser.* TO 'appuser'@'%';
GRANT ALL PRIVILEGES ON springbootdb.* TO 'appuser'@'%';
GRANT ALL PRIVILEGES ON springbootmicroservicesjwtauth.* TO 'appuser'@'%';
FLUSH PRIVILEGES;