DROP EXTENSION if exists pgcrypto;

CREATE EXTENSION pgcrypto;

DROP TABLE  if exists accounts CASCADE;

DROP TABLE if exists courses CASCADE;

CREATE TABLE accounts (id SERIAl PRIMARY KEY, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, email VARCHAR(254) NOT NULL,  account_password VARCHAR(100) NOT NULL, enrolled_courses integer ARRAY, notes JSONB NOT NULL, pronouns VARCHAR(254) NOT NULL, nickname VARCHAR(254) NOT NULL,settings JSONB NOT NULL, classroom_contributions JSONB NOT NULL);

CREATE TABLE courses (course_id SERIAL PRIMARY kEY, course_name VARCHAR(254) NOT NULL, chapters JSONB NOT NULL);


--Here password is encrypted:
-- INSERT INTO accounts(first_name,last_name,email,account_password, enrolled_courses) VALUES ('Amanda', 'Nwadukwe', 'amandanwadukwe@gmail.com',crypt('1234', gen_salt('bf')), '{{1,1,2}}');

--Here password is not encrypted:
INSERT INTO accounts(first_name,last_name,email,account_password, enrolled_courses, notes, pronouns,nickname, settings, classroom_contributions) VALUES ('Amanda', 'Nwadukwe', 'amandanwadukwe@gmail.com','1234', '{{1,1,2}}', '{
    "Lesson 1":"This is what I learnt from lesson 1",
    "Lesson 2":"This is what I learnt from lesson 2"}', 'She/her', 'Mindy', '{
    "autosave":true,
    "make_name_visible":true,
    "theme":"light"}',  '{
    "activity 1":{
      "classroom_session":"101",
      "date":"",
      "tag":"sticker",
      "properties":[300,402,"red"],
      "content":"This is a sticker"
    },
    "activity 1":{
      "classroom_session":"103",
      "date":"",
      "tag":"sticker",
      "properties":[100,402,"red"],
      "content":"This is another sticker"
    }}');

INSERT INTO courses( course_name, chapters) VALUES ('Find your purpose, realise your ambition','{
    "1":{
       "title":"Self - Appraisal, change and ambition",
       "info":"Time for change",
       "progress":0,
       "pages":{
          "1":"For your next steps, you will very likely need to make changes.<br/> Changes in your thinking, changes in your behaviour patterns, even changes regarding who you listen to and how you respond.<br/>Are you ready to start making some changes?",
          "2":"What would you like to do, to which other people may respond: it cannot be done",
          "3":"Who are you trying to please?",
          "4":"What are this person`s hopes for you?",
          "5":"What are they wanting you to acheive?",
          "6":"How has this person`s aspirations for you affected your actions?",
          "7":"What self image do you want to project?",
          "8":"How do you rate your commitment on a scale of 1 to 5 where 1 is not being good at committing yourself to things and 5 is where you`ve achieved change in your life by being committed to a goal?",
          "9":"On a scale of 1-5 how likely are you to quit when something gets tough where 1 is likely and 5 is unlikely?",
          "10":"Who are you at this moment in time?",
          "11":"Who or what do you want to be?",
          "12":"What drives you?",
          "13":"What are you passionate about?",
          "14":"What rewards are  you seeking?<br/>Money?<br/>Satisfaction?<br/>Recognition?<br/>Power?<br/>Popularity?",
          "15":"Who has inpired/who inspires you?",
          "16":"What did they say to you?",
          "17":"What do/did they do that inspires you?",
          "18":"What ideas have you had that you`ve not acted on?",
          "19":"What chances have you not taken?",
          "20":"What things have you wanted to do but haven`t done?",
          "21":"What opportunities have you missed?",
          "22":"What does your comfort zone look like/feel like?",
          "23":"What circumstances have you been hoping will change?",
          "24":"Do you want to make your dreams and ambitions happen?",
          "25":"Are you ready to start making changes?"
        },
        "page_info":{
          "1":"This is the first question",
          "2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":"","16":"","17":"","18":"","19":"","20":"","21":"","22":"","23":"","24":"","25":""
        }
      }, 
      "2":{
        "title":"What Have I Got to Offer",
       "info":"Self assess yourself",
       "progress":0,
       "pages":{
        "1":"What is the point of working?",
        "2":"List some of the rewards in addition to financial gain",
        "3":"<b>How might you go about fitting employment/voluntary work into your life?</b><br/><ul><li>Hours?</li><li>Location?</li><li>Child care</li><li>Other</li></ul>",
        "4":"Skills: I can ...",
        "5":"Qualities: I am ...",
        "6":"Values: I believe ..."
        }
     }
    }');

