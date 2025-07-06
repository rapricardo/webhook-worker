
const { Worker } = require('bullmq');
const Redis = require('ioredis');
const axios = require('axios');

const connection = new Redis({ host: 'redis' });

const worker = new Worker('n8n-jobs', async job => {
  const url = 'http://n8n:5678/webhook/teste';
  try {
    const response = await axios.post(url, job.data.payload);
    console.log("Chamado com sucesso:", response.status);
  } catch (error) {
    console.error("Erro ao chamar n8n:", error.message);
  }
}, { connection });

console.log("Worker aguardando jobs...");
