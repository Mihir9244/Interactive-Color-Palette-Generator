// Function to generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Function to generate palette
  function generatePalette() {
    for (let i = 1; i <= 5; i++) {
      const colorBox = document.getElementById(`color${i}`);
      const randomColor = getRandomColor();
      colorBox.style.backgroundColor = randomColor;
      colorBox.setAttribute('data-hex', randomColor); // Store hex code in data attribute
    }
  }
  
  // Copy color code on click
  document.querySelectorAll('.color-box').forEach(box => {
    box.addEventListener('click', function() {
      const colorCode = this.getAttribute('data-hex');
      navigator.clipboard.writeText(colorCode).then(() => {
        alert(`Copied: ${colorCode}`);
      });
    });
  });
  
  // Save palette to local storage
  function savePalette() {
    const palette = [];
    for (let i = 1; i <= 5; i++) {
      const color = document.getElementById(`color${i}`).getAttribute('data-hex');
      palette.push(color);
    }
    localStorage.setItem('savedPalette', JSON.stringify(palette));
    alert('Palette saved!');
  }
  
  // Load palette from local storage
  function loadPalette() {
    const savedPalette = JSON.parse(localStorage.getItem('savedPalette'));
    if (savedPalette) {
      for (let i = 1; i <= 5; i++) {
        const colorBox = document.getElementById(`color${i}`);
        colorBox.style.backgroundColor = savedPalette[i - 1];
        colorBox.setAttribute('data-hex', savedPalette[i - 1]);
      }
      alert('Palette loaded!');
    } else {
      alert('No saved palette found!');
    }
  }
  
  // Download palette as image
  function downloadPaletteAsImage() {
    const palette = document.querySelector('.palette');
    html2canvas(palette).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'palette.png';
      link.click();
    });
  }
  
  // Event listeners
  document.getElementById('generateBtn').addEventListener('click', generatePalette);
  document.getElementById('saveBtn').addEventListener('click', savePalette);
  document.getElementById('loadBtn').addEventListener('click', loadPalette);
  document.getElementById('downloadBtn').addEventListener('click', downloadPaletteAsImage);
  
  // Initialize with a random palette
  generatePalette();
  