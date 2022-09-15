import { PrismaClient } from "@prisma/client";
import { empty } from "@prisma/client/runtime";
import express from "express";
import { ConvertHourStringToMinute } from "./utils/Convert-hour-string-to-minute";

const app = express();

app.use(express.json())

const prisma = new PrismaClient({
  log: ["query"],
});



app.get("/games", async function (request, response) {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.status(200).json(games);
});

app.get("/games/:id/ads", async function (request, response) {
  const gameId = request.params.id;
  let game = null;

  if (gameId === null || gameId === "") {
    return response.status(400).json({ message: "Valor do Id inválido" });
  } else {
    game = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return response.status(200).json(
    game.map((game) => {
      return {
        ...game,
        weekDays: game.weekDays.split(","),
      };
    })
  );
});

app.get("/ads/:id/discord", async function (request, response) {
  const getIdDiscord = request.params.id;

  const getDiscordLinkById = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: getIdDiscord,
    },
  });

  return response.status(200).json(getDiscordLinkById);
});

app.post("/games/:id/ads", async function (request, response) {
  const gameId = request.params.id;
  const body:any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      hourEnd: ConvertHourStringToMinute(body.hourEnd),
      hourStart: ConvertHourStringToMinute(body.hourStart),
      weekDays: body.weekDays.join(','),
      useVoiceChannel: body.useVoiceChannel,
      discord: body.discord,
    }
  });

  return response.status(201).json(ad);
});

app.listen(3333);
