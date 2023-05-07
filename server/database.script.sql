--------------------------------------------------| Create the case table
CREATE TABLE cases
(
  id serial NOT NULL,
  title character varying(128) NOT NULL,
  date timestamp without time zone NOT NULL,
  description character varying(255) NOT NULL,
  comment_status integer NOT NULL,
  username character varying(255) NOT NULL,
  CONSTRAINT cases_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE cases
  OWNER TO postgres;

--------------------------------------------------| Insert data in the case table
INSERT INTO cases(
            id, title, date, description, comment_status, username)
VALUES 
("My Case 1";"2023-05-07 19:04:35.759";"My inlaws are troubling me a lot";1;"test"),
("My Case 4";"2023-05-07 19:04:35.759";"My husband is very bad 4";1;"test"),
("My Case 3";"2023-05-07 19:04:35.759";"My husband is very bad 3";1;"test"),
("My Case 2";"2023-05-07 19:04:35.759";"My husband is very bad";1;"test");

--------------------------------------------------| Create the case comment table
CREATE TABLE case_comments
(
  id serial NOT NULL,
  case_id integer,
  date timestamp without time zone,
  username character varying(255),
  text character varying(512),
  CONSTRAINT case_comments_pkey PRIMARY KEY (id),
  CONSTRAINT case_comments_case_id_fkey FOREIGN KEY (case_id)
      REFERENCES cases (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE case_comments
  OWNER TO postgres;

--------------------------------------------------| Insert data in the case comment table
INSERT INTO case_comments(
    case_id, date, username, text)
VALUES 
(1,NOW(),'test','Inlaws are beating me'), 
(1,NOW(),'test','What else they are doing'), 
(1,NOW(),'test','They are not allowing me to sleep also.'),
(2,NOW(),'test','My husband beats me alot, abuses me also.'), 
(2,NOW(),'test','How he troubles you'), 
(2,NOW(),'test','He kicks me, hit me sometimes throws me out of the house.'),
(3,NOW(),'test','My husband beats me alot, abuses me also.3'), 
(3,NOW(),'test','How he troubles you 3'), 
(3,NOW(),'test','He kicks me, hit me sometimes throws me out of the house. 3'),
(4,NOW(),'test','My husband beats me alot, abuses me also.4'), 
(4,NOW(),'test','How he troubles you 4'), 
(4,NOW(),'test','He kicks me, hit me sometimes throws me out of the house. 4');