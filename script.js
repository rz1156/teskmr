const video = document.getElementById('videoElement');
const snapBtn = document.getElementById('snapBtn');
const canvas = document.getElementById('canvas');
const photoResult = document.getElementById('photoResult');
const resultArea = document.getElementById('resultArea');

// 1. Menyalakan Kamera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error mengakses kamera: ", error);
            alert("Tidak dapat mengakses kamera. Pastikan browser memiliki izin.");
        });
} else {
    alert("Maaf, browser Anda tidak mendukung fitur akses kamera.");
}

// 2. Fitur Ambil Foto
snapBtn.addEventListener('click', function() {
    // Samakan ukuran canvas dengan resolusi asli video kamera
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Gambar frame saat ini dari video ke dalam canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Ubah data di canvas menjadi URL gambar (format PNG)
    const dataURL = canvas.toDataURL('image/png');
    
    // Masukkan URL tersebut ke elemen <img> dan tampilkan areanya
    photoResult.src = dataURL;
    resultArea.classList.remove('hidden');
});
