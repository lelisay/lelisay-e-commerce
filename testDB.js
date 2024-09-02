require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL successfully!');
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error.message);
  } finally {
    await prisma.$disconnect(); // Disconnect after testing
  }
}

testConnection();
