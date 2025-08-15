import mongoose from "mongoose";
import User from "../model/user.model.js";
import Pin from "../model/pin.model.js";
import Board from "../model/board.model.js";
import Comment from "../model/comment.model.js";
import bcrypt from "bcryptjs";
import connectDB from "./connectDB.js";

connectDB();

const seedDB = async () => {
  await User.deleteMany({});
  await Pin.deleteMany({});
  await Board.deleteMany({});
  await Comment.deleteMany({});

  const users = [];
  for (let i = 1; i <= 10; i++) {
    const hashPassword = await bcrypt.hash("password123", 10);
    const user = new User({
      displayname: `User ${i}`,
      username: `user${i}`,
      email: `user${i}@example.com`,
      hashPassword: hashPassword,
      img: `https://picsum.photos/id/${i}/200/200`,
    });
    users.push(await user.save());
  }

  const boards = [];
  for (const user of users) {
    for (let i = 1; i <= 10; i++) {
      const board = new Board({
        title: `Board ${i} of ${user.username}`,
        user: user._id,
      });
      boards.push(await board.save());
    }
  }

  const pins = [];
  for (const user of users) {
    const userBoards = boards.filter(
      (board) => board.user.toString() === user._id.toString()
    );
    for (let i = 1; i <= 10; i++) {
      const mediaSize = Math.random() < 0.5 ? "800/1200" : "800/600";
      const pin = new Pin({
        media: `https://picsum.photos/id/${i + 10}/${mediaSize}`,
        width: 800,
        height: mediaSize === "800/1200" ? 1200 : 600,
        title: `Pin ${i} by ${user.username}`,
        description: `This is pin ${i} created by ${user.username}`,
        link: `https://example.com/pin${i}`,
        board: userBoards[i - 1]._id,
        tags: [`tag${i}`, "sample", user.username],
        user: user._id,
      });
      pins.push(await pin.save());
    }
  }

  for (const user of users) {
    for (let i = 1; i <= 10; i++) {
      const randomPin = pins[Math.floor(Math.random() * pins.length)];
      const comment = new Comment({
        description: `Comment ${i} by ${user.username}: This is a great pin!`,
        pin: randomPin._id,
        user: user._id,
      });
      await comment.save();
    }
  }

  console.log("Database seeded successfully!");
  process.exit(0);
};

mongoose.connection.once('open', () => {
  seedDB().catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
});