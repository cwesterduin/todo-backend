DROP TABLE IF EXISTS todos;
CREATE TABLE todos (
    id serial PRIMARY KEY,
    title varchar(100) NOT NULL,
    body varchar(1000) NOT NULL,
    completed boolean DEFAULT false
);
