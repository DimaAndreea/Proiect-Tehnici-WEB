CREATE TABLE IF NOT EXISTS seturi (
    id serial PRIMARY KEY,
    nume_set VARCHAR(100) NOT NULL,
    descriere_set TEXT
);


INSERT INTO seturi (nume_set, descriere_set) VALUES
('Set creativ pentru desen', 'Set complet pentru desen, ideal pentru studenți și pasionați de artă.'),
('Set office essential', 'Set esențial pentru birou, perfect pentru un start în activitatea de birou.'),
('Set scolar pentru inceput de an', 'Set necesar pentru școală, conține toate produsele esențiale.'),
('Set de scriere premium', 'Set premium de instrumente de scris, ideal pentru cadouri.'),
('Set accesorii de birou colorate', 'Set variat de accesorii de birou colorate, perfect pentru a aduce bucurie la locul de muncă.');
