var Schema = {
// user_type : admin, cuser:customer, ruser:sales repsentative
// UserStatus : 0-Passive,1-Active,2-Deprecated
// Order Roles (ORole) : 0-None,1-Display,2-Create,3-Change,4-Delete,5-Approve,9-All
// Customer User Roles (URole) : 1-Order User,2-Order Manager,3-General Manager
// Sales Representative User Roles (URole) : 1-Sales Representative,2-Salesman,3-General Manager
    user: {
        id: {type: 'increments', nullable: false, primary: true},
        username: {type: 'string', maxlength: 20, nullable: false, unique: true},
        password: {type: 'string', maxlength: 60, nullable: false},        
        //uuid: {type: 'string', maxlength: 36, nullable: false, validations: {isUUID: true}},
        user_type: {type: 'string', maxlength: 5, nullable: false, defaultTo: 'admin'},
        user_status: {type: 'string', maxlength: 1, nullable: false, defaultTo: '0'},
        first_name: {type: 'string', maxlength: 20, nullable: false},
        middle_name: {type: 'string', maxlength: 20, nullable: false},
        last_name: {type: 'string', maxlength: 20, nullable: false},
        email: {type: 'string', maxlength: 254, nullable: false},
        tel_no: {type: 'string', maxlength: 254, nullable: false},
        fax_no: {type: 'string', maxlength: 254, nullable: false},
        company_id: {type: 'integer', nullable: false},
        system_user: {type: 'string', maxlength: 20, nullable: false},
        customer_id: {type: 'integer', nullable: false},
        order_role: {type: 'string', maxlength: 1, nullable: false, defaultTo: '0'},
        user_role: {type: 'string', maxlength: 1, nullable: false, defaultTo: '0'},
        last_login: {type: 'dateTime', nullable: true},
        created_at: {type: 'dateTime', nullable: false},
        created_by: {type: 'string', maxlength: 20, nullable: false},
        updated_at: {type: 'dateTime', nullable: true},
        updated_by: {type: 'string', maxlength: 20, nullable: true}
    }
};
module.exports = Schema;