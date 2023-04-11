  function useWord() {
      const input = document.getElementById("wordInput").value;
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;

      fetch(url)
          .then((response) => response.json())
          .then((data) => {
              const word = data[0].word;
              const definition = data[0].meanings[0].definitions[0].definition;
              const example = data[0].meanings[0].definitions[0].example || "No example available.";

              let translation = "No Uzbek translation available.";
              if (data[0].meanings[0].definitions[0].translations) {
                  const translations = data[0].meanings[0].definitions[0].translations.filter(
                      (translation) => translation.language === "uz"
                  );
                  if (translations.length > 0) {
                      translation = translations[0].text;
                  }
              }

              displayResult(word, definition, example, translation);

          })
          .catch((error) => console.log(error));
  }

  function displayResult(word, definition, example, translation) {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `
          <p class='mt-2 fs-4 text-start'> <strong>Definition:</strong> ${definition}</p>
          <p class='mt-2 fs-4 text-start'><strong>Example:</strong> ${example}</p>
          <p class='mt-2 fs-4 text-start'><strong>Translation:</strong> ${translation}</p>
        `;
  }