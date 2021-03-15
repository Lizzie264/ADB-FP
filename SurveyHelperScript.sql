SET DEFINE OFF

-- Table structure for table ´users´

CREATE TABLE users(
    idUser       NUMBER GENERATED ALWAYS AS IDENTITY,
    nickname     VARCHAR2(20) NOT NULL,
    nameUser     VARCHAR2(35) NOT NULL,
    surnameUser  VARCHAR2(35) NOT NULL,
    mailUser     VARCHAR2(50) NOT NULL,
    passwordUser VARCHAR(50)  NOT NULL,
    PRIMARY KEY (idUser)
);

-- Table structure for table ´surveys´

CREATE TABLE surveys(
    idSurvey        NUMBER GENERATED ALWAYS AS IDENTITY,
    nameSurvey      VARCHAR2(50) NOT NULL,
    descriptionSur  CLOB         NOT NULL,
    numQuestions    SMALLINT     NOT NULL,
    codeSurvey      VARCHAR(10)  NOT NULL,
    idUser          NUMBER     NOT NULL,
    PRIMARY KEY (idSurvey),
    
    CONSTRAINT survey_fk_1 FOREIGN KEY (idUser) REFERENCES users (idUser)
);
 
-- Table structure for table ´questions´

CREATE TABLE questions(
    idSurvey     NUMBER       NOT NULL,
    noQuestion   SMALLINT     NOT NULL,
    textValue    CLOB         NOT NULL,
    typeQuestion VARCHAR2(25) NOT NULL,
    PRIMARY KEY (idSurvey, noQuestion),
    
    CONSTRAINT questions_fk_1 FOREIGN KEY (idSurvey) REFERENCES surveys (idSurvey)
);

-- Table structure for table ´answers´

CREATE TABLE answers(
    idSurvey    NUMBER    NOT NULL,
    noQuestion  SMALLINT  NOT NULL,
    textValue   CLOB      NOT NULL,
    noAnswer    SMALLINT  NOT NULL,
    PRIMARY KEY (idSurvey, noQuestion, noAnswer),
    
    CONSTRAINT answers_fk_1 FOREIGN KEY (idSurvey, noQuestion) REFERENCES questions (idSurvey, noQuestion)
);

-- Table structure for table ´ansSurvey´

CREATE TABLE ansSurvey(
    idSurvey    NUMBER      NOT NULL,
    noQuestion  SMALLINT    NOT NULL,  
    noAnswer    SMALLINT    NOT NULL,
    idUser      NUMBER      NOT NULL,
    PRIMARY KEY (idSurvey, noQuestion, noAnswer,idUser),
    
    CONSTRAINT answers_fk_2 FOREIGN KEY (idSurvey, noQuestion, noAnswer) REFERENCES answers (idSurvey, noQuestion, noAnswer),
    CONSTRAINT answers_fk_3 FOREIGN KEY (idUser) REFERENCES users (idUser)
);


-- Dummy user data

INSERT INTO users VALUES (DEFAULT, 'Goku', 'Nicholas', 'Matthews', 'gokuisfire@gmail.com', 'georgiatown');
INSERT INTO users VALUES (DEFAULT, 'GelGuy99', 'Diego', 'Matthews', 'gelguycool99@gmail.com', 'thewayilovedyou');

SELECT * FROM users;

-- Procedure that recieves user and password, verifies them 
DROP PROCEDURE admin.login;

CREATE OR REPLACE PROCEDURE login (nickname IN VARCHAR2, passwordU IN VARCHAR2, found IN OUT BOOLEAN)
AS
    nnDB VARCHAR2(20);
    psdw VARCHAR2(35);
    CURSOR user_cursor IS SELECT nickname FROM users;
BEGIN
    OPEN user_cursor;
	LOOP
        FETCH user_cursor INTO nnDB;
        IF nnDB = nickname THEN
            SELECT passwordUser INTO psdw FROM users WHERE nickname = nnDB;
            IF psdw = passwordU THEN
                found := TRUE;
                EXIT;        
            END IF;
            EXIT;
        END IF;    
        EXIT WHEN user_cursor%NOTFOUND;
    END LOOP;
	CLOSE user_cursor;
END;

DECLARE
    found BOOLEAN := FALSE;
    nickname VARCHAR2(35) := 'GelGuy99';
    pwdu VARCHAR2(35) := 'thewayilovedyou';
BEGIN
    login(nickname, pwdu, found);   
    DBMS_OUTPUT.PUT_LINE(sys.diutil.bool_to_int(found));
END;

-- Procedure to add user
DROP PROCEDURE admin.addUser;

CREATE OR REPLACE PROCEDURE addUser (nickname IN VARCHAR2, nameU IN VARCHAR2, surname IN VARCHAR2, mail IN VARCHAR2, passwordU IN VARCHAR2, found IN OUT BOOLEAN)
AS
    nnDB VARCHAR2(20);
    CURSOR user_cursor IS SELECT nickname FROM users;
BEGIN
    OPEN user_cursor;
	LOOP
        FETCH user_cursor INTO nnDB;
        IF nnDB = nickname THEN
            found := TRUE;
            EXIT;
        END IF;    
        EXIT WHEN user_cursor%NOTFOUND;       
    END LOOP;
	CLOSE user_cursor;
    IF found = FALSE THEN
        INSERT INTO users VALUES (DEFAULT, nickname, nameU, surname, mail, passwordU);
    END IF;    
END;

DECLARE 
    nickname VARCHAR2(25) := 'Ghan';
    nameU VARCHAR2(25) := 'Diego';
    surname VARCHAR2(25) := 'Matthews';
    mail VARCHAR2(25) := '6@gmail.com';
    passwordU VARCHAR2(25) := '12345';
    found BOOLEAN := FALSE;
BEGIN
    addUser(nickname, nameU, surname, mail, passwordU, found);
    DBMS_OUTPUT.PUT_LINE(sys.diutil.bool_to_int(found));
END;


-- Procedure that creates survey
DROP PROCEDURE admin.createSurvey;

CREATE OR REPLACE PROCEDURE createSurvey (nameS IN VARCHAR2, descriptionS IN CLOB, numQuestions IN SMALLINT, code IN VARCHAR2, nicknameU IN VARCHAR2, ins IN OUT BOOLEAN, idSurv IN OUT NUMBER)
AS
    idU NUMBER;
    codeDB VARCHAR2(10);
    CURSOR code_cursor IS SELECT codeSurvey FROM surveys;
BEGIN

    SELECT idUser INTO idU FROM users WHERE nickname = nicknameU;
    
    OPEN code_cursor;
	LOOP
        FETCH code_cursor INTO codeDB;
        IF codeDB = code THEN
            ins := FALSE;
            EXIT;
        END IF;    
        EXIT WHEN code_cursor%NOTFOUND;       
    END LOOP;
	CLOSE code_cursor;
    IF ins = TRUE THEN
        INSERT INTO surveys VALUES (DEFAULT, nameS, descriptionS, numQuestions, code, idU);
        SELECT idSurvey INTO idSurv FROM surveys WHERE codeSurvey = code;
    END IF; 
END;

DECLARE
    nameS VARCHAR2(35) := 'Best DCOMMMMMMMM';
    descriptionS VARCHAR2(50) := 'Choose the greatest DCOM ever';
    numQuestions SMALLINT := 4;
    CODE VARCHAR2(35) := 'DCOMSRULE';
    nickname VARCHAR2(25) := 'Goku';
    ins BOOLEAN := TRUE;
BEGIN
    createSurvey(nameS, descriptionS, numQuestions, CODE, nickname, ins);
    DBMS_OUTPUT.PUT_LINE(sys.diutil.bool_to_int(ins));
END;

SELECT * FROM surveys

-- Procedure that adds question
DROP PROCEDURE admin.createQuestion;

CREATE OR REPLACE PROCEDURE createQuestion (idSurvey IN NUMBER, noQuestion IN SMALLINT, textV IN CLOB, typeQ IN VARCHAR2)
AS
BEGIN
   INSERT INTO questions VALUES (idSurvey, noQuestion, textV, typeQ);
END;

DECLARE
    idSurvey NUMBER := 4;
    noQuestion SMALLINT := 3;
    textV CLOB := 'DCOM Fav?';
    typeQ VARCHAR2(15) := 'Open';
BEGIN
    createQuestion(idSurvey, noQuestion, textV, typeQ);
END;

SELECT * FROM questions


-- Procedure that adds answer
DROP PROCEDURE admin.createAnswer;

CREATE OR REPLACE PROCEDURE createAnswer (idSurvey IN NUMBER, noQuestion IN SMALLINT, textV IN CLOB, noAnswer IN SMALLINT)
AS
BEGIN
   INSERT INTO answers VALUES (idSurvey, noQuestion, textV, noAnswer);
END;

DECLARE
    idSurvey NUMBER := 4;
    noQuestion SMALLINT := 2;
    textV CLOB := 'Ashley';
    noAnswer SMALLINT := 3;
BEGIN
    createAnswer(idSurvey, noQuestion, textV, noAnswer);
END;

SELECT * FROM answers

-- PROCEDURES NOT IMPLEMENTED BUT NEEDED FOR ANSWERS MODULES
-- (THEY ARE YET TO BE CREATED DUE TO TIME RESTRICTIONS)

-- Procedures that searches survey (In order to display it)

-- Procedure that registers answers


