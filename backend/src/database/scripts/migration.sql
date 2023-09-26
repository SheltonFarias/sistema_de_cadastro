CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(50) NOT NULL,
    email CHARACTER VARYING(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY(category_id) REFERENCES categorias(id)
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO categorias(id, name) VALUES(1, "Facebook");