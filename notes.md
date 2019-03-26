roles table

- id, integer, pk, not null, auto-increment
- name, varchar(255), unique, not null

[API <> Query Builder] <> [Driver <> DB]

-The API talks to the query builder (knex), which will use the driver (SQLite 3) to talk to the DB.

-A query builder translates from JS to SQL

-ORM = Object Relational Mapper 
    -translates from {} <> []