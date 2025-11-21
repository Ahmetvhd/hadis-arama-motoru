const fs = require('fs');
const path = require('path');

// Dosyayı oku
const filePath = path.join(__dirname, '..', 'hadisler.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Her parçada kaç hadis olacak (her parça ~5MB olacak şekilde)
const CHUNK_SIZE = 200; // Her parçada 200 hadis
const totalChunks = Math.ceil(data.length / CHUNK_SIZE);

console.log(`Toplam ${data.length} hadis bulundu.`);
console.log(`${totalChunks} parçaya bölünecek.`);

// Parçalara böl
for (let i = 0; i < totalChunks; i++) {
  const start = i * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, data.length);
  const chunk = data.slice(start, end);
  
  const chunkFileName = `hadisler-${i + 1}.json`;
  const chunkPath = path.join(__dirname, '..', 'data', chunkFileName);
  
  // data klasörünü oluştur
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Parçayı kaydet
  fs.writeFileSync(chunkPath, JSON.stringify(chunk, null, 0));
  
  const fileSize = fs.statSync(chunkPath).size / (1024 * 1024); // MB
  console.log(`✓ ${chunkFileName} oluşturuldu (${chunk.length} hadis, ${fileSize.toFixed(2)} MB)`);
}

console.log(`\n✅ Tüm parçalar oluşturuldu!`);
console.log(`📁 Parçalar 'data' klasöründe.`);

