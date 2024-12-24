const cors = require("cors");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
require("dotenv").config();
const authenticateToken = require("../auth");
const router = express.Router();
router.use(cors({ credentials: true, origin: "http://localhost:5173" }));
router.use(express.json());

const evening = new Date();
const newdate = new Date();
// const date = new Date();
// console.log(date);
evening.setHours(18, 0, 0, 0);
const morning = new Date();
morning.setHours(6, 0, 0, 0);

// console.log(morning.toLocaleTimeString());
// console.log(evening.toLocaleTimeString());
router.get("/", authenticateToken, async (req, res) => {
  const mombasa = 950;
  const kisumu = 850;
  res.json({ mombasa, kisumu });
});

/// test
router.post("/test", authenticateToken, async (req, res) => {
  try {
    const { date, email, destination, seats, price } = req.body;
    console.log(req.body);
    const newdate = new Date(date);
    // console.log(newdate.toDateString());

    if (!date || !email || !destination || !seats || !price) {
      return res.json({ mess: "missing arguments" });
    }
    const check = await prisma.bus.findFirst({
      where: {
        date: newdate.toDateString(),
        active: true,
        destination: destination,
      },
    });
    // console.log(check);

    // const check = await prisma.bus.findFirst({
    //   where: { date: newdate.toDateString() },
    //   where: { active: true },
    //   where: { destination: destination },
    // });
    const len = await prisma.bus.findMany({
      // where: { date: newdate.toDateString() },
      // where: { active: true },
      where: {
        date: newdate.toDateString(),
        active: true,
      },
    });
    // console.log("len", len);
    const count = len.length;
    console.log("count", count);

    if (!check && count < 2) {
      const createbus = await prisma.bus.createMany({
        data: [
          {
            date: newdate.toDateString(),
            time: "8",
            destination: "mombasa",
            users: [],
            active: true,
            deperturetime: morning,
          },
          {
            date: newdate.toDateString(),
            time: "2",
            destination: "kisumu",
            users: [],
            active: true,
            deperturetime: evening,
          },
        ],
      });
      // console.log(createbus);
      // return res.json(createbus);
    }
    // check if all bus for the date are booked

    const checkifallfalse = await prisma.bus.findFirst({
      where: {
        date: newdate.toDateString(),
        active: false,
        destination: destination,
      },
      // where: { date: newdate.toDateString() },
      // where: { active: false },
      // where: { destination: destination },
    });
    // console.log(checkifallfalse);
    // && count >= 2
    if (checkifallfalse && count >= 2) {
      // console.log(checkifallfalse);
      return res.json({ mess: "this date is booked " });
    }
    const checkagain = await prisma.bus.findFirst({
      where: {
        date: newdate.toDateString(),
        active: true,
        destination: destination,
      },
    });
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    const busid = checkagain.id;
    const name = user.name;
    const time = checkagain.deperturetime;
    if (checkagain.active == false) {
      return res.json({ mess: "this date is booked " });
    }
    if (checkagain.availableseats < seats) {
      return res.json({ mess: `only ${checkagain.availableseats} available` });
    }
    const creaticket = await prisma.ticket.create({
      data: {
        userid: user.id,
        busid: busid,
        name: name,
        seats: seats,
        price: price,
        destination: checkagain.destination,
        traveltime: 4,
        deperturetime: time,
      },
    });
    const newseats = checkagain.availableseats - seats;
    const oldarr = checkagain.users;
    const newuserob = {
      name: user.name,
      id: user.id,
    };
    const newarr = [...oldarr, newuserob];

    const newbus = await prisma.bus.update({
      where: { id: busid },
      data: {
        availableseats: newseats,
        users: newarr,
      },
    });
    if (newbus.availableseats == 0) {
      const newbus = await prisma.bus.update({
        where: { id: busid },
        data: {
          active: false,
        },
      });
    }
    console.log(newbus.createdAt.toDateString());
    res.json({ mess: "booking succesful" });
    // res.json(newbus);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// router.post("/", authenticateToken, async (req, res) => {
//   const { date, id, destination, seats, price } = req.body;
//   const check = await prisma.bus.findFirst({
//     where: { createdAt: date },
//     where: { destination: destination },
//     where: { active: true },
//   });
//   const count = await prisma.bus.count({
//     where: {
//       where: { createdAt: date },
//       where: { destination: destination },
//       where: { active: true },
//     },
//   });
//   if (!check || count > 2) {
//     const createbus = await prisma.bus.createMany({
//       data: [
//         {
//           time: "2",
//           destination: "mombasa",
//           users: [],
//           active: true,
//           deperturetime: morning,
//         },
//         {
//           time: "2",
//           destination: "mombasa",
//           users: [],
//           active: true,
//           deperturetime: evening,
//         },
//       ],
//     });
//   }
//   const user = await prisma.user.findUnique({
//     where: { id: id },
//   });
//   const busid = check.id;
//   const name = user.name;
//   const time = check.deperturetime;
//   if (check.availableseats < seats) {
//     return res.json();
//   }
//   const creaticket = await prisma.ticket.create({
//     data: {
//       userid: id,
//       busid: busid,
//       name: name,
//       seats: seats,
//       price: price,
//       time: time,
//     },
//   });
//   const newseats = check.availableseats - seats;

//   const newbus = await prisma.bus.update({
//     where: { id: busid },
//     data: {
//       availableseats: newseats,
//     },
//   });
//   if (newbus.availableseats == 0) {
//     const newbus = await prisma.bus.update({
//       where: { id: busid },
//       data: {
//         active: false,
//       },
//     });
//   }
//   res.json("booking route");
// });
module.exports = router;
