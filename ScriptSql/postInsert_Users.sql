
USE tf_webapps_23_spa;
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE tf_webapps_23_spa.users;
TRUNCATE tf_webapps_23_spa.user_donation;

SET FOREIGN_KEY_CHECKS = 1;

insert into users (login, mdp, active) VALUES
                                           ('Aymeric', 'Test123456', 1),
                                           ('Amandine', 'Test12344', 1),
                                           ('Rémy', 'Test1234ab', 1),
                                           ('Ferdinando', 'Test1234aa', 1),
                                           ('Nicolas', 'Test1234bb', 1),
                                           ('Meroine', 'Test1234dd', 1);

INSERT INTO user_donation (id, type, qty_in_kg, expiration_date, userId)
VALUES (1, 'Croquettes pour chien', 25, '10/09/2023 00:28:37', 1),
       (2, 'Croquettes pour chien', 25, '10/09/2023 00:28:37', 4),
       (3, 'Croquettes pour chien', 25, '10/09/2023 00:28:37', 4),
       (4, 'Croquettes pour chien', 25, '10/09/2023 00:28:37', 1),
       (5, 'Croquettes pour chien', 25, '10/09/2023 00:28:37', 3),
       (6, 'Croquettes pour chien', 25, '10/09/2023 00:28:37', 3)