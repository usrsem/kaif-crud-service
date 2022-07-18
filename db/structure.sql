CREATE TABLE client (
    "telegramId" bigint PRIMARY KEY,
    "telegramUsername" varchar(255),
    "telegramFullname" varchar(255) NOT NULL,
    "createdAt" Date NOT NULL
);

CREATE TABLE event (
    "id" bigint PRIMARY KEY,
    "title" varchar(255) NOT NULL,
    "lineup" JSON NOT NULL,
    "description" varchar(255) NOT NULL,
    "mediaPath" varchar(255) NOT NULL,
    "startDate" Date NOT NULL,
    "postingDate" Date NOT NULL
);

CREATE TABLE story (
    "id" bigint,
    "clientId" bigint,
    "eventId" bigint,
    "mediaPath" varchar(255),
    "tags" varchar(255)
);

ALTER TABLE story ADD CONSTRAINT "pkId" PRIMARY KEY ("id");
ALTER TABLE story ADD CONSTRAINT "fkClientId" FOREIGN KEY ("clientId") REFERENCES client ("telegramId");
ALTER TABLE story ADD CONSTRAINT "fkEventId" FOREIGN KEY ("eventId") REFERENCES event ("id");

