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
('Creion mecanic', 'Creion mecanic cu mina de 0.5mm', '22.99', '1', 'instrumente de scris', 'faber-castell', '{"negru"}', False, 'creion_mecanic_fc.jpg'),
('Capsator', 'Capsator albastru', '31.99', '1', 'accesorii de birou', 'schneider', '{"albastru"}', False, 'capsator_albastru.jpg'),
('Dosar plic', 'Dosar tip plic din carton', '12.30', '10', 'accesorii de birou', 'bic', '{"alb"}', True, 'plic_pastel.jpg'),
('Dosar sina', 'Dosar cu sina din plastic', '11.50', '10', 'accesorii de birou', 'bic', '{"galben"}', False, 'dosar_sina.jpg'),
('Echer', 'Echer practic pentru desen in munca, educatie si scoala cu ipotenuza 22 cm.', '17.90', '1', 'accesorii de birou', 'schneider', '{"galben", "transparent"}', False, 'echer.jpg'),
('Creioane colorate', 'Set de creioane colorate', '15.99', '20', 'instrumente de scris', 'faber-castell', '{"negru", "galben", "verde", "rosu", "albastru"}', False, 'creioane_colorate.jpg'),
('Creion', 'Creion grafit', '2.50', '100', 'instrumente de scris', 'bic', '{"gri"}', False, 'creion1.jpg'),
('Creion simplu', 'Creion simplu HB', '1.50', '100', 'instrumente de scris', 'bic', '{"galben"}', False, 'creion2.jpg'),
('Guma de sters', 'Guma de sters clasica', '3.20', '50', 'accesorii de birou', 'faber-castell', '{"alb"}', False, 'guma.jpg'),
('Marker', 'Marker permanent negru', '5.00', '25', 'instrumente de scris', 'bic', '{"negru"}', False, 'marker.jpg'),
('Foarfece', 'Foarfece din otel inoxidabil', '9.99', '30', 'accesorii de birou', 'schneider', '{"negru"}', False, 'foarfeca.jpg'),
('Lipici solid', 'Lipici solid Daco', '6.40', '15', 'accesorii de birou', 'bic', '{"alb"}', True, 'lipici.jpg'),
('Hartie colorata', 'Set de hartie colorata', '12.00', '100', 'articole de hartie', 'bic', '{"galben", "verde", "rosu", "albastru"}', True, 'hartie_colorata.jpg'),
('Perforator', 'Perforator metalic negru', '14.50', '10', 'accesorii de birou', 'schneider', '{"negru"}', False, 'perforator2.png'),
('Pix', 'Pix cu gel albastru', '3.80', '50', 'instrumente de scris', 'parker', '{"albastru"}', False, 'pix3.jpg');