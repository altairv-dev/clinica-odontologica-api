CREATE DATABASE IF NOT EXISTS clinica_odontologica
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE clinica_odontologica;

DROP TABLE IF EXISTS paciente;

CREATE TABLE paciente (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  procedimento VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO paciente (nome, telefone, procedimento) VALUES
  ('Maria Silva', '(62) 99999-1111', 'Limpeza dental'),
  ('João Pereira', '(62) 98888-2222', 'Extração de siso'),
  ('Ana Costa', '(62) 97777-3333', 'Tratamento de canal'),
  ('Carlos Souza', '(62) 96666-4444', 'Clareamento dental'),
  ('Fernanda Lima', '(62) 95555-5555', 'Colocação de aparelho ortodôntico');
