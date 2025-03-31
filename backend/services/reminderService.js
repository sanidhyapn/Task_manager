const cron = require("node-cron");
const Task = require("../models/Task");
const nodemailer = require("nodemailer");

const sendEmailReminder = async (userEmail, task) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Task Reminder",
    text: `Reminder: Your task "${task.title}" is due soon!`,
  });
};

const checkDueTasks = async () => {
  try {
    const now = new Date();
    const tasks = await Task.find({
      dueDate: { $lte: now },
      status: "Pending",
    }).populate("user");

    tasks.forEach((task) => {
      sendEmailReminder(task.user.email, task);
    });

    console.log(`Checked ${tasks.length} due tasks.`);
  } catch (error) {
    console.error("Error checking due tasks:", error);
  }
};

// Schedule the job to run every day at midnight
cron.schedule("0 0 * * *", checkDueTasks);

module.exports = { checkDueTasks };
