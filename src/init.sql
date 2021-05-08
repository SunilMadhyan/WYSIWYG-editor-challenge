create table documents (
    id serial primary key,
    document varchar(20000),
    date timestamp);
    
insert into documents (document, date) values ('<p>working</p>', CURRENT_TIMESTAMP);