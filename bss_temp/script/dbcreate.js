/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var dbconfig = require('../server/dbconfig');

var connection = mysql.createConnection(dbconfig.connection);

//connection.query('drop database if exists ' + dbconfig.database );
connection.query('create database if not exists  ' + dbconfig.database);
connection.query('use ' + dbconfig.database);
//connection.query('drop table if exists ' + dbconfig.users_table);
//connection.query('CREATE DATABASE ' + dbconfig.database);

// user_type : admin, cuser:customer, ruser:sales repsentative
// UserStatus : 0-Passive,1-Active,2-Deprecated
// Order Roles (ORole) : 0-None,1-Display,2-Create,3-Change,4-Delete,5-Approve,9-All
// Customer User Roles (URole) : 1-Order User,2-Order Manager,3-General Manager
// Sales Representative User Roles (URole) : 1-Sales Representative,2-Salesman,3-General Manager
connection.query('create table if not exists ' + 
                 dbconfig.database + '.' +  dbconfig.users_table + 
                 " ( id          INT UNSIGNED NOT NULL AUTO_INCREMENT,\
                     username    VARCHAR(20)  NOT NULL DEFAULT '', \
                     password    VARCHAR(60)  NOT NULL DEFAULT '', \
                     user_type   enum('admin','cuser','ruser') NOT NULL DEFAULT 'cuser', \
                     user_status CHAR(1)      NOT NULL DEFAULT '0', \
                     first_name  VARCHAR(20)  NOT NULL DEFAULT '', \
                     middle_name VARCHAR(20)  NOT NULL DEFAULT '', \
                     last_name   VARCHAR(20)  NOT NULL DEFAULT '', \
                     email       VARCHAR(60)  NOT NULL DEFAULT '', \
                     tel_no      VARCHAR(20)  NOT NULL DEFAULT '', \
                     fax_no      VARCHAR(20)  NOT NULL DEFAULT '', \
                     company_id  INT UNSIGNED NOT NULL DEFAULT  0, \
                     system_user VARCHAR(20)  NOT NULL DEFAULT '', \
                     customer_id INT UNSIGNED NOT NULL DEFAULT  0, \
                     order_role  CHAR(1)      NOT NULL DEFAULT '0',\
                     user_role   CHAR(1)      NOT NULL DEFAULT '0',\
                     created_by  VARCHAR(20)  NOT NULL DEFAULT '', \
                     created_at  DATETIME     NOT NULL, \
                     uptated_by  VARCHAR(20)  NOT NULL DEFAULT '', \
                     updated_at  DATETIME     NOT NULL, \
                     PRIMARY KEY (id), \
                     UNIQUE INDEX ID_UNIQUE (id ASC), \
                     UNIQUE INDEX USERNAME_UNIQUE (username ASC) )");

/*                     
connection.query('create table if not exists ' + 
                 dbconfig.database + '.' +  dbconfig.admin_table + 
                 " ( id          INT UNSIGNED NOT NULL , \
                     first_name  VARCHAR(20) NOT NULL DEFAULT '', \
                     middle_name VARCHAR(20) NOT NULL DEFAULT '', \
                     last_name   VARCHAR(20) NOT NULL DEFAULT '', \
                     email       CHAR(60) NOT NULL, \
                     tel_no      VARCHAR(20) , \
                     fax_no      VARCHAR(20) , \
                     created_by  CHAR(20) NOT NULL, \
                     created_at  DATETIME NOT NULL, \
                     uptated_by  CHAR(20) NOT NULL, \
                     updated_at  DATETIME NOT NULL, \
                     PRIMARY KEY (id), \
                     UNIQUE INDEX ID_UNIQUE (id ASC) )");

connection.query('create table if not exists ' + 
                 dbconfig.database + '.' +  dbconfig.cuser_table + 
                 " ( id          INT UNSIGNED NOT NULL , \
                     first_name  VARCHAR(20) NOT NULL DEFAULT '', \
                     middle_name VARCHAR(20) NOT NULL DEFAULT '', \
                     last_name   VARCHAR(20) NOT NULL DEFAULT '', \
                     email       CHAR(60) NOT NULL, \
                     tel_no      VARCHAR(20) , \
                     fax_no      VARCHAR(20) , \
                     customer_id INT UNSIGNED NOT NULL , \
                     order_role  CHAR(1)  NOT NULL, \
                     user_role   CHAR(1)  NOT NULL, \
                     created_by  CHAR(20) NOT NULL, \
                     created_at  DATETIME NOT NULL, \
                     uptated_by  CHAR(20) NOT NULL, \
                     updated_at  DATETIME NOT NULL, \
                     PRIMARY KEY (id), \
                     UNIQUE INDEX ID_UNIQUE (id ASC) )");
                     
connection.query('create table if not exists ' + 
                 dbconfig.database + '.' +  dbconfig.ruser_table + 
                 " ( id          INT UNSIGNED NOT NULL , \
                     first_name  VARCHAR(20) NOT NULL DEFAULT '', \
                     middle_name VARCHAR(20) NOT NULL DEFAULT '', \
                     last_name   VARCHAR(20) NOT NULL DEFAULT '', \
                     email       CHAR(60) NOT NULL, \
                     tel_no      VARCHAR(20) , \
                     fax_no      VARCHAR(20) , \
                     company_id  INT UNSIGNED NOT NULL , \
                     system_user CHAR(20) NOT NULL, \
                     order_role  CHAR(1)  NOT NULL, \
                     user_role   CHAR(1)  NOT NULL, \
                     created_by  CHAR(20) NOT NULL, \
                     created_at  DATETIME NOT NULL, \
                     uptated_by  CHAR(20) NOT NULL, \
                     updated_at  DATETIME NOT NULL, \
                     PRIMARY KEY (id), \
                     UNIQUE INDEX ID_UNIQUE (id ASC) )");
*/
connection.query('create table if not exists ' + 
                 dbconfig.database + '.' +  dbconfig.company_table + 
                 " ( id         INT UNSIGNED NOT NULL, \
                     code       CHAR(4)      NOT NULL, \
                     name       VARCHAR(30)  NOT NULL, \
                     full_name  VARCHAR(255) NOT NULL DEFAULT '', \
                     email      VARCHAR(60)  NOT NULL DEFAULT '', \
                     tel_no     VARCHAR(20)  NOT NULL DEFAULT '', \
                     fax_no     VARCHAR(20)  NOT NULL DEFAULT '', \
                     created_by VARCHAR(20)  NOT NULL, \
                     created_at DATETIME     NOT NULL, \
                     uptated_by VARCHAR(20)  NOT NULL, \
                     updated_at DATETIME     NOT NULL, \
                     PRIMARY KEY (id), \
                     UNIQUE INDEX ID_UNIQUE (id ASC), \
                     UNIQUE INDEX CODE_UNIQUE (code ASC)  )");
                     
connection.query('create table if not exists ' + 
                 dbconfig.database + '.' +  dbconfig.customer_table + 
                 " ( id         INT UNSIGNED NOT NULL,\
                     code       CHAR(10)     NOT NULL,\
                     name       VARCHAR(30)  NOT NULL,\
                     full_name  VARCHAR(255) NOT NULL DEFAULT '',\
                     email      VARCHAR(60)  NOT NULL DEFAULT '',\
                     tel_no     VARCHAR(20)  NOT NULL DEFAULT '', \
                     fax_no     VARCHAR(20)  NOT NULL DEFAULT '', \
                     created_by VARCHAR(20)  NOT NULL, \
                     created_at DATETIME     NOT NULL, \
                     uptated_by VARCHAR(20)  NOT NULL, \
                     updated_at DATETIME     NOT NULL, \
                     PRIMARY KEY (id), \
                     UNIQUE INDEX ID_UNIQUE (id ASC), \
                     UNIQUE INDEX CODE_UNIQUE (code ASC) )");
                     
console.log('Success: Database and Tables Created!')

connection.end();
