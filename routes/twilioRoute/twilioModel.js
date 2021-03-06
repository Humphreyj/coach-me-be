const db = require("../../data/dbConfig.js");

module.exports = {
  findSenderByPhone,
  patientInConversations,
  findCoachSenderById,
  createNewConversation,
  insertNewMessage,
  insertScheduledMessage,
  getScheduledByPatientId,
  deleteScheduled,
  updateScheduled,
  getAllScheduled
};

function findSenderByPhone(filter) {
  return db("users")
    .join("patients", "patients.userId", "users.userId")
    .where(filter)
    .select("patients.patientId")
    .first();
}

// database functions for updating messageHistory and conversations
// (most likely won't be used since twilio has this functionality built in)
function patientInConversations(filter) {
  return db("conversations")
    .where(filter)
    .first();
}

function findCoachSenderById(filter) {
  return db("coaches")
    .where(filter)
    .first();
}

function createNewConversation(conversationObject) {
  return db("conversations").insert(conversationObject, "conversationId");
}

function insertNewMessage(messageObject) {
  return db("messageHistory").insert(messageObject);
}

// database functions for scheduling messages.
function insertScheduledMessage(messageObject) {
  return db("scheduledMessages").insert(messageObject);
}

function getScheduledByPatientId(filter) {
  return db("scheduledMessages").where(filter);
}

function deleteScheduled(filter) {
  return db("scheduledMessages")
    .where(filter)
    .del();
}

function updateScheduled(filter, updatedScheduled) {
  return db("scheduledMessages")
    .where(filter)
    .update(updatedScheduled);
}

// Import helper function for the cron server. Used to schedule and deploy all messages within the
// scheduledMessages table.
function getAllScheduled() {
  return db("scheduledMessages")
    .join("patients", "patients.patientId", "scheduledMessages.patientId")
    .join("users", "patients.userId", "users.userId");
}
