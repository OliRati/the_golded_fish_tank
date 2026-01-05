-- 
-- This is a Sample set of Datas
-- 
USE `thegoldedfishtank`;

INSERT INTO
    `user` (
        `id_user`,
        `name`,
        `email`,
        `password`,
        `creation_date`
    )
VALUES
    (
        1,
        'Claire B.',
        'claire.b@fake.foo',
        MD5 ('nopassword'),
        '2025-02-14 12:00:00'
    ),
    (
        2,
        'Pierre M.',
        'pierre@fake.foo',
        MD5 ('nopassword'),
        '2025-02-28 12:00:00'
    ),
    (
        3,
        'Mathilde D.',
        'mathilde@fake.foo',
        MD5 ('nopassword'),
        '2025-03-03 12:00:00'
    ),
    (
        4,
        'Jean-Marc D.',
        'jean.marc@fake.foo',
        MD5 ('nopassword'),
        '2025-03-05 12:00:00'
    ),
    (
        5,
        'Sophie R.',
        'sophie@fake.foo',
        MD5 ('nopassword'),
        '2025-03-15 12:00:00'
    ),
    (
        6,
        'Marie L.',
        'marie@fake.foo',
        MD5 ('nopassword'),
        '2025-03-23 12:00:00'
    ),
    (
        7,
        'Paul M.',
        'paul@fake.foo',
        MD5 ('nopassword'),
        '2025-03-27 12:00:00'
    ),
    (
        8,
        'Claire T.',
        'claire.t@fake.foo',
        MD5 ('nopassword'),
        '2025-03-19 12:00:00'
    ),
    (
        9,
        'Lucas B.',
        'lucas@fake.foo',
        MD5 ('nopassword'),
        '2025-03-07 12:00:00'
    ),
    (
        10,
        'Jacques M.',
        'jacques@fake.foo',
        MD5 ('nopassword'),
        '2025-02-26 12:00:00'
    ),
    (
        11,
        'Matthieu L.',
        'matthieu@fake.foo',
        MD5 ('nopassword'),
        '2025-02-19 12:00:00'
    ),
    (
        12,
        'Martine B.',
        'martine@fake.foo',
        MD5 ('nopassword'),
        '2025-01-31 12:00:00'
    ),
    (
        13,
        'Georges M.',
        'georges@fake.foo',
        MD5 ('nopassword'),
        '2025-01-27 12:00:00'
    ),
    (
        14,
        'admin',
        'admin@fake.foo',
        MD5 ('password'),
        '2025-01-01 12:00:00'
    );

INSERT INTO
    `message` (
        `id_message`,
        `type`,
        `id_user`,
        `message_date`,
        `question`,
        `response`,
        `validation`
    )
VALUES
    (
        1,
        'forum',
        7,
        "2025-03-27 12:30:00",
        "Quel type de poissons recommandez-vous pour un aquarium d'eau douce de 100 litres ?",
        "Pour un aquarium de 100 litres, nous recommandons des poissons comme les guppys, les néons, et les corydoras. Ces espèces sont adaptées à ce volume et cohabitent bien ensemble. Assurez-vous de maintenir une bonne qualité de l'eau et de suivre un régime alimentaire équilibré pour vos poissons.",
        "yes"
    ),
    (
        2,
        'forum',
        8,
        "2025-03-19 12:30:00",
        "Comment puis-je éviter les algues dans mon aquarium d'eau de mer ?",
        "Pour éviter les algues, assurez-vous de ne pas suralimenter vos poissons et de maintenir un bon équilibre des nutriments dans l'eau. Utilisez un éclairage approprié et contrôlez la durée d'éclairage. Un bon système de filtration et des changements d'eau réguliers sont également essentiels.",
        "yes"
    ),
    (
        3,
        'forum',
        9,
        "2025-03-7 12:30:00",
        "Quels sont les avantages d'un aquarium d'eau de mer par rapport à un aquarium d'eau douce ?",
        "Un aquarium d'eau de mer offre une diversité de couleurs et d'espèces marines fascinantes. Les coraux et les poissons marins peuvent créer un écosystème vibrant et dynamique. Cependant, ils nécessitent plus de soins et une gestion précise des paramètres de l'eau. Si vous êtes prêt à investir du temps et des efforts, un aquarium d'eau de mer peut être extrêmement gratifiant.",
        "yes"
    ),
    (
        4,
        'forum',
        10,
        "2025-02-26 12:30:00",
        "À quelle fréquence dois-je nettoyer mon aquarium ?",
        "Nous recommandons de nettoyer votre aquarium au moins une fois par mois. Cela inclut le changement partiel de l'eau, le nettoyage des filtres et l'élimination des débris accumulés.",
        "yes"
    ),
    (
        5,
        'forum',
        11,
        "2025-02-19 12:30:00",
        "Comment puis-je savoir si mon aquarium a besoin d'une rénovation ?",
        "Si vous remarquez des signes de détérioration, tels que des fuites, des joints usés ou des problèmes de filtration, il est peut-être temps de rénover votre aquarium. Une rénovation peut également être nécessaire si vous souhaitez moderniser le design ou améliorer l'habitat de vos poissons.",
        "yes"
    ),
    (
        6,
        'forum',
        12,
        "2025-01-31 12:30:00",
        "Quels services proposez-vous pour l'entretien des aquariums ?",
        "Nous proposons une gamme complète de services d'entretien, y compris le nettoyage régulier, le changement d'eau, la vérification des paramètres de l'eau, le nettoyage des filtres et l'inspection des équipements. Nous offrons également des conseils personnalisés pour maintenir un environnement sain pour vos poissons.",
        "yes"
    ),
    (
        7,
        'forum',
        13,
        "2025-01-27 12:30:00",
        "Quels sont les coûts associés à la création d'un aquarium sur mesure ?",
        "Les coûts varient en fonction de la taille, des matériaux et des équipements choisis. Nous offrons des consultations gratuites pour évaluer vos besoins et vous fournir un devis personnalisé.",
        "yes"
    ),
    (
        8,
        'review',
        6,
        "2025-03-23 12:30:00",
        "J'ai fait appel à The Golded Fish Tank pour la création d'un aquarium d'eau de mer sur mesure dans mon salon. Le résultat est époustouflant! L'équipe a été professionnelle du début à la fin, et l'aquarium est devenu la pièce maîtresse de notre maison. Je recommande vivement leurs services.",
        "Merci beaucoup, Marie! Nous sommes ravis que vous soyez satisfaite de votre nouvel aquarium. N'hésitez pas à nous contacter pour tout besoin d'entretien ou de conseils supplémentaires.",
        "yes"
    ),
    (
        9,
        'review',
        5,
        "2025-03-15 12:30:00",
        "J'ai sollicité The Golded Fish Tank pour des conseils sur l'entretien de mon aquarium d'eau de mer. Leur expertise et leurs recommandations ont été très utiles. Mon aquarium est maintenant en parfaite santé grâce à leurs conseils avisés.",
        "Merci, Sophie! Nous sommes ravis d'avoir pu vous aider. N'hésitez pas à nous contacter pour toute autre question ou besoin d'assistance.",
        "yes"
    ),
    (
        10,
        'review',
        4,
        "2025-03-05 12:30:00",
        "L'équipe de The Golded Fish Tank a rénové notre ancien aquarium d'eau douce. Ils ont modernisé le système de filtration et ajouté de nouvelles plantes aquatiques. Le résultat est magnifique et nos poissons semblent plus heureux que jamais. Un service impeccable!",
        "Merci, Jean-Marc! Nous sommes heureux que vous et vos poissons appréciez la rénovation. Nous restons à votre disposition pour toute question ou besoin futur.",
        "yes"
    ),
    (
        11,
        'review',
        3,
        "2025-03-03 12:30:00",
        "The Golded Fish Tank a rénové mon ancien aquarium d'eau douce et le résultat est époustouflant. Ils ont su redonner vie à mon aquarium avec des plantes et des poissons magnifiques. Je recommande vivement leurs services !",
        "Merci, Mathilde ! Nous sommes heureux que vous aimiez la rénovation de votre aquarium. Votre satisfaction est notre priorité.",
        "yes"
    ),
    (
        12,
        'review',
        2,
        "2025-02-28 12:30:00",
        "The Golded Fish Tank a créé un aquarium sur mesure pour mon bureau et c'est un véritable chef-d'œuvre. Le design est élégant et les poissons sont en parfaite santé. L'équipe a fait un travail incroyable et je suis très impressionné par leur expertise.",
        "Merci beaucoup, Pierre ! Nous sommes enchantés que vous aimiez votre nouvel aquarium. C'était un plaisir de travailler sur ce projet.",
        "yes"
    ),
    (
        13,
        'review',
        1,
        "2025-02-14 12:30:00",
        "The Golded Fish Tank a transformé mon aquarium d'eau douce en un véritable écosystème. Leur équipe est passionnée et compétente, et ils ont su créer un environnement idéal pour mes poissons. Je suis très heureux du résultat.",
        "Merci, Claire ! Nous sommes ravis que vous soyez satisfaite de votre nouvel écosystème. Votre satisfaction est notre plus grande récompense.",
        "yes"
    );