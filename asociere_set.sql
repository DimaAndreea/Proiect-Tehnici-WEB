CREATE TABLE IF NOT EXISTS asociere_set (
    id serial PRIMARY KEY,
    id_set INT NOT NULL,
    id_produs INT NOT NULL,
    FOREIGN KEY (id_set) REFERENCES seturi(id) ON DELETE CASCADE,
    FOREIGN KEY (id_produs) REFERENCES papetarie(id) ON DELETE CASCADE
);


-- Set 1: Set creativ pentru desen
INSERT INTO asociere_set (id_set, id_produs) VALUES
(1, 1),  -- Creion mecanic
(1, 6);  -- Creioane colorate

-- Set 2: Set office essential
INSERT INTO asociere_set (id_set, id_produs) VALUES
(2, 2),   -- Capsator
(2, 12);  -- Lipici solid

-- Set 3: Set scolar pentru inceput de an
INSERT INTO asociere_set (id_set, id_produs) VALUES
(3, 3),   -- Dosar plic
(3, 7),   -- Creion simplu
(3, 8);   -- Guma de sters

-- Set 4: Set de scriere premium
INSERT INTO asociere_set (id_set, id_produs) VALUES
(4, 1),   -- Creion mecanic
(4, 11);  -- Marker

-- Set 5: Set accesorii de birou colorate
INSERT INTO asociere_set (id_set, id_produs) VALUES
(5, 4),   -- Dosar sina
(5, 9);   -- Marker
