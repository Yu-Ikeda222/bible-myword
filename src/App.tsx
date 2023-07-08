import "./App.css";
import { useState, useEffect } from "react";
import { search } from "./models/bible";
import type { Bible } from "./types/Bible";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function App() {
  // const [searchPhrase, setSearchPhrase] = useState("");
  const [searchedSentences, setSearchedSentences] = useState<Bible[]>([]);
  const [phrase, setPhrase] = useState("");
  const [filteredVersion, setFilterdVersion] = useState("");

  async function searchPhrase(phrase: string) {
    // setSearchPhrase(await invoke("search", { phrase }));
    if (phrase == "") {
      setSearchedSentences([]);
      return;
    }
    let phrases: Promise<Bible[]> = search(phrase);
    setSearchedSentences(await phrases);
  }

  const copyToClipboard = async () => {
    let resultText = "";
    let filterdSentences :Bible[] = [];
    if (filteredVersion == "旧約") {
      filterdSentences = searchedSentences.filter((s) => {
        return s.version == "旧約";
      });
    } else if (filteredVersion == "新約") {
      filterdSentences = searchedSentences.filter((s) => {
        return s.version == "新約";
      });
    } else {
      filterdSentences = searchedSentences
    }
    for (const sentenceObject of filterdSentences) {
      resultText +=
        `${sentenceObject.book}` +
        " " +
        `${sentenceObject.chapter}章${sentenceObject.section}節` +
        "\n" +
        `${sentenceObject.sentence}` +
        "\n";
    }
    await navigator.clipboard.writeText(resultText);
  };

  const handleVersionchange = (event: any) => {
    setFilterdVersion(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchPhrase(phrase);
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setPhrase(e.currentTarget.value)}
            placeholder="Enter a phrase..."
          />
          <button type="submit">search</button>
        </form>
      </div>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value=""
            label="すべて"
            control={<Radio />}
            checked={filteredVersion === ""}
            onChange={handleVersionchange}
          />
          <FormControlLabel
            value="旧約"
            label="旧約"
            control={<Radio />}
            checked={filteredVersion === "旧約"}
            onChange={handleVersionchange}
          />
          <FormControlLabel
            value="新約"
            label="新約"
            control={<Radio />}
            checked={filteredVersion === "新約"}
            onChange={handleVersionchange}
          />
        </RadioGroup>
      </FormControl>
      <div>
        {searchedSentences.length !== 0 ? (
          <IconButton
            color="primary"
            size="small"
            onClick={() => copyToClipboard()}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        ) : (
          <></>
        )}
      </div>
      <>
        {filteredVersion == "" &&
          searchedSentences.map((searchedSentence) => (
            <>
              {searchedSentence.book}
              {searchedSentence.chapter}章{searchedSentence.section}節
              <p>{searchedSentence.sentence}</p>
            </>
          ))}
        {filteredVersion == "旧約" &&
          searchedSentences
            .filter((s) => {
              return s.version == "旧約";
            })
            .map((searchedSentence) => (
              <>
                {searchedSentence.book}
                {searchedSentence.chapter}章{searchedSentence.section}節
                <p>{searchedSentence.sentence}</p>
              </>
            ))}
        {filteredVersion == "新約" &&
          searchedSentences
            .filter((s) => {
              return s.version == "新約";
            })
            .map((searchedSentence) => (
              <>
                {searchedSentence.book}
                {searchedSentence.chapter}章{searchedSentence.section}節
                <p>{searchedSentence.sentence}</p>
              </>
            ))}
      </>
    </div>
  );
}

export default App;
