DROP TYPE IF EXISTS firma_produse;
DROP TYPE IF EXISTS tipuri_produse_papetarie;

CREATE TYPE tipuri_produse_papetarie AS ENUM('articole de hartie', 'accesorii de birou', 'instrumente de scris');
CREATE TYPE firma_produse AS ENUM('pelikan', 'parker', 'bic', 'faber-castell', 'schneider');

CREATE TABLE IF NOT EXISTS papetarie (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   nr_bucati INT NOT NULL CHECK (nr_bucati >= 0),   
   tip_produs tipuri_produse_papetarie DEFAULT 'instrumente de scris',
   firma firma_produse DEFAULT 'bic',
   culoare VARCHAR[],
   reciclabil BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);


INSERT into papetarie(nume, descriere, pret, nr_bucati, tip_produs, firma, culoare, reciclabil, imagine) VALUES
('Creion mecanic', 'Creion mecanic cu mina de 0.5mm', '22.99', '1', 'instrumente de scris', 'faber-castell', '{"negru"}', False, 'creion_mecani.jpg'),
('Capsator', 'Capsator albastru', '31.99', '1', 'accesorii de birou', 'schneider', '{"albastru"}', False, 'capsator_albastru.jpg'),
('Dosar plic', 'Dosar tip plic din carton', '12.30', '10', 'accesorii de birou', 'bic', '{"alb"}', True, 'dosar_plic.jpg'),
('Dosar sina', 'Dosar cu sina din plastic', '11.50', '10', 'accesorii de birou', 'bic', '{"galben"}', False, 'dosar_sina.jpg'),
('Echer', 'Echer practic pentru desen in munca, educatie si scoala cu ipotenuza 22 cm.', '17.90', '1', 'accesorii de birou', 'schneider', '{"galben", "transparent"}', False, 'echer.jpg');