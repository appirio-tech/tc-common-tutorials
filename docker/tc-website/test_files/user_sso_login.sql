create table user_sso_login (
    user_id DECIMAL(10,0),
    provider_id DECIMAL(10,0),
    sso_user_name VARCHAR(254),
    email VARCHAR(254),
    sso_user_id VARCHAR(254),
    create_date DATETIME YEAR TO FRACTION default CURRENT YEAR TO FRACTION,
    modify_date DATETIME YEAR TO FRACTION default CURRENT YEAR TO FRACTION
);

alter table user_sso_login add constraint primary key 
	(user_id, provider_id);