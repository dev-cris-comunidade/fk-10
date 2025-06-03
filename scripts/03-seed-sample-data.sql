-- Insert sample approved testimonials
INSERT INTO depoimentos (name, since, text, status) VALUES
('Ana Silva', '2015', 'A FK mudou completamente minha forma de ver relacionamentos. Encontrei um espaço onde posso ser eu mesma, sem julgamentos. Fiz amizades que levarei para a vida toda e aprendi muito sobre comunicação e respeito.', 'aprovado'),
('Carlos Mendes', '2016', 'Participar da FK me ajudou a desconstruir muitos preconceitos que eu tinha sobre relacionamentos não-monogâmicos. O ambiente acolhedor e as conversas profundas me transformaram como pessoa.', 'aprovado'),
('Juliana Costa', '2017', 'Conheci meus melhores amigos na FK. É mais que uma festa, é uma comunidade de pessoas que se apoiam e se respeitam. Os valores da FK são algo que levo para todos os aspectos da minha vida.', 'aprovado'),
('Roberto Oliveira', '2018', 'A FK me ensinou sobre consenso e comunicação não-violenta. Hoje sou uma pessoa melhor em todos os meus relacionamentos, românticos ou não. Gratidão eterna a essa comunidade incrível.', 'aprovado'),
('Mariana Santos', '2019', 'Depois de anos frequentando a FK, posso dizer que encontrei minha família escolhida. As conexões que fiz aqui são profundas e duradouras. A FK é muito mais que uma festa, é um lar.', 'aprovado');

-- Insert sample approved family stories
INSERT INTO familias (name, story, status) VALUES
('Família Arco-Íris', 'Nos conhecemos na FK em 2016 e desde então formamos uma família linda e diversa. Somos cinco pessoas que se amam de formas diferentes, mas todas autênticas. A FK nos ensinou que o amor não tem limites nem rótulos.', 'aprovado'),
('Tribo Livre', 'Nossa história começou numa conversa no lounge da FK sobre poliamor. Três anos depois, somos um núcleo de seis pessoas que compartilham casa, sonhos e muito amor. A FK foi o berço da nossa família escolhida.', 'aprovado'),
('Conexão Carioca', 'Éramos estranhos numa festa FK em 2017. Hoje somos parceiros de vida, criando nossos filhos juntos numa estrutura familiar não-tradicional mas cheia de amor e respeito mútuo.', 'aprovado');

-- Insert sample approved memories
INSERT INTO memorias (honored_name, submitter_name, message, status) VALUES
('João Paulo Martins', 'Comunidade FK', 'João Paulo foi um dos pioneiros da FK, sempre presente com seu sorriso contagiante e abraços calorosos. Sua partida deixou uma saudade imensa, mas seu legado de amor e aceitação permanece vivo em nossos corações.', 'aprovado'),
('Maria Fernanda Silva', 'Amigos da FK', 'Mafe, como carinhosamente a chamávamos, era luz pura. Sempre disposta a acolher os novatos e compartilhar sua sabedoria sobre relacionamentos éticos. Sua memória nos inspira a continuar construindo uma comunidade mais amorosa.', 'aprovado');

-- Insert some pending submissions for testing
INSERT INTO depoimentos (name, since, text, status) VALUES
('Pedro Santos', '2020', 'Teste de depoimento pendente para aprovação.', 'pendente');

INSERT INTO familias (name, story, status) VALUES
('Nova Família', 'História de família pendente para aprovação.', 'pendente');

INSERT INTO memorias (honored_name, submitter_name, message, status) VALUES
('Pessoa Teste', 'Anônimo', 'Memória pendente para aprovação.', 'pendente');
