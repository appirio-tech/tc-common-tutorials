delete from long_submission;
delete from long_component_state;
delete from long_comp_result;
delete from round_registration;

insert into round_registration(round_id ,coder_id ,timestamp)
values ( 13673, 124766, current);
insert into round_registration(round_id ,coder_id ,timestamp)
values ( 13673, 124834, current);
insert into long_comp_result(round_id ,coder_id ,point_total ,attended ,placed ,system_point_total ,old_rating ,new_rating)
values ( 13673, 124766, 200, 'Y', 1, 200, 11, 22);
insert into long_comp_result(round_id ,coder_id ,point_total ,attended ,placed ,system_point_total ,old_rating ,new_rating)
values ( 13673, 124834, 120, 'Y', 2, 120, 11, 22);
insert into long_component_state(long_component_state_id ,round_id ,coder_id ,component_id ,points ,status_id ,submission_number,example_submission_number)
values ( 1, 13673, 124766, 2020, 200, 150, 1, 0);
insert into long_component_state(long_component_state_id ,round_id ,coder_id ,component_id ,points ,status_id ,submission_number,example_submission_number)
values ( 2, 13673, 124834, 2020, 120, 150, 2, 2);
insert into long_submission(long_component_state_id ,submission_number ,example ,open_time ,submit_time ,submission_points, language_id)
values ( 1, 1, 0, dbinfo('utc_current')*1000, dbinfo('utc_current')*1000, 200, 1);
insert into long_submission(long_component_state_id ,submission_number ,example ,open_time ,submit_time ,submission_points, language_id)
values ( 2, 1, 0, dbinfo('utc_current')*1000, dbinfo('utc_current')*1000, 110, 3);
insert into long_submission(long_component_state_id ,submission_number ,example ,open_time ,submit_time ,submission_points, language_id)
values ( 2, 2, 0, dbinfo('utc_current')*1000, dbinfo('utc_current')*1000, 120, 3);
insert into long_submission(long_component_state_id ,submission_number ,example ,open_time ,submit_time ,submission_points, language_id)
values ( 2, 1, 1, dbinfo('utc_current')*1000, dbinfo('utc_current')*1000, 110, 3);
insert into long_submission(long_component_state_id ,submission_number ,example ,open_time ,submit_time ,submission_points, language_id)
values ( 2, 2, 1, dbinfo('utc_current')*1000, dbinfo('utc_current')*1000, 120, 3);


insert into round_registration(round_id ,coder_id ,timestamp)
values ( 13675, 124764, current);
insert into round_registration(round_id ,coder_id ,timestamp)
values ( 13675, 124772, current);
insert into round_registration(round_id ,coder_id ,timestamp)
values ( 13675, 124776, current);
insert into long_comp_result(round_id ,coder_id ,point_total ,attended ,placed ,system_point_total ,old_rating ,new_rating)
values ( 13675, 124764, 200, 'Y', 1, 220, 11, 22);
insert into long_comp_result(round_id ,coder_id ,point_total ,attended ,placed ,system_point_total ,old_rating ,new_rating)
values ( 13675, 124772, 120, 'Y', 2, 130, 11, 22);
insert into long_component_state(long_component_state_id ,round_id ,coder_id ,component_id ,points ,status_id ,submission_number,example_submission_number)
values ( 3, 13675, 124764, 2041, 220, 150, 1, 0);
insert into long_component_state(long_component_state_id ,round_id ,coder_id ,component_id ,points ,status_id ,submission_number,example_submission_number)
values ( 4, 13675, 124772, 2041, 130, 150, 2, 0);
insert into long_submission(long_component_state_id ,submission_number ,example ,open_time ,submit_time ,submission_points, language_id)
values ( 3, 1, 0, dbinfo('utc_current')*1000, dbinfo('utc_current')*1000, 220, 4);
insert into long_submission(long_component_state_id ,submission_number ,example ,open_time ,submit_time ,submission_points, language_id)
values ( 4, 1, 0, dbinfo('utc_current')*1000, dbinfo('utc_current')*1000, 120, 6);
insert into long_submission(long_component_state_id ,submission_number ,example ,open_time ,submit_time ,submission_points, language_id)
values ( 4, 2, 0, dbinfo('utc_current')*1000, dbinfo('utc_current')*1000, 130, 6);