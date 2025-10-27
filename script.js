const inputText = document.getElementById("inputTxt");
const charsCount = document.getElementById("chars");
const wordsCount = document.getElementById("words");
const sentsCount = document.getElementById("sents");
const densityDiv = document.getElementById("density");
const excludeSpaces = document.getElementById("exSpaces")
const readingTime = document.getElementById("readingTime");

function AnalyzeText(){

    const text = inputText.value;
    const exclude = excludeSpaces.checked;

    //chars count
    const chars = exclude ? text.replace(/\s/g, '').length : text.length;
    charsCount.textContent = String(chars).padStart(2,"0");

    //words count
    const words = text === "" ? 0 : text.split(/\s+/).length;
    wordsCount.textContent = String(words).padStart(2,"0");

    //sentence count
    const sents = text === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    sentsCount.textContent = String(sents).padStart(2,"0");

    //Reading Time
    const wordsPerMinute = 200;
    let minutes = words / wordsPerMinute;

    let timeText;
    if (minutes < 1 && words > 0) {
      timeText = "Approx. reading time: <1 minute";
    } else {
      timeText = `Approx. reading time: ${Math.floor(minutes)} minute`;
    }

    readingTime.textContent = timeText;


    //Density
    const onlyLetters = text.toLowerCase().replace(/[^\p{L}]/gu, "");

    const totalLetters = onlyLetters.length;

    const letterCounts = {};
    for (const ch of onlyLetters) {
      letterCounts[ch] = (letterCounts[ch] || 0) + 1;
    }

    
    if (totalLetters === 0) {
      densityDiv.innerHTML = "No letters yet...";
      return;
    }

    const letters = Object.keys(letterCounts).sort();
    const rows = letters.map(letter => {
      const count = letterCounts[letter];
      const percent = (count / totalLetters) * 100;
      return `${letter.toUpperCase()}: ${count} (${percent.toFixed(2)}%)`;
  });

    densityDiv.innerHTML = rows.join("<br>");
};

inputText.addEventListener('input', AnalyzeText);

